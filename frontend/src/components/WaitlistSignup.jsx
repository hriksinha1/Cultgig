/* Home section: WhatsApp community signup (saved via /api/waitlist) */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/input';
import { CheckCircle2, Lock, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import {
  openWhatsappInvitePlaceholder,
  resolveWhatsappInviteUrl,
  navigateToWhatsappInvite,
} from '../lib/whatsappCommunity';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.trim();
const WAITLIST_ENDPOINT = BACKEND_URL ? `${BACKEND_URL}/api/waitlist` : '/api/waitlist';

export default function WaitlistSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'duplicate' | 'error'
  const [validationMessage, setValidationMessage] = useState('');
  const [inviteLink, setInviteLink] = useState(null);

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

    const submittedRole = role;
    const placeholderTab = openWhatsappInvitePlaceholder();

    setLoading(true);
    setStatus(null);
    setValidationMessage('');
    setInviteLink(null);

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: normalizedEmail, whatsapp: normalizedWhatsapp, role }),
      });

      // Check status BEFORE parsing body to avoid json parse errors
      const statusCode = res.status;

      let data = {};
      try {
        data = await res.json();
      } catch (parseErr) {
        // Ignore JSON parse errors — use status code only
      }

      if (statusCode === 201 && data.success) {
        const url = resolveWhatsappInviteUrl(data.inviteUrl, submittedRole);
        setInviteLink(url);
        if (url) {
          navigateToWhatsappInvite(url, placeholderTab);
        } else if (placeholderTab && !placeholderTab.closed) {
          placeholderTab.close();
        }
        setStatus('success');
        setName('');
        setEmail('');
        setWhatsapp('');
        setRole('');
      } else if (statusCode === 409) {
        const url = resolveWhatsappInviteUrl(data.inviteUrl, submittedRole);
        setInviteLink(url);
        if (url) {
          navigateToWhatsappInvite(url, placeholderTab);
        } else if (placeholderTab && !placeholderTab.closed) {
          placeholderTab.close();
        }
        setStatus('duplicate');
      } else if (statusCode === 400 && data.message) {
        if (placeholderTab && !placeholderTab.closed) placeholderTab.close();
        setStatus('error');
        setValidationMessage(data.message);
      } else {
        if (placeholderTab && !placeholderTab.closed) placeholderTab.close();
        setStatus('error');
        if (data.message) {
          setValidationMessage(data.message);
        }
      }
    } catch (err) {
      if (placeholderTab && !placeholderTab.closed) placeholderTab.close();
      setStatus('error');
      setValidationMessage(
        BACKEND_URL
          ? 'Unable to reach server. Please try again.'
          : 'Backend URL is not configured. Set REACT_APP_BACKEND_URL in frontend environment variables.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="whatsapp-community"
      data-testid="waitlist-section"
      className="relative bg-[#0a0a0a] py-24 md:py-32 z-10 border-t border-white/5"
    >
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Headline */}
          <h2
            data-testid="waitlist-headline"
            className="font-['Syne'] text-3xl md:text-5xl tracking-tight font-bold text-white mb-4"
          >
            Join our <span className="text-[#EAFF00]">WhatsApp</span> community
          </h2>
          <p className="text-[#a0a0a0] text-lg font-['Satoshi'] leading-relaxed mb-10">
            Pick Artist/Creator or Business/Venue, add your WhatsApp number, and we’ll open the
            right group invite for you. We’ll also keep your email on file for cultgig updates.
          </p>

          {/* Form */}
          <form
            data-testid="waitlist-form"
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
          >
            {/* Name */}
            <Input
              data-testid="waitlist-name-input"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
            />

            {/* Email */}
            <Input
              data-testid="waitlist-email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
            />

            {/* WhatsApp */}
            <div>
              <Input
                data-testid="waitlist-whatsapp-input"
                type="tel"
                placeholder="10-digit mobile number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
              />
              <p className="text-xs text-[#666] mt-1.5 ml-1 font-['Satoshi']">
                Enter only digits, e.g. 9876543210
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex gap-3">
              <button
                type="button"
                data-testid="waitlist-role-artist-toggle"
                onClick={() => setRole('artist')}
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${
                  role === 'artist'
                    ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00] shadow-[0_0_15px_rgba(234,255,0,0.15)]'
                    : 'bg-[#1a1a1a] border-white/10 text-[#a0a0a0] hover:border-white/30'
                }`}
              >
                🎤 Artist / Creator
              </button>
              <button
                type="button"
                data-testid="waitlist-role-business-toggle"
                onClick={() => setRole('business')}
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${
                  role === 'business'
                    ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00] shadow-[0_0_15px_rgba(234,255,0,0.15)]'
                    : 'bg-[#1a1a1a] border-white/10 text-[#a0a0a0] hover:border-white/30'
                }`}
              >
                🏢 Business / Venue
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="waitlist-submit-button"
              disabled={loading || !name || !email || !whatsapp || !role}
              className="w-full sm:w-auto sm:min-w-[240px] sm:mx-auto sm:block bg-[#EAFF00] text-black font-bold py-4 px-8 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi'] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Join WhatsApp community'
              )}
            </button>
          </form>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                key="success"
                data-testid="waitlist-success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center text-[#EAFF00] font-['Satoshi'] text-sm space-y-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  <span>
                    You’re in! Use the new tab or the link below to open WhatsApp and tap Join group.
                  </span>
                </div>
                {inviteLink && (
                  <a
                    href={inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#EAFF00] underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Open WhatsApp group invite
                  </a>
                )}
              </motion.div>
            )}
            {status === 'duplicate' && (
              <motion.div
                key="duplicate"
                data-testid="waitlist-duplicate-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center text-amber-400 font-['Satoshi'] text-sm space-y-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <AlertTriangle size={18} />
                  <span>This email is already registered — here’s your group link again.</span>
                </div>
                {inviteLink && (
                  <a
                    href={inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-amber-400 underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Open WhatsApp group invite
                  </a>
                )}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                key="error"
                data-testid="waitlist-error-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-red-400 font-['Satoshi'] text-sm"
              >
                <XCircle size={18} />
                {validationMessage || 'Something went wrong. Please try again.'}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy note */}
          <p className="flex items-center justify-center gap-2 text-sm text-[#666] mt-6 font-['Satoshi']">
            <Lock size={14} /> Your info is safe with us. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
