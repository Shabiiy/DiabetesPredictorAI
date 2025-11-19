import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPredictionSchema } from "@shared/schema";
import { makePrediction } from "./ml-model";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all predictions
  app.get("/api/predictions", async (req, res) => {
    try {
      const predictions = await storage.getAllPredictions();
      res.json(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      res.status(500).json({ error: "Failed to fetch predictions" });
    }
  });

  // Get a specific prediction by ID
  app.get("/api/predictions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prediction = await storage.getPrediction(id);
      
      if (!prediction) {
        return res.status(404).json({ error: "Prediction not found" });
      }
      
      res.json(prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      res.status(500).json({ error: "Failed to fetch prediction" });
    }
  });

  // Create a new prediction
  app.post("/api/predictions", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertPredictionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid input data",
          details: validationResult.error.errors 
        });
      }
      
      const inputData = validationResult.data;
      
      // Run ML prediction
      const { riskScore, riskCategory } = makePrediction(inputData);
      
      // Store prediction with results
      const prediction = await storage.createPrediction({
        ...inputData,
        riskScore,
        riskCategory,
        createdAt: new Date(),
      });
      
      res.status(201).json(prediction);
    } catch (error) {
      console.error("Error creating prediction:", error);
      res.status(500).json({ error: "Failed to create prediction" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
