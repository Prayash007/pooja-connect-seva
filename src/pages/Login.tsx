
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Get the selected role from location state or default to user
  const selectedRole = location.state?.selectedRole || "user";

  useEffect(() => {
    localStorage.setItem("userRole", selectedRole);
    
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Check if the user is a new pandit who needs to register
        if (selectedRole === "pandit") {
          navigate("/pandit-dashboard");
        } else {
          navigate("/user-home");
        }
      }
    };
    
    checkUser();
  }, [selectedRole, navigate]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Successfully signed in!",
        description: "Welcome to PoojaConnect",
      });

      // Check if the user is a pandit or user based on role
      if (selectedRole === "pandit") {
        navigate("/pandit-dashboard");
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

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: "",
            role: selectedRole,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email for confirmation",
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
      
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error.message || "There was an error signing in",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800 dark:text-orange-400">Sign In</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Signing in as {selectedRole === "pandit" ? "a Pandit" : "a User"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleEmailSignIn} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
                </div>
              </div>
              
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                disabled={isLoading}
                className="w-full h-10 flex items-center justify-center gap-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <FcGoogle className="h-5 w-5" />
                <span>Continue with Google</span>
              </Button>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleEmailSignUp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="signup-email" className="dark:text-gray-300">Email</Label>
                  <Input 
                    id="signup-email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="signup-password" className="dark:text-gray-300">Password</Label>
                  <Input 
                    id="signup-password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Password must be at least 6 characters</p>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
      
      <Button
        variant="link"
        onClick={() => navigate("/")}
        className="mt-4 text-orange-800 dark:text-orange-400"
      >
        Go back to role selection
      </Button>
    </div>
  );
};

export default Login;
