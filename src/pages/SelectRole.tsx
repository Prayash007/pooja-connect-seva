
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SelectRole = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const selectRole = async (role: "user" | "pandit") => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to select a role",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);

      // Update auth user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role }
      });

      if (metadataError) throw metadataError;

      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", user.id);

      if (profileError) throw profileError;

      toast({
        title: "Role selected",
        description: `You have selected the ${role} role`,
      });

      // Redirect based on role
      if (role === "pandit") {
        navigate("/pandit-dashboard");
      } else {
        navigate("/user-home");
      }
    } catch (error: any) {
      console.error("Error selecting role:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error setting your role",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-800 dark:text-orange-400 mb-2">PoojaConnect</h1>
        <p className="text-lg text-orange-700 dark:text-orange-300">
          Choose your role to continue
        </p>
      </div>

      <Card className="w-full max-w-md border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800 dark:text-orange-400">Select Your Role</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Please choose how you want to use PoojaConnect
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            onClick={() => selectRole("user")}
            className="bg-orange-600 hover:bg-orange-700 text-white h-16 text-lg dark:bg-orange-700 dark:hover:bg-orange-600"
            disabled={isLoading}
          >
            I am looking for Pandit services
          </Button>
          <Button 
            onClick={() => selectRole("pandit")}
            variant="outline" 
            className="border-orange-600 text-orange-800 hover:bg-orange-100 h-16 text-lg dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950"
            disabled={isLoading}
          >
            I am a Pandit offering services
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectRole;
