import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Predict from "@/pages/predict";
import Results from "@/pages/results";
import Dashboard from "@/pages/dashboard";
import Resources from "@/pages/resources";
import Tools from "@/pages/tools";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/predict" component={Predict} />
      <Route path="/results/:id" component={Results} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/resources" component={Resources} />
      <Route path="/tools" component={Tools} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
