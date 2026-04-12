/* Footer - Updated with React Router links, 4-column layout */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

function XIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16H20L8.267 4H4z" /><path d="M4 20l6.768-6.768M15.232 7.232L20 4" />
    </svg>
  );
}

function TikTokIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const joinLinks = [
  { label: 'For Artists', to: '/for-artists' },
  { label: 'For Businesses', to: '/for-businesses' },
  { label: 'WhatsApp community', to: '/waitlist' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: XIcon, label: 'Twitter/X', href: '#' },
  { icon: TikTokIcon, label: 'TikTok', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

function FooterLinkColumn({ title, links, testIdPrefix }) {
  return (
    <div>
      <h4 className="font-['Syne'] text-sm font-semibold text-[#666] uppercase tracking-widest mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              data-testid={`${testIdPrefix}-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              className="text-[#a0a0a0] hover:text-[#EAFF00] transition-colors duration-300 text-sm font-['Satoshi']"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-black border-t border-[#EAFF00]/20 py-12 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Logo + Tagline + Social */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to="/" className="font-['Syne'] text-3xl font-extrabold tracking-tight inline-block mb-3">
              Cult<span className="text-[#EAFF00]">Gig</span>
            </Link>
            <p className="text-[#a0a0a0] text-sm font-['Satoshi'] leading-relaxed mb-5">
              Where Talent Meets Opportunity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  data-testid={`footer-social-${social.label.toLowerCase().replace(/[/\s]/g, '-')}`}
                  className="w-9 h-9 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#a0a0a0] hover:text-[#EAFF00] hover:border-[#EAFF00]/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <FooterLinkColumn title="Quick Links" links={quickLinks} testIdPrefix="footer-quick" />
          </motion.div>

          {/* Col 3: Join cultgig */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <FooterLinkColumn title="Join cultgig" links={joinLinks} testIdPrefix="footer-join" />
          </motion.div>

          {/* Col 4: Legal */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <FooterLinkColumn title="Legal" links={legalLinks} testIdPrefix="footer-legal" />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#666] text-sm font-['Satoshi']">&copy; 2025 cultgig. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" data-testid="footer-privacy-policy" className="text-[#666] hover:text-[#a0a0a0] text-sm font-['Satoshi'] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" data-testid="footer-terms" className="text-[#666] hover:text-[#a0a0a0] text-sm font-['Satoshi'] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
