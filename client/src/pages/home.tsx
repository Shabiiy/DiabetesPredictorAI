import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, TrendingUp, Shield, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-chart-2/10 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="hero-title">
              AI-Powered Diabetes Risk Prediction
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8" data-testid="hero-subtitle">
              Advanced machine learning technology to assess your diabetes risk and guide you toward a healthier future
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/predict">
                <Button size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-start-prediction">
                  Start Your Assessment
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4" data-testid="features-title">
              Why Choose DiabetesAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="features-subtitle">
              Comprehensive health assessment powered by cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-elevate" data-testid="feature-card-ai">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Advanced AI Model</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Trained on extensive medical datasets to provide highly accurate risk assessments based on multiple health parameters
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="feature-card-instant">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-chart-2/10">
                    <Zap className="h-6 w-6 text-chart-2" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Instant Results</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Get your diabetes risk score in seconds with detailed breakdown of contributing factors and personalized insights
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="feature-card-tracking">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-chart-3/10">
                    <TrendingUp className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Track Progress</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Monitor your health metrics over time with interactive charts and visualizations to see your improvement journey
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="feature-card-recommendations">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-chart-4/10">
                    <Heart className="h-6 w-6 text-chart-4" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Personal Recommendations</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Receive tailored lifestyle and dietary suggestions based on your specific risk factors and health profile
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="feature-card-privacy">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-chart-5/10">
                    <Shield className="h-6 w-6 text-chart-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Privacy First</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Your health data is secure and private. We never share your information with third parties
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="feature-card-tools">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-md bg-destructive/10">
                    <Activity className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Health Tools</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Access BMI calculator, blood sugar interpreter, and other helpful tools to better understand your health
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-chart-2/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6" data-testid="cta-title">
              Take Control of Your Health Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="cta-subtitle">
              Early detection and prevention are key to managing diabetes risk. Start your free assessment now.
            </p>
            <Link href="/predict">
              <Button size="lg" className="text-lg px-12 py-6 h-auto" data-testid="button-cta-assess">
                Begin Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
