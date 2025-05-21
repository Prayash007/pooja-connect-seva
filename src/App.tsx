
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import PanditRegistration from "./pages/PanditRegistration";
import UserHome from "./pages/UserHome";
import UserDashboard from "./pages/UserDashboard";
import PanditDashboard from "./pages/PanditDashboard";
import PanditProfile from "./pages/PanditProfile";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/pandit-registration" element={<PanditRegistration />} />
            
            {/* Protected Routes */}
            <Route path="/user-home" element={
              <ProtectedRoute requiredRole="user">
                <UserHome />
              </ProtectedRoute>
            } />
            <Route path="/user-dashboard" element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user-profile" element={
              <ProtectedRoute requiredRole="user">
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/pandit-dashboard" element={
              <ProtectedRoute requiredRole="pandit">
                <PanditDashboard />
              </ProtectedRoute>
            } />
            <Route path="/pandit/:id" element={<PanditProfile />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
