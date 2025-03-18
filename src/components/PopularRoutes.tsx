
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const popularRoutes = [
  {
    from: "Delhi",
    to: "Mumbai",
    duration: "16h 35m",
    trains: 28,
    price: 1200,
    image: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
  {
    from: "Mumbai",
    to: "Bangalore",
    duration: "21h 10m",
    trains: 15,
    price: 1500,
    image: "url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
  {
    from: "Chennai",
    to: "Kolkata",
    duration: "26h 45m",
    trains: 12,
    price: 1800,
    image: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
  {
    from: "Hyderabad",
    to: "Delhi",
    duration: "22h 30m",
    trains: 18,
    price: 1650,
    image: "url('https://images.unsplash.com/photo-1513581166391-887a96ddeafd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
  {
    from: "Kolkata",
    to: "Mumbai",
    duration: "32h 15m",
    trains: 10,
    price: 2100,
    image: "url('https://images.unsplash.com/photo-1599909368576-8bdf673e8015?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
  {
    from: "Bangalore",
    to: "Chennai",
    duration: "6h 40m",
    trains: 25,
    price: 800,
    image: "url('https://images.unsplash.com/photo-1580674684089-fc029a3942a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')",
  },
];

const PopularRoutes = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a small delay to trigger animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most traveled train routes across India, with comfortable
            journeys and scenic views along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <Card 
              key={`${route.from}-${route.to}`}
              className={cn(
                "overflow-hidden transition-all duration-700 transform bg-white hover:shadow-elevation",
                loaded 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8",
                // Add staggered delay based on index
                { 
                  "transition-delay-100": index % 3 === 0,
                  "transition-delay-200": index % 3 === 1,
                  "transition-delay-300": index % 3 === 2,
                }
              )}
            >
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: route.image }}
              >
                <div className="w-full h-full flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <div className="bg-white/70 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
                    <div className="font-medium flex items-center justify-center gap-2">
                      <span>{route.from}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      <span>{route.to}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{route.duration}</span> journey
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{route.trains}</span> trains
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-primary font-bold">
                    ₹{route.price}
                    <span className="text-xs text-muted-foreground font-normal ml-1">onwards</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <span>View Trains</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg" className="gap-2">
            <span>View All Routes</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
