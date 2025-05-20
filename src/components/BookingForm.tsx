
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getPanditPoojaDetails } from "@/lib/mock-data";
import { mockRazorpayCheckout } from "@/lib/payment";

interface BookingFormProps {
  pandit: any;
  onComplete: () => void;
}

const bookingSchema = z.object({
  poojaId: z.string({
    required_error: "Please select a ritual type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters",
  }),
  notes: z.string().optional(),
});

const BookingForm = ({ pandit, onComplete }: BookingFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const poojaOptions = getPanditPoojaDetails(pandit.id);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      address: "",
      notes: "",
    },
  });
  
  const selectedPoojaId = form.watch("poojaId");
  const selectedPooja = poojaOptions.find(p => p.id === selectedPoojaId);
  
  // Get available time slots based on pandit's availability and selected date
  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return [];
    
    const dayName = format(date, 'EEEE').toLowerCase();
    return pandit.availability[dayName] || [];
  };
  
  const availableTimeSlots = getAvailableTimeSlots(form.watch("date"));

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    try {
      setIsProcessing(true);
      
      // First step - just go to review
      if (step === 1) {
        setStep(2);
        return;
      }
      
      // Mock booking submission - would be replaced with Supabase in production
      console.log("Booking values:", values);
      
      // Process payment through Razorpay
      if (selectedPooja) {
        const paymentSuccess = await mockRazorpayCheckout({
          amount: selectedPooja.price,
          currency: "INR",
          name: pandit.fullName,
          description: `Booking for ${selectedPooja.name}`,
        });
        
        if (!paymentSuccess) {
          throw new Error("Payment failed");
        }
      }
      
      // If payment successful, create booking
      toast({
        title: "Booking confirmed!",
        description: `Your booking with ${pandit.fullName} has been confirmed.`,
      });
      
      // Close the dialog/drawer and navigate to bookings page
      onComplete();
      navigate("/user-dashboard");
      
    } catch (error) {
      toast({
        title: "Booking failed",
        description: error.message || "There was an error processing your booking",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 2) {
    // Booking Review Step
    return (
      <div className="space-y-4 p-2">
        <div className="space-y-2">
          <h3 className="font-medium">Review Your Booking</h3>
          
          <div className="border rounded-md p-4 bg-orange-50 space-y-3">
            <div>
              <div className="text-sm text-gray-500">Ritual</div>
              <div className="font-medium">{selectedPooja?.name}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Date & Time</div>
              <div className="font-medium">
                {form.watch("date") && format(form.watch("date"), "EEEE, MMMM d, yyyy")} at {form.watch("time")}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Address</div>
              <div className="font-medium">{form.watch("address")}</div>
            </div>
            
            {form.watch("notes") && (
              <div>
                <div className="text-sm text-gray-500">Notes</div>
                <div>{form.watch("notes")}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Amount</span>
            <span className="text-xl font-semibold">₹{selectedPooja?.price}</span>
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700" 
              onClick={form.handleSubmit(onSubmit)}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm & Pay"}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-orange-600 text-orange-800"
              onClick={() => setStep(1)}
              disabled={isProcessing}
            >
              Back to Edit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
        <FormField
          control={form.control}
          name="poojaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ritual Type</FormLabel>
              <FormControl>
                <select
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="" disabled>Select a ritual</option>
                  {poojaOptions.map((pooja) => (
                    <option key={pooja.id} value={pooja.id}>
                      {pooja.name} - ₹{pooja.price}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        // Disable past dates
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || 
                               // Disable days pandit is not available
                               getAvailableTimeSlots(date).length === 0;
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a date when the pandit is available
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <select
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    disabled={!form.watch("date") || availableTimeSlots.length === 0}
                  >
                    <option value="" disabled>Select a time</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>
                  {!form.watch("date") ? "First select a date" : 
                   availableTimeSlots.length === 0 ? "No times available on this date" : 
                   "Select from available time slots"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter the full address where the ritual will be performed" 
                  className="resize-none min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes <span className="text-gray-500">(Optional)</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any special instructions or requirements" 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          Continue to Review
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
