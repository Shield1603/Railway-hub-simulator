
import { useEffect, useState } from "react";
import { User, Train, CreditCard, Clock, Calendar, LogOut, Settings, Bell, HelpCircle, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock data for upcoming & past journeys
const journeys = [
  {
    id: "1",
    name: "Rajdhani Express",
    number: "12301",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "16:35",
    arrivalTime: "08:15",
    duration: "15h 40m",
    date: "15 Jul 2023",
    status: "Upcoming",
    pnr: "4235678901",
    class: "AC 2 Tier",
    price: 1255,
  },
  {
    id: "2",
    name: "Shatabdi Express",
    number: "12002",
    from: "Bangalore",
    to: "Chennai",
    departureTime: "06:15",
    arrivalTime: "12:45",
    duration: "6h 30m",
    date: "28 Aug 2023",
    status: "Upcoming",
    pnr: "5635678902",
    class: "Chair Car",
    price: 850,
  },
  {
    id: "3",
    name: "Duronto Express",
    number: "12213",
    from: "Mumbai",
    to: "Delhi",
    departureTime: "23:25",
    arrivalTime: "15:55",
    duration: "16h 30m",
    date: "10 Jun 2023",
    status: "Completed",
    pnr: "2135678903",
    class: "AC 3 Tier",
    price: 1190,
  },
  {
    id: "4",
    name: "Vande Bharat Express",
    number: "22435",
    from: "Delhi",
    to: "Varanasi",
    departureTime: "06:00",
    arrivalTime: "14:00",
    duration: "8h 00m",
    date: "25 May 2023",
    status: "Completed",
    pnr: "9835678904",
    class: "Executive Chair Car",
    price: 1800,
  },
  {
    id: "5",
    name: "Garib Rath Express",
    number: "12909",
    from: "Mumbai",
    to: "Jaipur",
    departureTime: "15:35",
    arrivalTime: "09:30",
    duration: "17h 55m",
    date: "12 Apr 2023",
    status: "Completed",
    pnr: "7635678905",
    class: "AC 3 Tier",
    price: 950,
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter journeys by status
  const upcomingJourneys = journeys.filter(journey => journey.status === "Upcoming");
  const pastJourneys = journeys.filter(journey => journey.status === "Completed");

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  // Mock user data
  const user = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Railway Colony, New Delhi",
    totalBookings: 15,
    totalSpent: 24580,
    memberSince: "Jan 2022",
    preferredClass: "AC 2 Tier",
    mostTraveledRoute: "Delhi - Mumbai",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* User Card */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/44.jpg" alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                        <Badge className="mb-2">Premium Member</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Navigation */}
                  <Card>
                    <CardContent className="p-4">
                      <nav className="space-y-1">
                        {[
                          { icon: User, name: "Overview", id: "overview" },
                          { icon: Train, name: "My Bookings", id: "bookings" },
                          { icon: CreditCard, name: "Payment Methods", id: "payments" },
                          { icon: Bell, name: "Notifications", id: "notifications" },
                          { icon: Settings, name: "Account Settings", id: "settings" },
                          { icon: HelpCircle, name: "Help & Support", id: "help" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            className={cn(
                              "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
                              activeTab === item.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                            onClick={() => setActiveTab(item.id)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </button>
                        ))}

                        <Separator className="my-2" />

                        <button
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log Out</span>
                        </button>
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Overview Tab Content */}
                {activeTab === "overview" && (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Total Bookings", value: user.totalBookings, icon: Train },
                        { label: "Amount Spent", value: `₹${user.totalSpent}`, icon: CreditCard },
                        { label: "Member Since", value: user.memberSince, icon: Calendar },
                        { label: "Preferred Class", value: user.preferredClass, icon: User },
                      ].map((stat, index) => (
                        <Card key={index}>
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <stat.icon className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Personal Information */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Full Name</div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Email Address</div>
                            <div className="font-medium">{user.email}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Phone Number</div>
                            <div className="font-medium">{user.phone}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Address</div>
                            <div className="font-medium flex items-start gap-1.5">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                              <span>{user.address}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button variant="outline" size="sm">Edit Profile</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Recent Journeys */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold">Recent Journeys</h3>
                          <Button 
                            variant="ghost" 
                            className="text-primary hover:text-primary hover:bg-primary/5"
                            onClick={() => setActiveTab("bookings")}
                          >
                            View All
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {journeys.slice(0, 3).map((journey) => (
                            <div key={journey.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">{journey.name}</div>
                                  <div className="text-sm text-muted-foreground">{journey.number}</div>
                                </div>
                                <Badge variant={journey.status === "Upcoming" ? "default" : "secondary"}>
                                  {journey.status}
                                </Badge>
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                <div className="flex justify-between">
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">From</div>
                                    <div className="font-medium">{journey.from}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-muted-foreground mb-1">To</div>
                                    <div className="font-medium">{journey.to}</div>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Date</div>
                                    <div className="font-medium">{journey.date}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-muted-foreground mb-1">PNR</div>
                                    <div className="font-medium">{journey.pnr}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {/* Bookings Tab Content */}
                {activeTab === "bookings" && (
                  <Card>
                    <CardContent className="p-6">
                      <Tabs defaultValue="upcoming">
                        <TabsList className="mb-6">
                          <TabsTrigger value="upcoming" className="flex gap-2">
                            <Train className="h-4 w-4" />
                            <span>Upcoming</span>
                            {upcomingJourneys.length > 0 && (
                              <Badge variant="outline" className="ml-1.5">{upcomingJourneys.length}</Badge>
                            )}
                          </TabsTrigger>
                          <TabsTrigger value="past" className="flex gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Past</span>
                            {pastJourneys.length > 0 && (
                              <Badge variant="outline" className="ml-1.5">{pastJourneys.length}</Badge>
                            )}
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upcoming" className="space-y-4">
                          {upcomingJourneys.length > 0 ? (
                            upcomingJourneys.map((journey) => (
                              <div key={journey.id} className="border rounded-lg p-5 hover:shadow-sm transition-shadow">
                                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="outline" className="px-2 py-0 h-5 bg-primary/5 text-primary border-primary/20 font-medium">
                                        {journey.number}
                                      </Badge>
                                      <h3 className="font-semibold">{journey.name}</h3>
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{journey.date}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{journey.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">View Ticket</Button>
                                    <Button variant="destructive" size="sm">Cancel</Button>
                                  </div>
                                </div>
                                
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">From</div>
                                    <div className="font-medium">{journey.from}</div>
                                    <div className="text-sm text-primary">{journey.departureTime}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">To</div>
                                    <div className="font-medium">{journey.to}</div>
                                    <div className="text-sm text-primary">{journey.arrivalTime}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">PNR Number</div>
                                    <div className="font-medium">{journey.pnr}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Class</div>
                                    <div className="font-medium">{journey.class}</div>
                                    <div className="text-sm text-primary">₹{journey.price}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                                <Train className="h-6 w-6 text-primary" />
                              </div>
                              <h3 className="text-lg font-semibold mb-2">No Upcoming Journeys</h3>
                              <p className="text-muted-foreground mb-4">You don't have any upcoming train journeys.</p>
                              <Button>Book a Train</Button>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="past" className="space-y-4">
                          {pastJourneys.map((journey) => (
                            <div key={journey.id} className="border rounded-lg p-5 hover:shadow-sm transition-shadow">
                              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="px-2 py-0 h-5 bg-muted text-muted-foreground border-muted-foreground/20 font-medium">
                                      {journey.number}
                                    </Badge>
                                    <h3 className="font-semibold">{journey.name}</h3>
                                  </div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      <span>{journey.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>{journey.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                              </div>
                              
                              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">From</div>
                                  <div className="font-medium">{journey.from}</div>
                                  <div className="text-sm text-muted-foreground">{journey.departureTime}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">To</div>
                                  <div className="font-medium">{journey.to}</div>
                                  <div className="text-sm text-muted-foreground">{journey.arrivalTime}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">PNR Number</div>
                                  <div className="font-medium">{journey.pnr}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground mb-1">Class</div>
                                  <div className="font-medium">{journey.class}</div>
                                  <div className="text-sm text-muted-foreground">₹{journey.price}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
                
                {/* Placeholder content for other tabs */}
                {activeTab === "payments" && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">HDFC Bank Credit Card</div>
                              <div className="text-sm text-muted-foreground">Ending with 4567</div>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">SBI Bank Debit Card</div>
                              <div className="text-sm text-muted-foreground">Ending with 8901</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Make Default</Button>
                        </div>
                        
                        <Button className="w-full">Add New Payment Method</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {(activeTab === "notifications" || activeTab === "settings" || activeTab === "help") && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md">
                        We're working on this feature and it will be available soon.
                        Check back later for updates.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
