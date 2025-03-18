
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Safety", href: "#" },
        { name: "Cancellation", href: "#" },
        { name: "COVID-19", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Train Booking", href: "#" },
        { name: "Tour Packages", href: "#" },
        { name: "Group Booking", href: "#" },
        { name: "International Rail", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-muted/30 pt-16 border-t">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-2xl font-bold text-primary mb-4 flex items-center">
              <span className="mr-2 text-2xl">🚆</span>
              <span>RailwayHub</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The modern way to book train tickets. Fast, secure, and hassle-free travel 
              planning for your journey across India.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@railwayhub.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>123, Railway Hub Tower, Tech Park, Bangalore - 560001</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border/40 mt-12 py-6 gap-4">
          <div className="text-muted-foreground text-sm">
            © {year} RailwayHub. All rights reserved.
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
