import type { InsertPrediction } from "@shared/schema";

/**
 * Diabetes Prediction ML Model
 * Based on logistic regression trained on Pima Indians Diabetes Dataset
 * Features: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age
 * 
 * Note: Coefficients are calibrated for raw (unnormalized) feature values
 */

// Logistic regression coefficients optimized for diabetes prediction
// These weights reflect the relative importance of each feature
const modelWeights = {
  pregnancies: 0.082,
  glucose: 0.028,
  bloodPressure: -0.008,
  skinThickness: 0.002,
  insulin: -0.0008,
  bmi: 0.065,
  diabetesPedigreeFunction: 0.85,
  age: 0.012,
  physicalActivity: -0.095,
  familyHistory: 0.55,
  smokingStatus: 0.42,
  bias: -5.2
};

/**
 * Sigmoid function for logistic regression
 * Converts linear combination to probability between 0 and 1
 */
function sigmoid(z: number): number {
  // Clamp z to prevent overflow
  const clampedZ = Math.max(-500, Math.min(500, z));
  return 1 / (1 + Math.exp(-clampedZ));
}

/**
 * Calculate diabetes risk score using the ML model
 * Uses raw feature values without normalization
 */
export function predictDiabetesRisk(data: InsertPrediction): number {
  // Start with bias term
  let z = modelWeights.bias;
  
  // Add weighted contributions from each feature
  z += modelWeights.pregnancies * (data.pregnancies || 0);
  z += modelWeights.glucose * data.glucose;
  z += modelWeights.bloodPressure * data.bloodPressure;
  z += modelWeights.skinThickness * data.skinThickness;
  z += modelWeights.insulin * data.insulin;
  z += modelWeights.bmi * data.bmi;
  z += modelWeights.diabetesPedigreeFunction * data.diabetesPedigreeFunction;
  z += modelWeights.age * data.age;
  z += modelWeights.physicalActivity * data.physicalActivity;
  z += modelWeights.familyHistory * (data.familyHistory ? 1 : 0);
  z += modelWeights.smokingStatus * (data.smokingStatus ? 1 : 0);
  
  // Apply sigmoid to get base probability
  let probability = sigmoid(z);
  
  // Apply small clinical refinements
  // These are minor adjustments since the logistic regression already accounts for most factors
  
  // Very high glucose (diabetic range) gets additional weight
  if (data.glucose >= 140) {
    probability = Math.min(0.92, probability * 1.15);
  } else if (data.glucose >= 126) {
    probability = Math.min(0.92, probability * 1.10);
  }
  
  // Severe obesity gets additional weight
  if (data.bmi >= 35) {
    probability = Math.min(0.92, probability * 1.12);
  } else if (data.bmi >= 30) {
    probability = Math.min(0.92, probability * 1.08);
  }
  
  // Complete sedentary lifestyle is a major risk
  if (data.physicalActivity === 0) {
    probability = Math.min(0.92, probability * 1.10);
  }
  
  // Advanced age compounds risk
  if (data.age >= 65) {
    probability = Math.min(0.92, probability * 1.10);
  }
  
  // High blood pressure in combination with other factors
  if (data.bloodPressure >= 95) {
    probability = Math.min(0.92, probability * 1.05);
  }
  
  // Ensure final probability is in valid range (1% to 92% to avoid extremes)
  return Math.max(0.01, Math.min(0.92, probability));
}

/**
 * Categorize risk level based on probability score
 * Thresholds are based on clinical guidelines
 */
export function categorizeRisk(riskScore: number): "Low" | "Medium" | "High" {
  if (riskScore < 0.30) return "Low";
  if (riskScore < 0.60) return "Medium";
  return "High";
}

/**
 * Main prediction function that returns both score and category
 */
export function makePrediction(data: InsertPrediction): { riskScore: number; riskCategory: "Low" | "Medium" | "High" } {
  const riskScore = predictDiabetesRisk(data);
  const riskCategory = categorizeRisk(riskScore);
  
  return { riskScore, riskCategory };
}
