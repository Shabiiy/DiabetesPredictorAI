import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertPredictionSchema, type InsertPrediction } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Activity, Loader2 } from "lucide-react";

export default function Predict() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);

  const form = useForm<InsertPrediction>({
    resolver: zodResolver(insertPredictionSchema),
    defaultValues: {
      glucose: 120,
      bloodPressure: 80,
      skinThickness: 20,
      insulin: 80,
      bmi: 25,
      diabetesPedigreeFunction: 0.5,
      age: 30,
      pregnancies: 0,
      physicalActivity: 3,
      familyHistory: false,
      smokingStatus: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPrediction) => {
      const response = await apiRequest("POST", "/api/predictions", data);
      return await response.json();
    },
    onSuccess: (result) => {
      toast({
        title: "Prediction Complete",
        description: "Your diabetes risk has been calculated successfully.",
      });
      setLocation(`/results/${result.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to calculate prediction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sections = [
    { title: "Personal Information", fields: ["age", "pregnancies"] },
    { title: "Vital Metrics", fields: ["glucose", "bloodPressure", "insulin"] },
    { title: "Physical Measurements", fields: ["bmi", "skinThickness"] },
    { title: "Lifestyle & Medical History", fields: ["physicalActivity", "diabetesPedigreeFunction", "familyHistory", "smokingStatus"] },
  ];

  const healthParams = {
    glucose: { label: "Glucose Level", unit: "mg/dL", min: 0, max: 300, normal: "70-100 mg/dL (fasting)" },
    bloodPressure: { label: "Blood Pressure (Diastolic)", unit: "mm Hg", min: 40, max: 140, normal: "60-80 mm Hg" },
    skinThickness: { label: "Skin Thickness (Triceps)", unit: "mm", min: 0, max: 100, normal: "10-50 mm" },
    insulin: { label: "Insulin Level", unit: "μU/mL", min: 0, max: 400, normal: "16-166 μU/mL" },
    bmi: { label: "Body Mass Index (BMI)", unit: "kg/m²", min: 10, max: 60, normal: "18.5-24.9 kg/m²" },
    diabetesPedigreeFunction: { label: "Family Diabetes History Score", unit: "", min: 0, max: 2.5, normal: "0.0-1.0 (average)" },
    age: { label: "Age", unit: "years", min: 1, max: 120, normal: "—" },
    pregnancies: { label: "Number of Pregnancies", unit: "", min: 0, max: 20, normal: "—" },
    physicalActivity: { label: "Physical Activity (days/week)", unit: "days", min: 0, max: 7, normal: "3-5 days recommended" },
  };

  const onSubmit = (data: InsertPrediction) => {
    mutation.mutate(data);
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3" data-testid="page-title">
            Diabetes Risk Assessment
          </h1>
          <p className="text-base text-muted-foreground" data-testid="page-subtitle">
            Complete all sections to receive your personalized risk analysis
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground" data-testid="progress-label">
              Progress: {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm text-muted-foreground" data-testid="progress-percentage">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-md overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        <Form {...form}>
          <form 
            onSubmit={(e) => {
                // Prevent default form submission. Submission must be triggered
                // explicitly via the Analyze button (see its onClick).
                e.preventDefault();
              }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // Prevent Enter from submitting the form automatically.
                  // If not on the last section, advance to the next section.
                  // If on the last section, do nothing so the user must click the Analyze button.
                  e.preventDefault();
                  if (currentSection < sections.length - 1) {
                    setCurrentSection(currentSection + 1);
                  }
                }
              }}
            className="space-y-6"
          >
            <Card data-testid={`section-card-${currentSection}`}>
              <CardHeader>
                <CardTitle className="font-serif text-xl" data-testid="section-title">
                  {sections[currentSection].title}
                </CardTitle>
                <CardDescription data-testid="section-description">
                  Enter accurate information for the best prediction results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sections[currentSection].fields.map((fieldName) => {
                  const key = fieldName as keyof typeof healthParams;
                  
                  if (fieldName === "familyHistory" || fieldName === "smokingStatus") {
                    return (
                      <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base" data-testid={`label-${fieldName}`}>
                                {fieldName === "familyHistory" ? "Family History of Diabetes" : "Current Smoker"}
                              </FormLabel>
                              <FormDescription data-testid={`description-${fieldName}`}>
                                {fieldName === "familyHistory" 
                                  ? "Do you have close relatives with diabetes?" 
                                  : "Are you currently smoking?"}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                                data-testid={`switch-${fieldName}`}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    );
                  }

                  const param = healthParams[key];
                  if (!param) return null;

                  return (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as any}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel className="text-base" data-testid={`label-${fieldName}`}>
                              {param.label}
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={field.value as number}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                className="w-24 text-right font-mono"
                                step={fieldName === "diabetesPedigreeFunction" ? "0.1" : "1"}
                                data-testid={`input-${fieldName}`}
                              />
                              {param.unit && (
                                <span className="text-sm text-muted-foreground min-w-[60px]" data-testid={`unit-${fieldName}`}>
                                  {param.unit}
                                </span>
                              )}
                            </div>
                          </div>
                          <FormControl>
                            <Slider
                              min={param.min}
                              max={param.max}
                              step={fieldName === "diabetesPedigreeFunction" ? 0.1 : 1}
                              value={[field.value as number]}
                              onValueChange={([value]) => field.onChange(value)}
                              className="w-full"
                              data-testid={`slider-${fieldName}`}
                            />
                          </FormControl>
                          <FormDescription className="text-xs" data-testid={`range-${fieldName}`}>
                            Normal range: {param.normal}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </CardContent>
            </Card>

            <div className="flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                data-testid="button-previous"
              >
                Previous
              </Button>

              {currentSection < sections.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentSection(currentSection + 1)}
                  data-testid="button-next"
                >
                  Next Section
                </Button>
                ) : (
                <Button
                  type="button"
                  onClick={() => form.handleSubmit(onSubmit)()}
                  disabled={mutation.isPending}
                  className="gap-2"
                  data-testid="button-submit"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Activity className="h-4 w-4" />
                      Analyze Risk
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
