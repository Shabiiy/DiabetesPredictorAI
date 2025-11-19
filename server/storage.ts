import { type Prediction, type InsertPrediction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPrediction(id: string): Promise<Prediction | undefined>;
  getAllPredictions(): Promise<Prediction[]>;
  createPrediction(prediction: Omit<Prediction, "id">): Promise<Prediction>;
}

export class MemStorage implements IStorage {
  private predictions: Map<string, Prediction>;

  constructor() {
    this.predictions = new Map();
  }

  async getPrediction(id: string): Promise<Prediction | undefined> {
    return this.predictions.get(id);
  }

  async getAllPredictions(): Promise<Prediction[]> {
    return Array.from(this.predictions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createPrediction(predictionData: Omit<Prediction, "id">): Promise<Prediction> {
    const id = randomUUID();
    const prediction: Prediction = { 
      ...predictionData, 
      id,
      createdAt: new Date()
    };
    this.predictions.set(id, prediction);
    return prediction;
  }
}

export const storage = new MemStorage();
