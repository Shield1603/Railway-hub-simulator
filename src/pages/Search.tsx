
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ArrowDownUp, Calendar, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import TrainCard from "@/components/TrainCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for trains
const mockTrains = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12301",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "16:35",
    arrivalTime: "08:15",
    duration: "15h 40m",
    date: "Mon, 15 Jul",
    price: 1255,
    availability: "Available",
    classes: ["AC 1st Class", "AC 2 Tier", "AC 3 Tier"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "12002",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "06:15",
    arrivalTime: "22:30",
    duration: "16h 15m",
    date: "Mon, 15 Jul",
    price: 1350,
    availability: "Available",
    classes: ["Chair Car", "Executive Chair Car"],
    rating: 4.3,
  },
  {
    id: "3",
    name: "Duronto Express",
    number: "12213",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "11:25",
    arrivalTime: "03:55",
    duration: "16h 30m",
    date: "Mon, 15 Jul",
    price: 1190,
    availability: "Waiting List",
    classes: ["AC 2 Tier", "AC 3 Tier", "Sleeper"],
    rating: 4.0,
  },
  {
    id: "4",
    name: "Garib Rath",
    number: "12909",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "15:35",
    arrivalTime: "08:10",
    duration: "16h 35m",
    date: "Mon, 15 Jul",
    price: 850,
    availability: "Available",
    classes: ["AC 3 Tier", "Sleeper"],
    rating: 3.8,
  },
  {
    id: "5",
    name: "Tejas Express",
    number: "22119",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "08:15",
    arrivalTime: "23:50",
    duration: "15h 35m",
    date: "Mon, 15 Jul",
    price: 1450,
    availability: "RAC",
    classes: ["AC Chair Car", "Executive Chair Car"],
    rating: 4.7,
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [trains, setTrains] = useState(mockTrains);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("departure");

  // Get search parameters
  const fromCity = searchParams.get("from") || "";
  const toCity = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const passengers = searchParams.get("passengers") || "1";

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sort trains based on selected criteria
  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    let sortedTrains = [...trains];
    
    switch (sortType) {
      case "departure":
        sortedTrains.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case "arrival":
        sortedTrains.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
        break;
      case "duration":
        sortedTrains.sort((a, b) => {
          const durationA = parseInt(a.duration.split("h")[0]);
          const durationB = parseInt(b.duration.split("h")[0]);
          return durationA - durationB;
        });
        break;
      case "price":
        sortedTrains.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    
    setTrains(sortedTrains);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Search form header */}
        <div className="bg-muted/30 border-b py-6">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchForm variant="simple" className="mb-5" />
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold mb-1">Trains from {fromCity} to {toCity}</h1>
                <p className="text-sm text-muted-foreground">
                  {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : "Select a date"} 
                  • {passengers} {parseInt(passengers) === 1 ? "passenger" : "passengers"}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Change Date</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Filters (Sidebar) */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </h2>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">Reset All</Button>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-5">
                  {/* Train Classes */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Train Classes</h3>
                    <div className="flex flex-wrap gap-2">
                      {["AC 1st Class", "AC 2 Tier", "AC 3 Tier", "Sleeper", "Chair Car"].map((trainClass) => (
                        <Badge 
                          key={trainClass} 
                          variant="outline" 
                          className="rounded-full font-normal cursor-pointer hover:bg-primary/5"
                        >
                          {trainClass}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Departure Time */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Departure Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["00:00 - 06:00", "06:00 - 12:00", "12:00 - 18:00", "18:00 - 24:00"].map((time) => (
                        <Badge 
                          key={time} 
                          variant="outline" 
                          className="rounded-full font-normal cursor-pointer hover:bg-primary/5 justify-center"
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {["Below ₹1000", "₹1000 - ₹1500", "₹1500 - ₹2000", "Above ₹2000"].map((range) => (
                        <div key={range} className="flex items-center">
                          <input type="checkbox" id={range} className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <label htmlFor={range} className="ml-2 text-sm text-muted-foreground cursor-pointer">
                            {range}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Train Results */}
            <div className="md:col-span-3 space-y-4">
              {/* Sorting options */}
              <div className="bg-white rounded-lg border p-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ArrowDownUp className="h-4 w-4 text-primary" />
                  <span>Sort by:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "departure", label: "Departure" },
                    { id: "arrival", label: "Arrival" },
                    { id: "duration", label: "Duration" },
                    { id: "price", label: "Price" },
                  ].map((option) => (
                    <Button
                      key={option.id}
                      variant={sortBy === option.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSort(option.id)}
                      className="h-8"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Train results */}
              {loading ? (
                // Loading state
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                      <div className="h-5 bg-muted rounded w-1/3 mb-4"></div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </div>
                      <div className="h-10 bg-muted rounded w-1/4 mt-4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                // Train results
                <div className="space-y-4">
                  {trains.map((train) => (
                    <TrainCard key={train.id} train={train} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
