import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, Activity, Droplet, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3" data-testid="tools-title">
            Health Calculators & Tools
          </h1>
          <p className="text-base text-muted-foreground" data-testid="tools-subtitle">
            Quick assessment tools to monitor your health metrics
          </p>
        </div>

        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8" data-testid="tools-tabs">
            <TabsTrigger value="bmi" className="gap-2" data-testid="tab-bmi">
              <Calculator className="h-4 w-4" />
              BMI Calculator
            </TabsTrigger>
            <TabsTrigger value="blood-sugar" className="gap-2" data-testid="tab-blood-sugar">
              <Droplet className="h-4 w-4" />
              Blood Sugar Interpreter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bmi" data-testid="bmi-content">
            <BMICalculator />
          </TabsContent>

          <TabsContent value="blood-sugar" data-testid="blood-sugar-content">
            <BloodSugarInterpreter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
      // Accept height in either centimeters (e.g. 170) or meters (e.g. 1.7).
      // If the entered height is greater than 3, treat it as cm and convert to meters.
      // If it's <= 3, treat it as meters directly.
      let heightInMeters = h;
      if (h > 3) {
        heightInMeters = h / 100;
      }

      // Guard against extremely small heights after conversion
      if (heightInMeters <= 0) {
        setBmi(null);
        return;
      }

      const calculatedBMI = w / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI);
    } else {
      setBmi(null);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" };
    if (bmi < 25) return { label: "Normal Weight", color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200" };
    if (bmi < 30) return { label: "Overweight", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200" };
    return { label: "Obese", color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200" };
  };

  return (
    <Card data-testid="bmi-calculator-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Body Mass Index (BMI) Calculator
        </CardTitle>
        <CardDescription>
          Calculate your BMI to assess if you're at a healthy weight for your height
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height" data-testid="label-height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              data-testid="input-height"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" data-testid="label-weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              data-testid="input-weight"
            />
          </div>
        </div>

        <Button type="button" onClick={calculateBMI} className="w-full" data-testid="button-calculate-bmi">
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="space-y-4 p-6 rounded-md bg-card border" data-testid="bmi-result">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className="text-4xl font-mono font-bold text-foreground mb-3" data-testid="bmi-value">
                {bmi.toFixed(1)}
              </p>
              <Badge className={`${getBMICategory(bmi).color} text-sm px-4 py-1`} data-testid="bmi-category">
                {getBMICategory(bmi).label}
              </Badge>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold text-sm">BMI Categories:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span className="text-muted-foreground">Underweight: &lt;18.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                  <span className="text-muted-foreground">Normal: 18.5-24.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                  <span className="text-muted-foreground">Overweight: 25-29.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-500" />
                  <span className="text-muted-foreground">Obese: ≥30</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-md bg-muted/50 border">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Note:</p>
              <p>BMI is a screening tool and doesn't directly measure body fat. Consult with a healthcare provider for a comprehensive health assessment.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BloodSugarInterpreter() {
  const [glucose, setGlucose] = useState("");
  const [testType, setTestType] = useState<"fasting" | "random">("fasting");
  const [interpretation, setInterpretation] = useState<any>(null);

  const interpretGlucose = () => {
    const value = parseFloat(glucose);
    
    if (isNaN(value) || value <= 0) return;

    let result;
    
    if (testType === "fasting") {
      if (value < 100) {
        result = {
          status: "Normal",
          color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
          icon: CheckCircle2,
          iconColor: "text-green-600",
          message: "Your fasting blood sugar is within the normal range.",
          recommendation: "Maintain your current healthy lifestyle habits."
        };
      } else if (value < 126) {
        result = {
          status: "Prediabetes",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
          icon: AlertCircle,
          iconColor: "text-yellow-600",
          message: "Your fasting blood sugar indicates prediabetes.",
          recommendation: "Consider lifestyle modifications and consult with your healthcare provider."
        };
      } else {
        result = {
          status: "Diabetes Range",
          color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600",
          message: "Your fasting blood sugar is in the diabetes range.",
          recommendation: "Please consult with a healthcare provider for proper diagnosis and treatment."
        };
      }
    } else {
      if (value < 140) {
        result = {
          status: "Normal",
          color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
          icon: CheckCircle2,
          iconColor: "text-green-600",
          message: "Your random blood sugar is within the normal range.",
          recommendation: "Continue monitoring your health regularly."
        };
      } else if (value < 200) {
        result = {
          status: "Elevated",
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
          icon: AlertCircle,
          iconColor: "text-yellow-600",
          message: "Your random blood sugar is elevated.",
          recommendation: "Consider getting a fasting glucose test and consult your healthcare provider."
        };
      } else {
        result = {
          status: "Diabetes Range",
          color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600",
          message: "Your random blood sugar is in the diabetes range.",
          recommendation: "Please seek medical attention promptly for proper evaluation."
        };
      }
    }

    setInterpretation(result);
  };

  return (
    <Card data-testid="blood-sugar-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Droplet className="h-6 w-6 text-primary" />
          Blood Sugar Level Interpreter
        </CardTitle>
        <CardDescription>
          Understand what your blood glucose readings mean
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="glucose" data-testid="label-glucose">Blood Glucose Level (mg/dL)</Label>
            <Input
              id="glucose"
              type="number"
              placeholder="100"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              data-testid="input-glucose"
            />
          </div>

          <div className="space-y-2">
            <Label data-testid="label-test-type">Test Type</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={testType === "fasting" ? "default" : "outline"}
                onClick={() => setTestType("fasting")}
                className="flex-1"
                data-testid="button-fasting"
              >
                Fasting
              </Button>
              <Button
                type="button"
                variant={testType === "random" ? "default" : "outline"}
                onClick={() => setTestType("random")}
                className="flex-1"
                data-testid="button-random"
              >
                Random
              </Button>
            </div>
          </div>
        </div>

        <Button type="button" onClick={interpretGlucose} className="w-full" data-testid="button-interpret">
          Interpret Result
        </Button>

        {interpretation && (
          <div className="space-y-4 p-6 rounded-md bg-card border" data-testid="glucose-result">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Blood Sugar</p>
              <p className="text-4xl font-mono font-bold text-foreground mb-3" data-testid="glucose-value">
                {glucose} mg/dL
              </p>
              <Badge className={`${interpretation.color} text-sm px-4 py-1`} data-testid="glucose-status">
                {interpretation.status}
              </Badge>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex gap-3">
                <interpretation.icon className={`h-5 w-5 ${interpretation.iconColor} flex-shrink-0`} />
                <div className="space-y-2">
                  <p className="text-sm font-medium">{interpretation.message}</p>
                  <p className="text-sm text-muted-foreground">{interpretation.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Reference Ranges:</h4>
          
          <div className="space-y-2 text-sm">
            <div className="p-3 rounded-md bg-muted/50">
              <p className="font-medium mb-1">Fasting (8+ hours without food):</p>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Normal: Less than 100 mg/dL</li>
                <li>• Prediabetes: 100-125 mg/dL</li>
                <li>• Diabetes: 126 mg/dL or higher</li>
              </ul>
            </div>
            
            <div className="p-3 rounded-md bg-muted/50">
              <p className="font-medium mb-1">Random (any time of day):</p>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Normal: Less than 140 mg/dL</li>
                <li>• Elevated: 140-199 mg/dL</li>
                <li>• Diabetes: 200 mg/dL or higher</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-md bg-muted/50 border">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Important:</p>
              <p>This tool provides general information only. Always consult with a healthcare professional for medical advice and diagnosis.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
