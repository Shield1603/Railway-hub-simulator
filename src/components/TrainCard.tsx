
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, ArrowRight, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrainCardProps {
  train: {
    id: string;
    name: string;
    number: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    date: string;
    price: number;
    availability: string;
    classes: string[];
    rating: number;
  };
  className?: string;
}

const TrainCard = ({ train, className }: TrainCardProps) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking?trainId=${train.id}`);
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-card transition-shadow", className)}>
      <CardContent className="p-0">
        <div className="p-5 border-b">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="px-2 py-0 h-5 bg-primary/5 text-primary border-primary/20 font-medium">
                  {train.number}
                </Badge>
                <h3 className="font-semibold text-lg">{train.name}</h3>
              </div>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{train.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{train.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-foreground font-medium">{train.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">₹{train.price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 border-b">
          {/* Departure */}
          <div className="p-4 md:border-r">
            <div className="text-2xl font-semibold">{train.departureTime}</div>
            <div className="text-sm text-muted-foreground">{train.from}</div>
          </div>

          {/* Journey line */}
          <div className="hidden md:flex items-center justify-center md:col-span-3 px-4">
            <div className="w-full flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="flex-1 h-0.5 bg-primary/30 relative">
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-medium text-muted-foreground">
                  {train.duration}
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
          </div>

          {/* Arrival */}
          <div className="p-4 md:border-l">
            <div className="text-2xl font-semibold">{train.arrivalTime}</div>
            <div className="text-sm text-muted-foreground">{train.to}</div>
          </div>

          {/* Mobile journey info */}
          <div className="flex md:hidden items-center justify-center p-2 border-t border-b">
            <ArrowRight className="h-4 w-4 text-primary mx-2" />
            <span className="text-sm font-medium">{train.duration}</span>
          </div>
        </div>

        <div className="p-4 flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-sm font-medium mb-1">Available Classes</div>
            <div className="flex flex-wrap gap-2">
              {train.classes.map((trainClass) => (
                <Badge key={trainClass} variant="secondary" className="font-normal">
                  {trainClass}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="text-sm font-medium mb-0.5">Availability</div>
              <div className={cn(
                "text-sm font-medium",
                train.availability === "Available" ? "text-green-600" : 
                train.availability === "Waiting List" ? "text-amber-600" : 
                "text-red-600"
              )}>
                {train.availability}
              </div>
            </div>
            <Button onClick={handleBooking} className="gap-2">
              <span>Book</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
