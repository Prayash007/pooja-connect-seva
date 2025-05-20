
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Calendar, User, LogOut, Menu, X, Moon, Sun, Settings, Home } from "lucide-react";

export const PanditLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // This would be implemented with a proper theme system
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    // Mock logout - would be replaced with actual Supabase auth
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white border-b border-orange-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/pandit-dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-orange-700">PoojaConnect</span>
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-0.5 rounded ml-2">Pandit</span>
          </Link>
          
          {isMobile ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-orange-800"
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
              
              {/* Mobile Menu */}
              {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-orange-200 shadow-md">
                  <nav className="flex flex-col p-4 space-y-4">
                    <Link 
                      to="/pandit-dashboard" 
                      className="flex items-center gap-2 text-orange-800 hover:text-orange-600 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Home size={20} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/pandit-bookings" 
                      className="flex items-center gap-2 text-orange-800 hover:text-orange-600 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Calendar size={20} />
                      <span>Bookings</span>
                    </Link>
                    <Link 
                      to="/pandit-profile" 
                      className="flex items-center gap-2 text-orange-800 hover:text-orange-600 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </Link>
                    <Link 
                      to="/pandit-settings" 
                      className="flex items-center gap-2 text-orange-800 hover:text-orange-600 py-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Settings size={20} />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-gray-200 pt-2">
                      <Button 
                        variant="ghost" 
                        className="flex w-full justify-start items-center gap-2 text-orange-800 hover:text-orange-600 py-2"
                        onClick={toggleDarkMode}
                      >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex w-full justify-start items-center gap-2 text-red-600 hover:text-red-800 py-2"
                        onClick={handleLogout}
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-6">
                <Link 
                  to="/pandit-dashboard" 
                  className="flex items-center gap-1 text-orange-800 hover:text-orange-600"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/pandit-bookings" 
                  className="flex items-center gap-1 text-orange-800 hover:text-orange-600"
                >
                  <Calendar size={18} />
                  <span>Bookings</span>
                </Link>
                <Link 
                  to="/pandit-profile" 
                  className="flex items-center gap-1 text-orange-800 hover:text-orange-600"
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/pandit-settings" 
                  className="flex items-center gap-1 text-orange-800 hover:text-orange-600"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </nav>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleDarkMode}
                  className="text-orange-800"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-orange-600 text-orange-800"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow bg-orange-50">{children}</main>
      
      {/* Footer - displayed only on larger screens or made compact on mobile */}
      <footer className="bg-orange-800 text-white py-4 px-4">
        <div className="container mx-auto">
          {isMobile ? (
            <div className="text-center">
              <p className="text-sm">© 2025 PoojaConnect. All rights reserved.</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl mb-2">PoojaConnect</h3>
                <p className="text-orange-200">Connecting devotees with authentic pandits</p>
              </div>
              <div className="text-sm">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <Link to="#" className="hover:underline">About Us</Link>
                  <Link to="#" className="hover:underline">Terms of Service</Link>
                  <Link to="#" className="hover:underline">Contact</Link>
                  <Link to="#" className="hover:underline">Privacy Policy</Link>
                  <Link to="#" className="hover:underline">FAQs</Link>
                  <Link to="#" className="hover:underline">Support</Link>
                </div>
              </div>
              <div>
                <p>© 2025 PoojaConnect</p>
                <p className="text-orange-200 text-sm">All rights reserved</p>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
