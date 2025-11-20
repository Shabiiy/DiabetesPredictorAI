import path from "path";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Simple request logger for /api routes
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson as Record<string, unknown>;
    // @ts-ignore preserve original typing when calling
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch {
          /* ignore JSON serialization errors */
        }
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Central error handler (respond and log; do not re-throw)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    console.error(err);
    res.status(status).json({ message });
  });

  // Dev: mount Vite middleware. Production: serve built files from dist/public.
  if (app.get("env") === "development") {
    // Vite dev middleware will mount and handle client requests (hot reload)
    await setupVite(app, server);
  } else {
    // Serve production build output
    // Build output expected at <repo-root>/dist/public
    const publicDir = path.join(process.cwd(), "dist", "public");

    // Serve static assets from dist/public
    app.use(express.static(publicDir));

    // SPA fallback — always send index.html for client-side routes
    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  }

  // Start server on the port provided by the environment
  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
