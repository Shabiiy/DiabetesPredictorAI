import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Activity, 
  TrendingUp, 
  Heart, 
  AlertTriangle, 
  CheckCircle2,
  ArrowRight,
  Download,
  Home
} from "lucide-react";
import type { Prediction } from "@shared/schema";

export default function Results() {
  const [, params] = useRoute("/results/:id");
  const predictionId = params?.id;

  const { data: prediction, isLoading } = useQuery<Prediction>({
    queryKey: [`/api/predictions/${predictionId}`],
    enabled: !!predictionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="font-serif">Prediction Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">The requested prediction could not be found.</p>
            <Link href="/predict">
              <Button>Start New Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const riskColor = 
    prediction.riskCategory === "Low" ? "text-green-600" :
    prediction.riskCategory === "Medium" ? "text-yellow-600" :
    "text-red-600";

  const riskBg = 
    prediction.riskCategory === "Low" ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900" :
    prediction.riskCategory === "Medium" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900" :
    "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900";

  const recommendations = getRecommendations(prediction);

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3" data-testid="results-title">
            Your Diabetes Risk Assessment
          </h1>
          <p className="text-base text-muted-foreground" data-testid="results-subtitle">
            Based on your health metrics and lifestyle factors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className={`${riskBg} border-2`} data-testid="risk-score-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl" data-testid="risk-score-title">
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-background/50 mb-4">
                  <span className={`font-mono text-4xl font-bold ${riskColor}`} data-testid="risk-percentage">
                    {Math.round(prediction.riskScore * 100)}%
                  </span>
                </div>
                <div>
                  <Badge 
                    variant={prediction.riskCategory === "Low" ? "default" : "destructive"}
                    className="text-base px-4 py-1"
                    data-testid="risk-category"
                  >
                    {prediction.riskCategory} Risk
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className={`font-medium ${riskColor}`}>{Math.round(prediction.riskScore * 100)}%</span>
                </div>
                <Progress value={prediction.riskScore * 100} className="h-3" data-testid="risk-progress" />
              </div>

              <p className="text-sm text-muted-foreground text-center" data-testid="risk-interpretation">
                {prediction.riskCategory === "Low" && "Your diabetes risk is currently low. Continue maintaining healthy habits."}
                {prediction.riskCategory === "Medium" && "Your diabetes risk is moderate. Consider lifestyle modifications."}
                {prediction.riskCategory === "High" && "Your diabetes risk is elevated. Please consult with a healthcare provider."}
              </p>
            </CardContent>
          </Card>

          <Card data-testid="key-metrics-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl" data-testid="key-metrics-title">
                Key Health Metrics
              </CardTitle>
              <CardDescription>Overview of your submitted values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MetricRow label="Glucose Level" value={prediction.glucose} unit="mg/dL" normal={prediction.glucose >= 70 && prediction.glucose <= 100} />
              <MetricRow label="Blood Pressure" value={prediction.bloodPressure} unit="mm Hg" normal={prediction.bloodPressure >= 60 && prediction.bloodPressure <= 80} />
              <MetricRow label="BMI" value={prediction.bmi} unit="kg/m²" normal={prediction.bmi >= 18.5 && prediction.bmi <= 24.9} />
              <MetricRow label="Insulin" value={prediction.insulin} unit="μU/mL" normal={prediction.insulin >= 16 && prediction.insulin <= 166} />
              <MetricRow label="Age" value={prediction.age} unit="years" />
              <MetricRow label="Physical Activity" value={prediction.physicalActivity} unit="days/week" normal={prediction.physicalActivity >= 3} />
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6" data-testid="recommendations-card">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center gap-2" data-testid="recommendations-title">
              <Heart className="h-6 w-6 text-primary" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Actions you can take to improve your health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-md bg-card border hover-elevate"
                  data-testid={`recommendation-${index}`}
                >
                  <div className="flex-shrink-0">
                    {rec.priority === "high" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-chart-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2" data-testid="button-view-dashboard">
              <TrendingUp className="h-4 w-4" />
              View Dashboard
            </Button>
          </Link>
          <Link href="/predict">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-new-assessment">
              <Activity className="h-4 w-4" />
              New Assessment
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="gap-2" data-testid="button-home">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, unit, normal }: { label: string; value: number; unit?: string; normal?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0" data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono font-semibold">{value.toFixed(1)}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        {normal !== undefined && (
          normal ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          )
        )}
      </div>
    </div>
  );
}

function getRecommendations(prediction: Prediction) {
  const recs = [];

  if (prediction.glucose > 100) {
    recs.push({
      priority: "high",
      title: "Monitor Blood Sugar",
      description: "Your glucose level is elevated. Consider regular monitoring and consult with a healthcare provider."
    });
  }

  if (prediction.bmi > 25) {
    recs.push({
      priority: "medium",
      title: "Healthy Weight Management",
      description: "Maintaining a healthy BMI through balanced diet and exercise can reduce diabetes risk."
    });
  }

  if (prediction.physicalActivity < 3) {
    recs.push({
      priority: "high",
      title: "Increase Physical Activity",
      description: "Aim for at least 150 minutes of moderate aerobic activity per week."
    });
  }

  if (prediction.familyHistory) {
    recs.push({
      priority: "medium",
      title: "Regular Health Screenings",
      description: "With family history, schedule regular diabetes screenings with your doctor."
    });
  }

  if (prediction.smokingStatus) {
    recs.push({
      priority: "high",
      title: "Quit Smoking",
      description: "Smoking increases diabetes risk. Consider a smoking cessation program."
    });
  }

  if (prediction.bloodPressure > 85) {
    recs.push({
      priority: "medium",
      title: "Manage Blood Pressure",
      description: "High blood pressure can compound diabetes risk. Monitor and manage with lifestyle changes."
    });
  }

  if (recs.length < 4) {
    recs.push({
      priority: "low",
      title: "Balanced Diet",
      description: "Focus on whole grains, lean proteins, fruits, and vegetables."
    });
    recs.push({
      priority: "low",
      title: "Stress Management",
      description: "Practice relaxation techniques like meditation or yoga to manage stress levels."
    });
  }

  return recs.slice(0, 6);
}
