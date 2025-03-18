
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a small delay to trigger animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 pb-16 flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>

      {/* Main content container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div 
                className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm transition-opacity duration-700",
                  loaded ? "opacity-100" : "opacity-0"
                )}
              >
                <span className="animate-pulse-soft mr-1.5">●</span>
                Now available in 500+ cities across India
              </div>

              <h1 
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight transition-all duration-700 transform",
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <span className="text-foreground">Travel India by train with</span>{" "}
                <span className="text-primary">RailwayHub</span>
              </h1>

              <p 
                className={cn(
                  "text-lg md:text-xl text-foreground/70 max-w-xl transition-all duration-700 delay-100",
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                The modern way to book train tickets. Fast, secure, and hassle-free travel 
                planning for your journey across India.
              </p>
            </div>

            <div 
              className={cn(
                "flex flex-wrap gap-3 transition-all duration-700 delay-200",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <Button size="lg" className="gap-2 min-w-[150px]">
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 min-w-[150px]">
                <span>View Routes</span>
              </Button>
            </div>

            <div 
              className={cn(
                "grid grid-cols-3 gap-4 pt-6 transition-all duration-700 delay-300",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {[
                { icon: MapPin, label: "500+ Destinations" },
                { icon: Calendar, label: "Instant Booking" },
                { icon: Users, label: "6M+ Travelers" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Train illustration */}
          <div 
            className={cn(
              "relative transition-all duration-1000 delay-300",
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <div className="relative w-full aspect-[4/3]">
              {/* Train image placeholder */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-elevation">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-1/2 rounded-xl bg-white shadow-lg p-5 flex flex-col items-center justify-center">
                    <div className="w-20 h-2 bg-primary/20 rounded-full mb-3"></div>
                    <div className="w-32 h-2 bg-primary/20 rounded-full mb-6"></div>
                    
                    <div className="grid grid-cols-5 gap-2 w-full">
                      {Array(5).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-8 rounded-md animate-pulse-soft",
                            i % 2 === 0 ? "bg-primary/20" : "bg-secondary"
                          )}
                          style={{ 
                            animationDelay: `${i * 300}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-primary/20 animate-pulse-soft"></div>
              <div className="absolute -left-4 bottom-1/3 w-8 h-8 rounded-full bg-primary/30 animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
              <div className="absolute right-1/4 -bottom-2 w-10 h-10 rounded-full bg-primary/10 animate-pulse-soft" style={{ animationDelay: "1.5s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
