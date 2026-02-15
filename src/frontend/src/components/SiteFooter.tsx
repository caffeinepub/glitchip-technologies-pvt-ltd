import { Link } from '@tanstack/react-router';
import { SiLinkedin, SiX, SiFacebook } from 'react-icons/si';
import { Heart } from 'lucide-react';

const services = [
  'Physical Design',
  'Design Verification',
  'DFT',
  'AI Automation',
  'RTL Engineering',
];

const socialLinks = [
  { name: 'LinkedIn', icon: SiLinkedin, href: '#' },
  { name: 'X', icon: SiX, href: '#' },
  { name: 'Facebook', icon: SiFacebook, href: '#' },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'glitchip-technologies'
  );

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/IMG-20250404-WA0002.png"
                alt="Glitchip Technologies"
                className="h-10 w-auto"
              />
            </Link>
            <h3 className="font-bold text-lg mb-2">Glitchip Technologies Pvt. Ltd.</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Leading VLSI services company delivering excellence in semiconductor design,
              verification, and AI-powered automation solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/why-us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Why Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Glitchip Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
