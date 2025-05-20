
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import BookingForm from "@/components/BookingForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserLayout } from "@/components/layouts/UserLayout";
import { getPanditById, getPanditPoojaDetails } from "@/lib/mock-data";
import { Calendar, MapPin, Languages, Phone, Mail, Clock, Star } from "lucide-react";

const PanditProfile = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  
  // Get pandit data - would be fetched from Supabase in production
  const pandit = getPanditById(id);
  const poojaDetails = getPanditPoojaDetails(id);
  
  if (!pandit) {
    return (
      <UserLayout>
        <div className="container py-12 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Pandit not found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">The pandit profile you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => window.history.back()} 
            className="mt-6 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
          >
            Go Back
          </Button>
        </div>
      </UserLayout>
    );
  }

  const BookingDialog = () => {
    if (isMobile) {
      return (
        <Drawer open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DrawerTrigger asChild>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600">
              Book Now
            </Button>
          </DrawerTrigger>
          <DrawerContent className="dark:bg-gray-900">
            <DrawerHeader className="text-left">
              <DrawerTitle className="dark:text-gray-200">Book {pandit.fullName}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <BookingForm pandit={pandit} onComplete={() => setShowBookingDialog(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogTrigger asChild>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600">
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-200">Book {pandit.fullName}</DialogTitle>
          </DialogHeader>
          <BookingForm pandit={pandit} onComplete={() => setShowBookingDialog(false)} />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <UserLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card className="border-orange-200 dark:border-orange-900 overflow-hidden sticky top-24">
              <div className="aspect-video bg-orange-100 dark:bg-orange-900 flex items-center justify-center overflow-hidden">
                {pandit.profilePictureUrl ? (
                  <img 
                    src={pandit.profilePictureUrl} 
                    alt={pandit.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-orange-200 dark:bg-orange-800 flex items-center justify-center text-orange-800 dark:text-orange-200 text-4xl">
                    {pandit.fullName.charAt(0)}
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-1">{pandit.fullName}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < pandit.rating ? 'fill-yellow-500' : ''}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{pandit.reviewCount} reviews</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 mr-2 shrink-0" />
                    <span className="dark:text-gray-300">{pandit.city}, {pandit.state}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Languages className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 mr-2 shrink-0" />
                    <span className="dark:text-gray-300">{pandit.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 mr-2 shrink-0" />
                    <span className="dark:text-gray-300">{pandit.experienceYears} years of experience</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 mr-2 shrink-0" />
                    <span className="dark:text-gray-300">{pandit.contactPhone}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 mr-2 shrink-0" />
                    <span className="break-all dark:text-gray-300">{pandit.contactEmail}</span>
                  </div>
                </div>
                
                <BookingDialog />
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Typically responds within 2 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="mb-8">
              <TabsList className="mb-4 bg-white/80 dark:bg-gray-800">
                <TabsTrigger value="about" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 dark:data-[state=active]:bg-orange-900/50 dark:data-[state=active]:text-orange-300">About</TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 dark:data-[state=active]:bg-orange-900/50 dark:data-[state=active]:text-orange-300">Services</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 dark:data-[state=active]:bg-orange-900/50 dark:data-[state=active]:text-orange-300">Reviews</TabsTrigger>
                <TabsTrigger value="availability" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 dark:data-[state=active]:bg-orange-900/50 dark:data-[state=active]:text-orange-300">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card className="border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-400 mb-4">About {pandit.fullName}</h2>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                      <p>{pandit.bio}</p>
                      <h3 className="text-lg font-medium text-orange-800 dark:text-orange-400 mt-6 mb-2">Specializations</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {pandit.specializations.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services">
                <Card className="border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-400 mb-4">Services Offered</h2>
                    <div className="grid gap-4">
                      {poojaDetails.map((pooja) => (
                        <div key={pooja.id} className="border-b border-orange-100 dark:border-orange-800/50 pb-4 last:border-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="font-medium text-lg dark:text-gray-200">{pooja.name}</h3>
                              <p className="text-gray-600 dark:text-gray-400 mt-1">{pooja.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Duration: {pooja.duration} minutes</span>
                              </div>
                            </div>
                            <div className="mt-3 md:mt-0 md:ml-4 flex flex-col items-end">
                              <span className="text-lg font-semibold text-orange-800 dark:text-orange-400">
                                ₹{pooja.price}
                              </span>
                              <Button 
                                className="mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                                onClick={() => setShowBookingDialog(true)}
                              >
                                Book
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card className="border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-400">Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-500 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < pandit.rating ? 'fill-yellow-500' : ''}`} 
                            />
                          ))}
                        </div>
                        <span className="font-semibold dark:text-gray-200">{pandit.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">({pandit.reviewCount})</span>
                      </div>
                    </div>
                    
                    {pandit.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {pandit.reviews.map((review, index) => (
                          <div key={index} className="border-b border-orange-100 dark:border-orange-800/50 pb-4 last:border-0">
                            <div className="flex items-center mb-2">
                              <div className="flex items-center text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500' : ''}`} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 font-medium dark:text-gray-200">{review.userName}</span>
                              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability">
                <Card className="border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-400 mb-4">Availability</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(pandit.availability).map(([day, slots]) => (
                        <div key={day} className="border rounded p-3 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800">
                          <h3 className="font-medium mb-1 capitalize dark:text-gray-200">{day}</h3>
                          <div className="flex flex-wrap gap-2">
                            {slots.length > 0 ? (
                              slots.map((slot, index) => (
                                <span 
                                  key={index} 
                                  className="inline-block bg-white dark:bg-gray-800 px-2 py-1 text-sm rounded border border-orange-200 dark:border-orange-800 dark:text-gray-300"
                                >
                                  {slot}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">Not available</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        onClick={() => setShowBookingDialog(true)} 
                        className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book an Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default PanditProfile;
