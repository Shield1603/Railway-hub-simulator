
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Bookings", path: "/booking" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-primary flex items-center"
          >
            <span className="mr-2 text-2xl">🚆</span>
            <span className="tracking-tight">RailwayHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm rounded-full transition-all",
                  location.pathname === item.path
                    ? "text-primary font-medium bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[4rem] bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out md:hidden overflow-hidden",
          isMobileMenuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 pt-4 pb-8 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-3 rounded-lg transition-all",
                  location.pathname === item.path
                    ? "text-primary font-medium bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
