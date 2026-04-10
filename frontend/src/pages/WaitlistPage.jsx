/* WaitlistPage - /waitlist - Full dedicated waitlist page with stats */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/input';
import { CheckCircle2, Lock, AlertTriangle, XCircle, Loader2, Users, Building2, MapPin, Zap, Gift, Shield } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const stats = [
  { icon: Users, label: '500+ Artists Joined', color: 'text-[#EAFF00]' },
  { icon: Building2, label: '120+ Businesses Waiting', color: 'text-[#EAFF00]' },
  { icon: MapPin, label: '10 Cities at Launch', color: 'text-[#EAFF00]' },
];

const benefits = [
  { icon: Zap, title: 'Early Access', desc: 'Be among the first to explore and book on cultgig before the public launch.' },
  { icon: Gift, title: 'Exclusive Perks', desc: 'Waitlist members get special launch offers, reduced fees, and priority placement.' },
  { icon: Shield, title: 'Founding Member Badge', desc: 'Stand out with a verified "Early Adopter" badge on your profile forever.' },
];

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWhatsapp = whatsapp.replace(/\D/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!name || !normalizedEmail || !normalizedWhatsapp || !role) return;
    if (!emailRegex.test(normalizedEmail)) {
      setStatus('error');
      setValidationMessage('Please enter a valid email address.');
      return;
    }
    if (!mobileRegex.test(normalizedWhatsapp)) {
      setStatus('error');
      setValidationMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setStatus(null);
    setValidationMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: normalizedEmail, whatsapp: normalizedWhatsapp, role }),
      });
      const statusCode = res.status;
      let data = {};
      try { data = await res.json(); } catch (e) {}
      if (statusCode === 201 && data.success) {
        setStatus('success');
        setName(''); setEmail(''); setWhatsapp(''); setRole('');
      } else if (statusCode === 409) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="waitlist-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6"
          >
            Be First. Be <span className="text-[#EAFF00]">Seen.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#a0a0a0] font-['Satoshi'] max-w-xl mx-auto"
          >
            Join the cultgig waitlist and get early access when we launch. No spam. Just the good stuff.
          </motion.p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-[#111111] border border-white/10 rounded-xl p-5 text-center"
            >
              <s.icon size={28} className="text-[#EAFF00] mx-auto mb-2" />
              <p className="font-['Syne'] text-lg font-bold text-white">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="max-w-xl mx-auto px-6">
          <form data-testid="waitlist-page-form" onSubmit={handleSubmit} className="space-y-4">
            <Input
              data-testid="wp-name-input"
              type="text" placeholder="Your full name" value={name}
              onChange={(e) => setName(e.target.value)} required
              className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
            />
            <Input
              data-testid="wp-email-input"
              type="email" placeholder="your@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
            />
            <div>
              <Input
                data-testid="wp-whatsapp-input"
                type="tel" placeholder="10-digit mobile number" value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)} required
                className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
              />
              <p className="text-xs text-[#666] mt-1.5 ml-1 font-['Satoshi']">Enter only digits, e.g. 9876543210</p>
            </div>
            <div className="flex gap-3">
              <button type="button" data-testid="wp-role-artist" onClick={() => setRole('artist')}
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${role === 'artist' ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00]' : 'bg-[#1a1a1a] border-white/10 text-[#a0a0a0] hover:border-white/30'}`}
              >🎤 Artist / Creator</button>
              <button type="button" data-testid="wp-role-business" onClick={() => setRole('business')}
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${role === 'business' ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00]' : 'bg-[#1a1a1a] border-white/10 text-[#a0a0a0] hover:border-white/30'}`}
              >🏢 Business / Venue</button>
            </div>
            <button type="submit" data-testid="wp-submit-btn" disabled={loading || !name || !email || !whatsapp || !role}
              className="w-full bg-[#EAFF00] text-black font-bold py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi'] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" />Submitting...</span> : 'Join the Waitlist'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div key="s" data-testid="wp-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-[#EAFF00] font-['Satoshi'] text-sm">
                <CheckCircle2 size={18} />You're on the list! We'll reach out on WhatsApp & Email.
              </motion.div>
            )}
            {status === 'duplicate' && (
              <motion.div key="d" data-testid="wp-duplicate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-amber-400 font-['Satoshi'] text-sm">
                <AlertTriangle size={18} />This email is already registered!
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="e" data-testid="wp-error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-red-400 font-['Satoshi'] text-sm">
                <XCircle size={18} />{validationMessage || 'Something went wrong. Please try again.'}
              </motion.div>
            )}
          </AnimatePresence>
          <p className="flex items-center justify-center gap-2 text-sm text-[#666] mt-6 font-['Satoshi']"><Lock size={14} />Your info is safe with us. No spam, ever.</p>
        </div>
      </section>

      {/* Why Join Early */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Why Join <span className="text-[#EAFF00]">Early?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center hover:border-[#EAFF00]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">{b.title}</h4>
                <p className="text-[#a0a0a0] text-sm font-['Satoshi']">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
