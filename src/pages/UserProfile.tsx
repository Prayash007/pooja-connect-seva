
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UserProfileData {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  age: number | null;
  sex: string | null;
  marital_status: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfileData>({
    full_name: "",
    email: "",
    phone: "",
    avatar_url: null,
    age: null,
    sex: null,
    marital_status: null,
    address: null,
    city: null,
    state: null
  });

  const [editedProfile, setEditedProfile] = useState<UserProfileData>({
    full_name: "",
    email: "",
    phone: "",
    avatar_url: null,
    age: null,
    sex: null,
    marital_status: null,
    address: null,
    city: null,
    state: null
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;

      setProfile(data || {
        full_name: user?.user_metadata?.full_name || "",
        email: user?.email || "",
        phone: null,
        avatar_url: null,
        age: null,
        sex: null,
        marital_status: null,
        address: null,
        city: null,
        state: null
      });
      setEditedProfile(data || {
        full_name: user?.user_metadata?.full_name || "",
        email: user?.email || "",
        phone: null,
        avatar_url: null,
        age: null,
        sex: null,
        marital_status: null,
        address: null,
        city: null,
        state: null
      });
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      toast({
        title: "Error",
        description: error.message || "Could not load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      const updates = {
        ...editedProfile,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user?.id);

      if (error) throw error;

      setProfile(editedProfile);
      setEditMode(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = e.target.value ? parseInt(e.target.value, 10) : null;
    setEditedProfile(prev => ({ ...prev, age }));
  };

  return (
    <UserLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-orange-800 dark:text-orange-400 mb-6">My Profile</h1>
        
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800 dark:text-orange-400">Personal Information</CardTitle>
            <CardDescription className="dark:text-gray-400">
              View and update your personal details
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-10">Loading profile...</div>
            ) : (
              <>
                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input 
                          id="full_name"
                          name="full_name"
                          value={editedProfile.full_name || ""}
                          onChange={handleInputChange}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          value={editedProfile.email || ""}
                          readOnly
                          disabled
                          className="dark:bg-gray-800 dark:border-gray-700 opacity-70"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age"
                          name="age"
                          type="number"
                          value={editedProfile.age || ""}
                          onChange={handleAgeChange}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sex">Sex</Label>
                        <Select
                          value={editedProfile.sex || ""}
                          onValueChange={(value) => handleSelectChange("sex", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="marital_status">Marital Status</Label>
                        <Select
                          value={editedProfile.marital_status || ""}
                          onValueChange={(value) => handleSelectChange("marital_status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={editedProfile.phone || ""}
                        onChange={handleInputChange}
                        className="dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address"
                        name="address"
                        value={editedProfile.address || ""}
                        onChange={handleInputChange}
                        className="dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city"
                          name="city"
                          value={editedProfile.city || ""}
                          onChange={handleInputChange}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state"
                          name="state"
                          value={editedProfile.state || ""}
                          onChange={handleInputChange}
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
                        <p className="mt-1 text-base">{profile.full_name || "Not provided"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                        <p className="mt-1 text-base">{profile.email || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</h3>
                        <p className="mt-1 text-base">{profile.age || "Not provided"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sex</h3>
                        <p className="mt-1 text-base capitalize">{profile.sex || "Not provided"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Marital Status</h3>
                        <p className="mt-1 text-base capitalize">{profile.marital_status || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                      <p className="mt-1 text-base">{profile.phone || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                      <p className="mt-1 text-base">{profile.address || "Not provided"}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">City</h3>
                        <p className="mt-1 text-base">{profile.city || "Not provided"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">State</h3>
                        <p className="mt-1 text-base">{profile.state || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
          
          {!editMode && !loading && (
            <CardFooter className="flex justify-between border-t border-orange-100 dark:border-orange-900 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-orange-600 text-orange-800 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950"
              >
                Back
              </Button>
              
              <Button
                onClick={handleEditProfile}
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600"
              >
                Edit Profile
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Account Settings Section (Optional) */}
        <Card className="mt-6 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-xl text-orange-800 dark:text-orange-400">Account Management</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-800 rounded-md">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and a new password below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="current-password" className="text-right">
                        Current
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-password" className="text-right">
                        New
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirm-password" className="text-right">
                        Confirm
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
