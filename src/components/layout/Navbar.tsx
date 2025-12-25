import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/announcements", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHeroPage = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHeroPage
          ? "bg-card/95 backdrop-blur-lg shadow-soft border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={cn(
              "p-2 rounded-xl transition-colors duration-300",
              isScrolled || !isHeroPage 
                ? "bg-primary text-primary-foreground" 
                : "bg-cream/20 text-cream"
            )}>
              <GraduationCap className="h-7 w-7" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif text-xl font-bold transition-colors duration-300",
                isScrolled || !isHeroPage ? "text-foreground" : "text-cream"
              )}>
                Promised Land
              </span>
              <span className={cn(
                "text-xs font-medium -mt-1 transition-colors duration-300",
                isScrolled || !isHeroPage ? "text-muted-foreground" : "text-cream/70"
              )}>
                College – Juba
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.href
                    ? isScrolled || !isHeroPage
                      ? "bg-primary/10 text-primary"
                      : "bg-cream/20 text-cream"
                    : isScrolled || !isHeroPage
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-cream/80 hover:text-cream hover:bg-cream/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin/login">
              <Button 
                variant={isScrolled || !isHeroPage ? "ghost" : "ghost"}
                size="sm"
                className={cn(
                  isScrolled || !isHeroPage 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-cream/80 hover:text-cream hover:bg-cream/10"
                )}
              >
                Admin
              </Button>
            </Link>
            <Link to="/apply">
              <Button 
                variant={isScrolled || !isHeroPage ? "gold" : "hero"} 
                size="default"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled || !isHeroPage 
                ? "text-foreground hover:bg-muted" 
                : "text-cream hover:bg-cream/10"
            )}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-medium transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link to="/admin/login">
              <Button variant="ghost" className="w-full justify-start" size="lg">
                Admin Portal
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="gold" className="w-full mt-2" size="lg">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
