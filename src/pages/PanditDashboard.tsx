
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PanditLayout } from "@/components/layouts/PanditLayout";
import { CalendarRange, Users, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockBookings } from "@/lib/mock-data";

const PanditDashboard = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    // Mock data loading - would be replaced with Supabase query
    const today = new Date();
    
    const upcoming = mockBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return booking.status === "confirmed" && bookingDate >= today;
    });
    
    const pending = mockBookings.filter(booking => 
      booking.status === "pending"
    );
    
    setUpcomingBookings(upcoming);
    setPendingBookings(pending);
  }, []);

  // Quick stats for the dashboard
  const stats = [
    {
      title: "Total Bookings",
      value: mockBookings.length,
      icon: <CalendarRange className="h-8 w-8 text-orange-600" />,
      change: "+12% from last month",
      trend: "up",
    },
    {
      title: "Total Clients",
      value: [...new Set(mockBookings.map(b => b.userId))].length,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      change: "+5% from last month",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "₹24,500",
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      change: "+18% from last month",
      trend: "up",
    },
    {
      title: "Avg. Duration",
      value: "2.5 hrs",
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      change: "Same as last month",
      trend: "neutral",
    },
  ];

  return (
    <PanditLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-800">Pandit Dashboard</h1>
          <p className="text-orange-700">Manage your bookings and profile</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === "up" 
                    ? "text-green-600" 
                    : stat.trend === "down" 
                    ? "text-red-600" 
                    : "text-gray-500"
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>
                  Your confirmed bookings that are scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">{booking.poojaName}</h3>
                            <p className="text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                            <p className="text-gray-600">{booking.address}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-orange-600 text-orange-800 hover:bg-orange-50"
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                              Contact Client
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No upcoming bookings</h3>
                    <p className="text-gray-500 mt-2">When clients book your services, they will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  Booking requests that need your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pendingBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="font-medium">{booking.poojaName}</h3>
                            <p className="text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                            <p className="text-gray-600">{booking.address}</p>
                            {booking.notes && (
                              <p className="text-gray-500 mt-1 text-sm">Note: {booking.notes}</p>
                            )}
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-600 text-red-800 hover:bg-red-50"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Decline
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No pending requests</h3>
                    <p className="text-gray-500 mt-2">When you receive booking requests, they will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>
                  View and manage all your bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-right mb-4">
                  <Link to="/pandit-bookings">
                    <Button variant="link" className="text-orange-800">
                      View Full Calendar
                    </Button>
                  </Link>
                </div>
                {mockBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockBookings.slice(0, 5).map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{booking.poojaName}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                booking.status === "confirmed" 
                                  ? "bg-green-100 text-green-800" 
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-orange-600 text-orange-800 hover:bg-orange-50"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No bookings yet</h3>
                    <p className="text-gray-500 mt-2">When you receive bookings, they will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">Update Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Set your available times to receive more booking requests
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Manage Calendar
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Keep your profile updated to attract more clients
              </p>
              <Button 
                variant="outline" 
                className="w-full border-orange-600 text-orange-800 hover:bg-orange-50"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">Ritual Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Manage your pricing for different rituals and services
              </p>
              <Button 
                variant="outline" 
                className="w-full border-orange-600 text-orange-800 hover:bg-orange-50"
              >
                Update Pricing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PanditLayout>
  );
};

export default PanditDashboard;
