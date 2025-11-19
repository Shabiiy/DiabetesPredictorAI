import { Link, useLocation } from "wouter";
import { Activity, Home, LineChart, BookOpen, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/predict", label: "Predict", icon: Activity },
    { path: "/dashboard", label: "Dashboard", icon: LineChart },
    { path: "/resources", label: "Resources", icon: BookOpen },
    { path: "/tools", label: "Tools", icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2">
            <Activity className="h-6 w-6 text-primary" data-testid="logo-icon" />
            <span className="font-serif text-xl font-bold text-foreground" data-testid="logo-text">
              DiabetesAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                    data-testid={`nav-link-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/predict">
              <Button size="sm" className="hidden sm:inline-flex" data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <nav className="flex md:hidden pb-3 gap-1 overflow-x-auto" data-testid="nav-mobile">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2 flex-shrink-0"
                  data-testid={`nav-link-mobile-${item.label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
