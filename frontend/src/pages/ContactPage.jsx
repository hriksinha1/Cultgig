/* ContactPage - /contact - Contact info + form (frontend-only) */
import { useState } from "react";
import { motion } from "framer-motion";
import { setSEO } from "../components/SEOHelmet";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Instagram, Linkedin, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { submitContact } from "../lib/appwrite";

function XIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l11.733 16H20L8.267 4H4z" />
      <path d="M4 20l6.768-6.768M15.232 7.232L20 4" />
    </svg>
  );
}

function TikTokIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "thecultgig@gmail.com",
    href: "mailto:thecultgig@gmail.com",
  },
  { icon: Phone, label: "WhatsApp: +91 8777014146", href: "#" },
  { icon: MapPin, label: "Bangalore, India", href: "#" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: XIcon, label: "Twitter/X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: TikTokIcon, label: "TikTok", href: "#" },
];

export default function ContactPage() {
  setSEO({
    title: 'Contact Us - Get in Touch with cultgig',
    description: "Have questions about cultgig? Contact our team. We're here to help artists and venues succeed.",
    keywords: 'contact, support, contact us, customer support',
    url: 'https://cultgig.com/contact',
    image: 'https://cultgig.com/og-image.jpg',
    type: 'website',
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && message) {
      setLoading(true);
      try {
        await submitContact({ name, email, message });
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
      } catch (error) {
        console.error("[Contact Error]", error);
        alert(error.message || "Unable to send message. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div data-testid="contact-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6"
          >
            Get in <span className="text-[#EAFF00]">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#ffffff] font-['Satoshi'] max-w-xl mx-auto"
          >
            Have a question, partnership idea, or just want to say hello? We'd
            love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-['Syne'] text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>
            <div className="space-y-6 mb-10">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center">
                    <c.icon size={18} className="text-[#EAFF00]" />
                  </div>
                  <span className="text-[#ffffff] font-['Satoshi'] group-hover:text-white transition-colors">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
            <h4 className="font-['Syne'] text-sm font-semibold text-[#666] uppercase tracking-widest mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-testid={`contact-social-${s.label.toLowerCase().replace(/[/\s]/g, "-")}`}
                  className="w-10 h-10 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-center text-[#ffffff] hover:text-[#EAFF00] hover:border-[#EAFF00]/50 transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {!sent ? (
              <form
                data-testid="contact-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  data-testid="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
                />
                <Input
                  data-testid="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
                />
                <textarea
                  data-testid="contact-message"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-[#1a1a1a] border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-[#666] focus:ring-2 focus:ring-[#EAFF00] focus:border-[#EAFF00] font-['Satoshi'] outline-none resize-none"
                />
                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={loading}
                  className="w-full bg-[#EAFF00] text-black font-bold py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi'] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                data-testid="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className="bg-[#111111] border border-[#EAFF00]/30 rounded-xl p-10 text-center"
              >
                <CheckCircle2
                  size={48}
                  className="text-[#EAFF00] mx-auto mb-4"
                />
                <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#ffffff] font-['Satoshi']">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
