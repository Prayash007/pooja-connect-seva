
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();

  // If already logged in, redirect based on role
  const handleGetStarted = () => {
    if (user) {
      if (!userRole) {
        navigate("/select-role");
      } else if (userRole === "user") {
        navigate("/user-home");
      } else if (userRole === "pandit") {
        navigate("/pandit-dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-800 dark:text-orange-400 mb-2">PoojaConnect</h1>
        <p className="text-lg text-orange-700 dark:text-orange-300">
          Connect with pandits for authentic Hindu rituals
        </p>
      </div>

      <Card className="w-full max-w-md border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800 dark:text-orange-400">Welcome to PoojaConnect</CardTitle>
          <CardDescription className="dark:text-gray-400">
            The easiest way to find and book pandit services
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            onClick={handleGetStarted}
            className="bg-orange-600 hover:bg-orange-700 text-white h-16 text-lg dark:bg-orange-700 dark:hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Loading..." : user ? "Continue to Dashboard" : "Get Started"}
          </Button>
          
          {!user && !loading && (
            <Button 
              onClick={() => navigate("/login")}
              variant="outline" 
              className="border-orange-600 text-orange-800 hover:bg-orange-100 h-12 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950"
            >
              Sign In / Sign Up
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
