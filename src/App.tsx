
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PanditRegistration from "./pages/PanditRegistration";
import UserHome from "./pages/UserHome";
import UserDashboard from "./pages/UserDashboard";
import PanditDashboard from "./pages/PanditDashboard";
import PanditProfile from "./pages/PanditProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pandit-registration" element={<PanditRegistration />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/pandit-dashboard" element={<PanditDashboard />} />
          <Route path="/pandit/:id" element={<PanditProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
