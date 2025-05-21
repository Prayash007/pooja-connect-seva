
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLayout } from "@/components/layouts/UserLayout";
import PanditCard from "@/components/PanditCard";
import { standardPoojas } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pandit {
  id: string;
  full_name: string;
  city: string;
  state: string;
  languages: string[] | null;
  specializations: string[] | null;
  experience_years: number | null;
  bio: string | null;
  rating: number | null;
  review_count: number | null;
  avatar_url: string | null;
  is_available: boolean | null;
  phone: string;
  email: string;
  address: string;
}

const UserHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPooja, setSelectedPooja] = useState("");
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPandits();
  }, []);
  
  const fetchPandits = async () => {
    try {
      setLoading(true);
      
      // Fetch pandit profiles
      const { data, error } = await supabase
        .from("pandit_profiles")
        .select("*")
        .eq("is_available", true);
        
      if (error) throw error;
      
      setPandits(data || []);
    } catch (error: any) {
      console.error("Error fetching pandits:", error);
      toast({
        title: "Error",
        description: error.message || "Could not load pandits",
        variant: "destructive",
      });
      setPandits([]);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredPandits = pandits.filter(pandit => {
    const matchesSearch = pandit.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (pandit.bio && pandit.bio.toLowerCase().includes(searchTerm.toLowerCase())) || 
                        (pandit.specializations && pandit.specializations.some(spec => 
                          spec.toLowerCase().includes(searchTerm.toLowerCase())));
                          
    const matchesLocation = !location || 
                           pandit.city.toLowerCase().includes(location.toLowerCase()) || 
                           pandit.state.toLowerCase().includes(location.toLowerCase());
                           
    // For now, we won't filter by pooja since we'd need to join with the services table
    // In a real implementation, you would want to join with the services table
    
    return matchesSearch && matchesLocation;
  });

  return (
    <UserLayout>
      <div className="container py-6 px-4 md:px-6">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-orange-800 dark:text-orange-400">Find Your Pandit</h1>
          <p className="text-orange-700 dark:text-orange-300 mt-2">Connect with experienced pandits for your ritual needs</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search pandits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Enter city or state..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <select 
                  value={selectedPooja}
                  onChange={(e) => setSelectedPooja(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-9 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-gray-800 dark:border-gray-700"
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
            <TabsTrigger value="featured">Top Rated</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg">Loading pandits...</p>
              </div>
            ) : filteredPandits.length > 0 ? (
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
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg">Loading pandits...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPandits
                  .filter(pandit => (pandit.rating || 0) >= 4.5)
                  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                  .map(pandit => (
                    <PanditCard 
                      key={pandit.id}
                      pandit={pandit}
                      onClick={() => navigate(`/pandit/${pandit.id}`)}
                    />
                  ))
                }
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="nearby">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">Enable location services</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Allow location access to see pandits near you</p>
              <Button className="mt-4 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600">
                Enable Location
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Poojas Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-400 mb-4">Popular Rituals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {standardPoojas.slice(0, 8).map(pooja => (
              <Card 
                key={pooja.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-orange-200 dark:border-orange-800"
                onClick={() => setSelectedPooja(pooja.id)}
              >
                <div className="h-32 bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <span className="text-5xl">{pooja.emoji}</span>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{pooja.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 dark:text-gray-400">
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
