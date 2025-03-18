
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, User, Users, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock train data
const train = {
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
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState("AC 2 Tier");
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "Male" }]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  // Get train ID from URL
  const trainId = searchParams.get("trainId") || "1";

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  // Handle form input changes
  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field: string, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  // Add a new passenger
  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { name: "", age: "", gender: "Male" }]);
    } else {
      toast({
        title: "Maximum limit reached",
        description: "You can book up to 6 passengers only.",
        variant: "destructive",
      });
    }
  };

  // Remove a passenger
  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep === 1) {
      // Validate passenger details
      const isValid = passengers.every(p => p.name && p.age);
      if (!isValid) {
        toast({
          title: "Incomplete passenger details",
          description: "Please fill name and age for all passengers.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      // Validate contact details
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
      
      if (!emailRegex.test(contact.email)) {
        toast({
          title: "Invalid email address",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      
      if (!phoneRegex.test(contact.phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid 10-digit phone number.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  // Go to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Calculate total amount
  const totalAmount = passengers.length * train.price;

  // Handle payment process
  const processPayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(4); // Success step
      window.scrollTo(0, 0);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back button and Title */}
          <div className="flex items-center py-6 gap-4">
            <Button
              variant="ghost"
              className="p-2 h-auto"
              onClick={() => {
                if (currentStep === 1) {
                  navigate(-1); // Go back to search results
                } else {
                  goToPreviousStep();
                }
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">
                {currentStep === 4 ? "Booking Confirmed" : "Book Your Train Ticket"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {train.name} ({train.number}) • {train.from} to {train.to}
              </p>
            </div>
          </div>

          {/* Progress steps */}
          {currentStep < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {["Passenger Details", "Contact Information", "Payment"].map((step, index) => (
                  <div 
                    key={step} 
                    className={cn(
                      "flex flex-col items-center relative z-10",
                      currentStep > index + 1 ? "text-primary" : 
                      currentStep === index + 1 ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2",
                        currentStep > index + 1 ? "bg-primary text-white" : 
                        currentStep === index + 1 ? "bg-primary/10 text-primary border border-primary/30" : 
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {currentStep > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-center">{step}</span>
                  </div>
                ))}
              </div>
              
              {/* Progress bar */}
              <div className="relative mt-4 mb-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all"
                  style={{ width: `${(currentStep - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step 1: Passenger Details */}
          {currentStep === 1 && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Passenger Details</h2>
                      <div className="flex gap-4 items-center">
                        <div className="text-sm flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{passengers.length} Passenger{passengers.length > 1 ? 's' : ''}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={addPassenger} 
                          disabled={passengers.length >= 6}
                        >
                          Add Passenger
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Travel Class</label>
                      <RadioGroup 
                        value={selectedClass} 
                        onValueChange={setSelectedClass}
                        className="flex flex-wrap gap-4"
                      >
                        {train.classes.map((trainClass) => (
                          <div key={trainClass} className="flex items-center space-x-2">
                            <RadioGroupItem value={trainClass} id={trainClass} />
                            <Label htmlFor={trainClass}>{trainClass}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {passengers.map((passenger, index) => (
                      <div key={index} className="pt-4 pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Passenger {index + 1}</h3>
                          {passengers.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removePassenger(index)}
                              className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm mb-1.5 block">Full Name</label>
                            <Input 
                              placeholder="Enter passenger name" 
                              value={passenger.name}
                              onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm mb-1.5 block">Age</label>
                            <Input 
                              type="number" 
                              placeholder="Enter age" 
                              min="1"
                              max="120"
                              value={passenger.age}
                              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm mb-1.5 block">Gender</label>
                            <RadioGroup 
                              value={passenger.gender} 
                              onValueChange={(value) => handlePassengerChange(index, "gender", value)}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Male" id={`male-${index}`} />
                                <Label htmlFor={`male-${index}`}>Male</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Female" id={`female-${index}`} />
                                <Label htmlFor={`female-${index}`}>Female</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button onClick={goToNextStep} className="gap-2">
                    <span>Continue to Contact Info</span>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Journey Summary</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1.5">Train</div>
                        <div className="font-medium">{train.name}</div>
                        <div className="text-sm text-muted-foreground">{train.number}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">From</div>
                          <div className="font-medium">{train.from}</div>
                          <div className="text-sm text-primary">{train.departureTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">To</div>
                          <div className="font-medium">{train.to}</div>
                          <div className="text-sm text-primary">{train.arrivalTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{train.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{train.duration}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Base Fare</div>
                          <div className="font-medium">₹{train.price} × {passengers.length}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Service Fee</div>
                          <div className="font-medium">₹{30 * passengers.length}</div>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <div>Total Amount</div>
                          <div className="text-primary">₹{totalAmount + (30 * passengers.length)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          value={contact.email}
                          onChange={(e) => handleContactChange("email", e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Booking details will be sent to this email</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Mobile Number</label>
                        <Input 
                          type="tel" 
                          placeholder="Enter your 10-digit mobile number" 
                          value={contact.phone}
                          onChange={(e) => handleContactChange("phone", e.target.value)}
                          maxLength={10}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">For ticket confirmation and updates</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPreviousStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>
                  <Button onClick={goToNextStep} className="gap-2">
                    <span>Continue to Payment</span>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Card className="sticky top-24">
                  {/* Same journey summary as in step 1 */}
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Journey Summary</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1.5">Train</div>
                        <div className="font-medium">{train.name}</div>
                        <div className="text-sm text-muted-foreground">{train.number}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">From</div>
                          <div className="font-medium">{train.from}</div>
                          <div className="text-sm text-primary">{train.departureTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">To</div>
                          <div className="font-medium">{train.to}</div>
                          <div className="text-sm text-primary">{train.arrivalTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{train.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{train.duration}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Passengers</div>
                          <div className="font-medium">{passengers.length}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Class</div>
                          <div className="font-medium">{selectedClass}</div>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <div>Total Amount</div>
                          <div className="text-primary">₹{totalAmount + (30 * passengers.length)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                    
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      {[
                        { id: "upi", label: "UPI / GPay / PhonePe" },
                        { id: "card", label: "Credit / Debit Card" },
                        { id: "netbanking", label: "Net Banking" },
                        { id: "wallet", label: "Mobile Wallet" },
                      ].map((method) => (
                        <div key={method.id} className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/30">
                          <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">{method.label}</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {method.id === "upi" && "Pay through UPI apps like Google Pay, PhonePe, or BHIM"}
                              {method.id === "card" && "Pay using credit card or debit card"}
                              {method.id === "netbanking" && "Pay directly from your bank account"}
                              {method.id === "wallet" && "Pay using Paytm, Amazon Pay, or other mobile wallets"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {/* Mock payment form based on the selected method */}
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      {paymentMethod === "upi" && (
                        <div className="space-y-4">
                          <label className="text-sm font-medium mb-1.5 block">UPI ID</label>
                          <Input placeholder="yourname@upi" required />
                          <p className="text-xs text-muted-foreground">Enter your UPI ID linked with your bank account</p>
                        </div>
                      )}
                      
                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Card Number</label>
                            <Input placeholder="1234 5678 9012 3456" maxLength={16} required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Expiry Date</label>
                              <Input placeholder="MM/YY" required />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">CVV</label>
                              <Input type="password" maxLength={3} placeholder="123" required />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Name on Card</label>
                            <Input placeholder="Card holder name" required />
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === "netbanking" && (
                        <div className="space-y-4">
                          <label className="text-sm font-medium mb-1.5 block">Select Bank</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {["SBI", "HDFC", "ICICI", "Axis", "PNB", "Kotak"].map((bank) => (
                              <div key={bank} className="border rounded-md p-3 text-center cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                                {bank} Bank
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === "wallet" && (
                        <div className="space-y-4">
                          <label className="text-sm font-medium mb-1.5 block">Select Wallet</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {["Paytm", "Amazon Pay", "OlaMoney", "MobiKwik", "FreeCharge", "JioMoney"].map((wallet) => (
                              <div key={wallet} className="border rounded-md p-3 text-center cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                                {wallet}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPreviousStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>
                  <Button onClick={processPayment} disabled={loading} className="gap-2 min-w-[150px]">
                    {loading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{totalAmount + (30 * passengers.length)}</span>
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Card className="sticky top-24">
                  {/* Same journey summary as before */}
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Payment Summary</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1.5">Train</div>
                        <div className="font-medium">{train.name}</div>
                        <div className="text-sm text-muted-foreground">{train.number}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">From</div>
                          <div className="font-medium">{train.from}</div>
                          <div className="text-sm text-primary">{train.departureTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1.5">To</div>
                          <div className="font-medium">{train.to}</div>
                          <div className="text-sm text-primary">{train.arrivalTime}</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Base Fare ({passengers.length} × ₹{train.price})</div>
                          <div className="font-medium">₹{totalAmount}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">Service Fee</div>
                          <div className="font-medium">₹{30 * passengers.length}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div className="text-sm">GST</div>
                          <div className="font-medium">Included</div>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <div>Total Amount</div>
                          <div className="text-primary">₹{totalAmount + (30 * passengers.length)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <div className="text-sm text-center text-foreground">
                          By proceeding with the payment, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Booking Confirmation */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto">
              <Card className="overflow-hidden">
                <div className="bg-primary/10 p-8 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground">Your tickets have been booked successfully</p>
                </div>
                
                <CardContent className="p-6">
                  <div className="border border-dashed rounded-lg p-4 mb-6">
                    <div className="text-center mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
                      <div className="text-xl font-bold">RWHB{Math.floor(Math.random() * 1000000)}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Train</div>
                        <div className="font-medium">{train.name}</div>
                        <div className="text-sm">{train.number}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Date</div>
                        <div className="font-medium">{train.date}</div>
                        <div className="text-sm">{train.duration} journey</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">From</div>
                        <div className="font-medium">{train.from}</div>
                        <div className="text-sm text-primary">{train.departureTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">To</div>
                        <div className="font-medium">{train.to}</div>
                        <div className="text-sm text-primary">{train.arrivalTime}</div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Passenger(s)</div>
                      <div className="space-y-2">
                        {passengers.map((passenger, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{passenger.name || `Passenger ${index + 1}`}</span>
                            </div>
                            <Badge variant="outline" className="font-normal">
                              {selectedClass}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Important Information</div>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        <li>• Please arrive at the station at least 30 minutes before departure.</li>
                        <li>• Carry a valid ID proof along with your ticket.</li>
                        <li>• Booking details have been sent to your registered email and phone number.</li>
                        <li>• You can cancel this booking up to 4 hours before departure.</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 gap-2" onClick={() => navigate("/")}>
                        <span>Back to Home</span>
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <span>Download Ticket</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
