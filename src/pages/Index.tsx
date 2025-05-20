
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the user is already authenticated and has a role
  useEffect(() => {
    // This will be replaced with actual Supabase auth check later
    const checkAuth = async () => {
      // Mock authentication check - will be replaced with Supabase
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const userRole = localStorage.getItem("userRole");
      
      if (isAuthenticated && userRole === "pandit") {
        navigate("/pandit-dashboard");
      } else if (isAuthenticated && userRole === "user") {
        navigate("/user-home");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const selectRole = (role: "pandit" | "user") => {
    // For now, just navigate to login
    navigate("/login", { state: { selectedRole: role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-800 mb-2">PoojaConnect</h1>
        <p className="text-lg text-orange-700">
          Connect with pandits for authentic Hindu rituals
        </p>
      </div>

      <Card className="w-full max-w-md border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800">Welcome</CardTitle>
          <CardDescription>
            Please select your role to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            onClick={() => selectRole("user")}
            className="bg-orange-600 hover:bg-orange-700 text-white h-16 text-lg"
          >
            I am looking for Pandit services
          </Button>
          <Button 
            onClick={() => selectRole("pandit")}
            variant="outline" 
            className="border-orange-600 text-orange-800 hover:bg-orange-100 h-16 text-lg"
          >
            I am a Pandit offering services
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-orange-800 text-sm">
        <p>Already have an account? <Link to="/login" className="underline">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Index;
