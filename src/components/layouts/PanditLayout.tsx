
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

interface PanditLayoutProps {
  children: React.ReactNode;
}

export const PanditLayout = ({ children }: PanditLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile menu button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="grid gap-6 text-lg font-medium">
                  <div
                    className="flex items-center gap-2 font-semibold cursor-pointer"
                    onClick={() => {
                      setSidebarOpen(false);
                      navigate("/pandit-dashboard");
                    }}
                  >
                    <span className="text-orange-600 dark:text-orange-500">🕉️</span>
                    PoojaConnect
                  </div>
                  <Button
                    variant="ghost"
                    className="flex justify-start px-2"
                    onClick={() => {
                      setSidebarOpen(false);
                      navigate("/pandit-dashboard");
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex justify-start px-2"
                    onClick={() => {
                      setSidebarOpen(false);
                      navigate("/pandit-profile");
                    }}
                  >
                    My Profile
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Logo - always visible */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/pandit-dashboard")}
            >
              <span className="text-orange-600 dark:text-orange-500 text-2xl">🕉️</span>
              <span className="font-semibold hidden md:block">PoojaConnect</span>
            </div>
          </div>
          
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/pandit-dashboard")}
            >
              Dashboard
            </Button>
          </nav>
          
          {/* Right side items */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Pandit avatar" />
                    <AvatarFallback className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/pandit-profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pandit-dashboard")}>Dashboard</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1">{children}</main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 PoojaConnect. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="link" className="text-sm text-gray-500 dark:text-gray-400 h-auto p-0">
              Terms of Service
            </Button>
            <Button variant="link" className="text-sm text-gray-500 dark:text-gray-400 h-auto p-0">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-sm text-gray-500 dark:text-gray-400 h-auto p-0">
              Contact Us
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};
