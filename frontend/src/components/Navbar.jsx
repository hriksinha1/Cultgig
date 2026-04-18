/* Navbar - Updated with React Router links + multi-page navigation */
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "For Artists", to: "/for-artists" },
  { label: "For Businesses", to: "/for-businesses" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-testid="navbar-logo"
          className="font-['Syne'] text-2xl font-extrabold tracking-tight"
        >
          Cult<span className="text-[#EAFF00]">Gig</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 font-['Satoshi'] ${
                  isActive
                    ? "text-[#EAFF00]"
                    : "text-[#ffffff] hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/waitlist"
            data-testid="nav-cta-join-waitlist"
            className="bg-transparent text-white border border-white/20 font-bold px-4 py-2 rounded-lg text-base hover:border-[#EAFF00] hover:text-[#EAFF00] transition-all duration-300 font-['Satoshi']"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          data-testid="navbar-mobile-menu-toggle"
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="navbar-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <NavLink
                  to={link.to}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  className={({ isActive }) =>
                    `text-2xl font-['Syne'] font-bold transition-colors ${
                      isActive
                        ? "text-[#EAFF00]"
                        : "text-white hover:text-[#EAFF00]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              <Link
                to="/waitlist"
                data-testid="mobile-nav-cta-waitlist"
                className="text-2xl font-['Syne'] font-bold text-[#EAFF00]"
              >
                Join Waitlist
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
