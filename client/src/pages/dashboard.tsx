import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingDown, TrendingUp, Calendar, Plus } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Prediction } from "@shared/schema";

export default function Dashboard() {
  const { data: predictions, isLoading } = useQuery<Prediction[]>({
    queryKey: ["/api/predictions"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  const sortedPredictions = predictions?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) || [];

  const avgRisk = predictions?.length 
    ? predictions.reduce((sum, p) => sum + p.riskScore, 0) / predictions.length 
    : 0;

  const latestPrediction = sortedPredictions[0];
  const previousPrediction = sortedPredictions[1];
  
  const riskTrend = latestPrediction && previousPrediction
    ? latestPrediction.riskScore - previousPrediction.riskScore
    : 0;

  const chartData = sortedPredictions.slice(0, 10).reverse().map((p, index) => ({
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    risk: Math.round(p.riskScore * 100),
    fullDate: new Date(p.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2" data-testid="dashboard-title">
              Health Dashboard
            </h1>
            <p className="text-base text-muted-foreground" data-testid="dashboard-subtitle">
              Track your diabetes risk assessments over time
            </p>
          </div>
          <Link href="/predict">
            <Button className="gap-2" data-testid="button-new-prediction">
              <Plus className="h-4 w-4" />
              New Assessment
            </Button>
          </Link>
        </div>

        {predictions?.length === 0 ? (
          <Card className="text-center py-16" data-testid="empty-state">
            <CardContent>
              <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">No Assessments Yet</h3>
              <p className="text-muted-foreground mb-6">Start tracking your diabetes risk by completing your first assessment</p>
              <Link href="/predict">
                <Button data-testid="button-first-assessment">
                  Start Your First Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover-elevate" data-testid="stat-card-total">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold" data-testid="total-assessments">
                    {predictions?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Predictions completed
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="stat-card-average">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Risk</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold" data-testid="average-risk">
                    {Math.round(avgRisk * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all assessments
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="stat-card-trend">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Trend</CardTitle>
                  {riskTrend < 0 ? (
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  ) : riskTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-600" />
                  ) : (
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-mono font-bold" data-testid="risk-trend">
                    {riskTrend !== 0 ? (riskTrend > 0 ? '+' : '') + Math.round(riskTrend * 100) + '%' : 'No change'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Compared to previous
                  </p>
                </CardContent>
              </Card>
            </div>

            {chartData.length > 1 && (
              <Card className="mb-8" data-testid="trend-chart-card">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Risk Score Trend</CardTitle>
                  <CardDescription>Your diabetes risk over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      risk: {
                        label: "Risk Score",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          className="text-xs"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          domain={[0, 100]}
                          className="text-xs"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            <Card data-testid="history-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Assessment History</CardTitle>
                <CardDescription>View all your past predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedPredictions.map((prediction, index) => (
                    <div
                      key={prediction.id}
                      className="flex items-center justify-between p-4 rounded-md border hover-elevate"
                      data-testid={`history-item-${index}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-sm text-muted-foreground min-w-[100px]">
                          {new Date(prediction.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={prediction.riskCategory === "Low" ? "default" : "destructive"}
                            className="min-w-[80px] justify-center"
                          >
                            {prediction.riskCategory}
                          </Badge>
                          <span className="font-mono font-semibold">
                            {Math.round(prediction.riskScore * 100)}%
                          </span>
                        </div>
                      </div>
                      <Link href={`/results/${prediction.id}`}>
                        <Button variant="ghost" size="sm" data-testid={`button-view-${index}`}>
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
