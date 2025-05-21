
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: "user" | "pandit" | null;
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  // While checking authentication status, show loading or nothing
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is required but user doesn't have one, redirect to select role
  if (requiredRole && !userRole) {
    return <Navigate to="/select-role" replace />;
  }

  // If role doesn't match required role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on their actual role
    if (userRole === "user") {
      return <Navigate to="/user-home" replace />;
    } else if (userRole === "pandit") {
      return <Navigate to="/pandit-dashboard" replace />;
    } else {
      return <Navigate to="/select-role" replace />;
    }
  }

  // If everything checks out, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
