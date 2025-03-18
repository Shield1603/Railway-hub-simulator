
import { useEffect } from "react";
import { ArrowRight, TrendingUp, Clock, Shield, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import PopularRoutes from "@/components/PopularRoutes";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Search Form */}
      <Hero />
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 -mt-24 relative z-20">
        <SearchForm />
      </div>

      {/* Popular Routes Section */}
      <PopularRoutes />

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RailwayHub</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a modern, safe, and convenient platform for all your train travel needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Fast Booking",
                description: "Book your tickets in seconds with our streamlined process and real-time availability."
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Our customer support team is available round the clock to assist you with any issues."
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Your personal information and payment details are protected with enterprise-grade security."
              },
              {
                icon: CreditCard,
                title: "Easy Refunds",
                description: "Cancel your tickets and get refunds processed quickly to your original payment method."
              }
            ].map((feature, index) => (
              <div key={feature.title} className="bg-white rounded-lg p-6 shadow-subtle hover:shadow-card transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
              <p className="text-muted-foreground mb-6">
                Get the RailwayHub app for a faster, more personalized experience.
                Book tickets, check PNR status, and receive real-time updates on your journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <span>Google Play</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <span>App Store</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-72 md:h-96">
              {/* App mockup placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-96 bg-white rounded-3xl shadow-elevation p-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-primary rounded-t-3xl"></div>
                  <div className="absolute top-16 left-3 right-3 h-40 bg-muted rounded-lg"></div>
                  <div className="absolute top-60 left-3 right-3 h-12 bg-primary/10 rounded-lg"></div>
                  <div className="absolute top-76 left-3 right-3 h-12 bg-primary/10 rounded-lg"></div>
                  <div className="absolute bottom-3 left-3 right-3 h-14 bg-primary rounded-lg flex items-center justify-center">
                    <div className="w-1/3 h-2 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
