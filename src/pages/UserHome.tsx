
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLayout } from "@/components/layouts/UserLayout";
import PanditCard from "@/components/PanditCard";
import { standardPoojas } from "@/lib/constants";
import { mockPandits } from "@/lib/mock-data";
import { Search, MapPin, Filter } from "lucide-react";

const UserHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPooja, setSelectedPooja] = useState("");
  
  const filteredPandits = mockPandits.filter(pandit => {
    const matchesSearch = pandit.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pandit.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || 
                           pandit.city.toLowerCase().includes(location.toLowerCase()) || 
                           pandit.state.toLowerCase().includes(location.toLowerCase());
    const matchesPooja = !selectedPooja || pandit.ritualsOffered.includes(selectedPooja);
    
    return matchesSearch && matchesLocation && matchesPooja;
  });

  return (
    <UserLayout>
      <div className="container py-6 px-4 md:px-6">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-orange-800">Find Your Pandit</h1>
          <p className="text-orange-700 mt-2">Connect with experienced pandits for your ritual needs</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 border-orange-200">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search pandits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Enter city or state..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <select 
                  value={selectedPooja}
                  onChange={(e) => setSelectedPooja(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-9 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">All rituals</option>
                  {standardPoojas.map(pooja => (
                    <option key={pooja.id} value={pooja.id}>
                      {pooja.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Pandits</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredPandits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPandits.map(pandit => (
                  <PanditCard 
                    key={pandit.id}
                    pandit={pandit}
                    onClick={() => navigate(`/pandit/${pandit.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No pandits found matching your criteria</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPandits
                .filter(pandit => pandit.featured)
                .map(pandit => (
                  <PanditCard 
                    key={pandit.id}
                    pandit={pandit}
                    onClick={() => navigate(`/pandit/${pandit.id}`)}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="nearby">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">Enable location services</h3>
              <p className="text-gray-500 mt-2">Allow location access to see pandits near you</p>
              <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                Enable Location
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Poojas Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Popular Rituals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {standardPoojas.slice(0, 8).map(pooja => (
              <Card 
                key={pooja.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-orange-200"
                onClick={() => setSelectedPooja(pooja.id)}
              >
                <div className="h-32 bg-orange-100 flex items-center justify-center">
                  <span className="text-5xl">{pooja.emoji}</span>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{pooja.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {pooja.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserHome;
