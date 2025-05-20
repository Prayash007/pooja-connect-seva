
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLayout } from "@/components/layouts/UserLayout";
import { mockBookings } from "@/lib/mock-data";
import { Calendar, Mail, Edit, X, CheckCheck } from "lucide-react";

const UserDashboard = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  
  useEffect(() => {
    // Mock data loading - would be replaced with Supabase query
    const today = new Date();
    
    const upcoming = mockBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= today;
    });
    
    const past = mockBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate < today;
    });
    
    setUpcomingBookings(upcoming);
    setPastBookings(past);
  }, []);
  
  return (
    <UserLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-800">My Bookings</h1>
          <p className="text-orange-700">Manage your upcoming and past bookings</p>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past Bookings ({pastBookings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>
                  Your confirmed and upcoming booking requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border rounded-md overflow-hidden"
                      >
                        <div className="bg-orange-50 border-b border-orange-100 px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                            <div>
                              <p className="font-medium">{booking.poojaName}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === "confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Pandit</p>
                            <p className="font-medium">{booking.panditName}</p>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Location</p>
                            <p>{booking.address}</p>
                          </div>
                          
                          {booking.notes && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-1">Notes</p>
                              <p className="text-gray-700">{booking.notes}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-blue-600 text-blue-800 hover:bg-blue-50"
                            >
                              <Mail className="h-4 w-4 mr-1" />
                              Contact Pandit
                            </Button>
                            
                            {booking.status === "pending" ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-red-600 text-red-800 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Cancel Request
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-orange-600 text-orange-800 hover:bg-orange-50"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Reschedule
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No upcoming bookings</h3>
                    <p className="text-gray-500 mt-2">You don't have any upcoming bookings</p>
                    <Link to="/user-home">
                      <Button className="mt-4 bg-orange-600 hover:bg-orange-700">Find a Pandit</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
                <CardDescription>
                  Your booking history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pastBookings.length > 0 ? (
                  <div className="space-y-6">
                    {pastBookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border rounded-md overflow-hidden"
                      >
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                            <div>
                              <p className="font-medium">{booking.poojaName}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === "completed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Pandit</p>
                            <p className="font-medium">{booking.panditName}</p>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Location</p>
                            <p>{booking.address}</p>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {booking.status === "completed" && !booking.hasReview ? (
                              <Button 
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700"
                              >
                                Leave a Review
                              </Button>
                            ) : booking.hasReview ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-green-600 text-green-800 hover:bg-green-50"
                                disabled
                              >
                                <CheckCheck className="h-4 w-4 mr-1" />
                                Reviewed
                              </Button>
                            ) : null}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-orange-600 text-orange-800 hover:bg-orange-50"
                            >
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium">No past bookings</h3>
                    <p className="text-gray-500 mt-2">You haven't had any bookings yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
