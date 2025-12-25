import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-cream">
                  Promised Land
                </span>
                <span className="text-xs font-medium -mt-1 text-cream/70">
                  College – Juba
                </span>
              </div>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Equipping young people and professionals with practical, market-ready skills for today's rapidly evolving economy.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-cream">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Our Programs" },
                { href: "/admissions", label: "Admissions" },
                { href: "/apply", label: "Apply Online" },
                { href: "/announcements", label: "Announcements" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-cream">Programs</h4>
            <ul className="space-y-3">
              {[
                "Computer Basics",
                "Web Development",
                "Digital Marketing",
                "Entrepreneurship",
                "Leadership & Communication",
                "Project Management",
              ].map((program) => (
                <li key={program}>
                  <Link
                    to="/programs"
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-cream">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Promised Land Guest House, Pop 2 area, before Ranok Hotel, Juba, South Sudan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+211980363156" className="text-cream/70 text-sm hover:text-accent transition-colors">+211 980 363 156</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:jokabrahamthon@promisedlandss.org" className="text-cream/70 text-sm hover:text-accent transition-colors">jokabrahamthon@promisedlandss.org</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 text-sm">
              © {new Date().getFullYear()} Promised Land College – Juba. All rights reserved.
            </p>
            <p className="text-cream/50 text-sm">
              An affiliate of Promised Land Secondary School
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
