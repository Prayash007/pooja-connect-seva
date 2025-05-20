
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { standardPoojas } from "@/lib/constants";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required",
  }),
  state: z.string().min(2, {
    message: "State is required",
  }),
  languages: z.array(z.string()).min(1, {
    message: "Select at least one language",
  }),
  ritualsOffered: z.array(z.string()).min(1, {
    message: "Select at least one ritual",
  }),
  experienceYears: z.string().min(1, {
    message: "Years of experience is required",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  bio: z.string().min(10, {
    message: "Bio should be at least 10 characters",
  }),
  charges: z.string().optional(),
});

const PanditRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  
  const languages = [
    { id: "hindi", label: "Hindi" },
    { id: "english", label: "English" },
    { id: "sanskrit", label: "Sanskrit" },
    { id: "tamil", label: "Tamil" },
    { id: "telugu", label: "Telugu" },
    { id: "kannada", label: "Kannada" },
    { id: "malayalam", label: "Malayalam" },
    { id: "marathi", label: "Marathi" },
    { id: "gujarati", label: "Gujarati" },
    { id: "bengali", label: "Bengali" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      city: "",
      state: "",
      languages: [],
      ritualsOffered: [],
      experienceYears: "",
      contactEmail: "",
      contactPhone: "",
      bio: "",
      charges: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Mock submission to Supabase
      console.log("Submitting values:", values);
      console.log("Profile picture:", profilePicture);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful!",
        description: "Your pandit profile has been created.",
      });
      
      navigate("/pandit-dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error creating your profile",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-orange-200 shadow-lg bg-white/95">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800">Complete Your Pandit Profile</CardTitle>
            <CardDescription>
              Please provide your details to create your pandit profile on PoojaConnect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Picture</label>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-500">Add a clear photo of yourself</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="languages"
                  render={() => (
                    <FormItem>
                      <FormLabel>Languages Spoken</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {languages.map((language) => (
                          <FormField
                            key={language.id}
                            control={form.control}
                            name="languages"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={language.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(language.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, language.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== language.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {language.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ritualsOffered"
                  render={() => (
                    <FormItem>
                      <FormLabel>Rituals Offered</FormLabel>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {standardPoojas.map((pooja) => (
                          <FormField
                            key={pooja.id}
                            control={form.control}
                            name="ritualsOffered"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={pooja.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(pooja.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, pooja.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== pooja.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {pooja.name}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="charges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Charges (₹) <span className="text-gray-500">(Optional)</span></FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 1000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Starting price for your services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio / About</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself, your experience, and your specialties" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="border-orange-600 text-orange-800"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Complete Registration
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PanditRegistration;
