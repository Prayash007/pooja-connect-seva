
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

// Mock supabase client - will be replaced with actual Supabase
const mockSignInWithGoogle = async () => {
  // Simulate authentication success
  localStorage.setItem("isAuthenticated", "true");
  return { error: null };
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the selected role from location state or default to user
  const selectedRole = location.state?.selectedRole || "user";

  useEffect(() => {
    localStorage.setItem("userRole", selectedRole);
  }, [selectedRole]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await mockSignInWithGoogle();
      
      if (error) throw error;
      
      toast({
        title: "Successfully signed in!",
        description: "Welcome to PoojaConnect",
      });

      // Check if the user is a new pandit who needs to register
      if (selectedRole === "pandit") {
        navigate("/pandit-registration");
      } else {
        navigate("/user-home");
      }
      
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error.message || "There was an error signing in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800">Sign In</CardTitle>
          <CardDescription>
            Signing in as {selectedRole === "pandit" ? "a Pandit" : "a User"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            disabled={isLoading}
            className="h-12 flex items-center justify-center gap-2 border-gray-300"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
      
      <Button
        variant="link"
        onClick={() => navigate("/")}
        className="mt-4 text-orange-800"
      >
        Go back to role selection
      </Button>
    </div>
  );
};

export default Login;
