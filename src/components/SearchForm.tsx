
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const locations = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
];

interface SearchFormProps {
  className?: string;
  variant?: "default" | "simple";
}

const SearchForm = ({ className, variant = "default" }: SearchFormProps) => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filteredFromLocations = locations.filter(location => 
    location.toLowerCase().includes(from.toLowerCase())
  );
  
  const filteredToLocations = locations.filter(location => 
    location.toLowerCase().includes(to.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      // Navigate to search results with query params
      navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passengers)}`);
    }
  };

  if (variant === "simple") {
    return (
      <Card className={cn("border shadow-card overflow-hidden", className)}>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border-none shadow-none bg-muted"
                required
              />
            </div>
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border-none shadow-none bg-muted"
                required
              />
            </div>
            <Button type="submit" className="gap-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border shadow-card overflow-hidden", className)}>
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* From location */}
            <div className="relative">
              <div className="mb-2 text-sm font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>From</span>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="City or Station"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  onFocus={() => setShowFromSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                  className="w-full bg-muted focus:bg-white transition-all"
                  required
                />
                {showFromSuggestions && from.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg">
                    {filteredFromLocations.length > 0 ? (
                      filteredFromLocations.map((location) => (
                        <div
                          key={location}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                          onMouseDown={() => {
                            setFrom(location);
                            setShowFromSuggestions(false);
                          }}
                        >
                          {location}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-muted-foreground">No locations found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* To location */}
            <div className="relative">
              <div className="mb-2 text-sm font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>To</span>
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="City or Station"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  onFocus={() => setShowToSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                  className="w-full bg-muted focus:bg-white transition-all"
                  required
                />
                {showToSuggestions && to.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg">
                    {filteredToLocations.length > 0 ? (
                      filteredToLocations.map((location) => (
                        <div
                          key={location}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                          onMouseDown={() => {
                            setTo(location);
                            setShowToSuggestions(false);
                          }}
                        >
                          {location}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-muted-foreground">No locations found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <div className="mb-2 text-sm font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>Journey Date</span>
              </div>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-muted focus:bg-white transition-all"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Passengers */}
            <div>
              <div className="mb-2 text-sm font-medium flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>Passengers</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full bg-muted focus:bg-white transition-all"
                  min="1"
                  max="6"
                  required
                />
                <Button type="submit" className="w-full gap-2">
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
