import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Heart, 
  Apple, 
  Dumbbell, 
  Droplet,
  ShieldCheck,
  Brain,
  Users,
  ExternalLink
} from "lucide-react";

export default function Resources() {
  const resources = [
    {
      category: "Understanding Diabetes",
      icon: Brain,
      color: "text-chart-1 bg-chart-1/10",
      items: [
        {
          title: "What is Diabetes?",
          description: "Learn about the different types of diabetes, how it affects your body, and why early detection matters.",
          link: "#"
        },
        {
          title: "Risk Factors Explained",
          description: "Understand the genetic, lifestyle, and environmental factors that contribute to diabetes risk.",
          link: "#"
        },
        {
          title: "Symptoms to Watch For",
          description: "Recognize the early warning signs of diabetes and when to consult a healthcare provider.",
          link: "#"
        }
      ]
    },
    {
      category: "Prevention Strategies",
      icon: ShieldCheck,
      color: "text-chart-2 bg-chart-2/10",
      items: [
        {
          title: "Lifestyle Modifications",
          description: "Simple but effective changes you can make today to reduce your diabetes risk significantly.",
          link: "#"
        },
        {
          title: "Weight Management",
          description: "Evidence-based approaches to achieving and maintaining a healthy weight for diabetes prevention.",
          link: "#"
        },
        {
          title: "Stress Management",
          description: "Learn how chronic stress affects blood sugar and discover practical relaxation techniques.",
          link: "#"
        }
      ]
    },
    {
      category: "Nutrition & Diet",
      icon: Apple,
      color: "text-chart-3 bg-chart-3/10",
      items: [
        {
          title: "Balanced Meal Planning",
          description: "Create nutritious meal plans that help stabilize blood sugar and support overall health.",
          link: "#"
        },
        {
          title: "Carbohydrate Counting",
          description: "Master the basics of carb counting and glycemic index for better blood sugar control.",
          link: "#"
        },
        {
          title: "Healthy Eating Tips",
          description: "Practical advice for grocery shopping, cooking, and dining out while managing diabetes risk.",
          link: "#"
        }
      ]
    },
    {
      category: "Exercise & Activity",
      icon: Dumbbell,
      color: "text-chart-4 bg-chart-4/10",
      items: [
        {
          title: "Exercise Guidelines",
          description: "Recommended types and amounts of physical activity for diabetes prevention and management.",
          link: "#"
        },
        {
          title: "Starting a Fitness Routine",
          description: "Safe and effective ways to begin exercising, even if you're new to physical activity.",
          link: "#"
        },
        {
          title: "Staying Motivated",
          description: "Tips and strategies to maintain an active lifestyle and overcome common exercise barriers.",
          link: "#"
        }
      ]
    },
    {
      category: "Monitoring & Testing",
      icon: Droplet,
      color: "text-chart-5 bg-chart-5/10",
      items: [
        {
          title: "Blood Sugar Monitoring",
          description: "Learn when and how to check your blood glucose levels for optimal health management.",
          link: "#"
        },
        {
          title: "Understanding Lab Results",
          description: "Decode A1C, fasting glucose, and other important diabetes-related test results.",
          link: "#"
        },
        {
          title: "Regular Health Screenings",
          description: "Recommended screening schedule for diabetes and related health complications.",
          link: "#"
        }
      ]
    },
    {
      category: "Support & Community",
      icon: Users,
      color: "text-destructive bg-destructive/10",
      items: [
        {
          title: "Finding Support Groups",
          description: "Connect with others managing diabetes risk through local and online support communities.",
          link: "#"
        },
        {
          title: "Family Involvement",
          description: "How to engage family members in your health journey and create a supportive environment.",
          link: "#"
        },
        {
          title: "Mental Health Resources",
          description: "Address the emotional aspects of health management with professional support options.",
          link: "#"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3" data-testid="resources-title">
            Health Resources & Education
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto" data-testid="resources-subtitle">
            Evidence-based information to help you understand, prevent, and manage diabetes risk
          </p>
        </div>

        <div className="space-y-8">
          {resources.map((category, categoryIndex) => {
            const Icon = category.icon;
            
            return (
              <div key={categoryIndex} data-testid={`category-${categoryIndex}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-md ${category.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground" data-testid={`category-title-${categoryIndex}`}>
                    {category.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <Card 
                      key={itemIndex} 
                      className="hover-elevate h-full" 
                      data-testid={`resource-card-${categoryIndex}-${itemIndex}`}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg" data-testid={`resource-title-${categoryIndex}-${itemIndex}`}>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 text-sm leading-relaxed">
                          {item.description}
                        </CardDescription>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2 w-full" 
                          data-testid={`button-resource-${categoryIndex}-${itemIndex}`}
                        >
                          Learn More
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20" data-testid="cta-card">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
              Take Control of Your Health
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Knowledge is the first step toward prevention. Use our assessment tool to understand your personal risk factors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild data-testid="button-cta-assess">
                <a href="/predict">Start Assessment</a>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="button-cta-tools">
                <a href="/tools">Health Tools</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
