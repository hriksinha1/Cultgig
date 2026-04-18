import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { addToWaitlist } from '../lib/appwrite';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

/**
 * Reusable Waitlist Form component with international phone support.
 * 
 * @param {Object} props
 * @param {string} props.testIdPrefix - Prefix for data-testids
 * @param {string} props.buttonText - Text for the submit button
 */
export default function WaitlistForm({ 
  testIdPrefix = 'waitlist', 
  buttonText = 'Join the Waitlist' 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'duplicate' | 'error'
  const [validationMessage, setValidationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedWhatsapp = whatsapp.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !normalizedEmail || !normalizedWhatsapp || !role) return;

    if (!emailRegex.test(normalizedEmail)) {
      setStatus('error');
      setValidationMessage('Please enter a valid email address.');
      return;
    }

    if (normalizedWhatsapp.length < 10) {
      setStatus('error');
      setValidationMessage('Please enter a valid phone number with country code.');
      return;
    }

    setLoading(true);
    setStatus(null);
    setValidationMessage('');

    try {
      await addToWaitlist({
        name: name.trim(),
        email: normalizedEmail,
        whatsapp: normalizedWhatsapp,
        role,
      });
      setStatus('success');
      setName('');
      setEmail('');
      setWhatsapp('');
      setRole('');
    } catch (err) {
      console.error('[Waitlist Error]', err);
      if (err.code === 'DUPLICATE_EMAIL' || err.code === 'DUPLICATE_PHONE') {
        setStatus('duplicate');
        setValidationMessage(err.message);
      } else {
        setStatus('error');
        setValidationMessage(err.message || 'Unable to submit. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        data-testid={`${testIdPrefix}-form`}
        onSubmit={handleSubmit}
        className="space-y-4 text-left"
      >
        {/* Name */}
        <Input
          data-testid={`${testIdPrefix}-name-input`}
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
        />

        {/* Email */}
        <Input
          data-testid={`${testIdPrefix}-email-input`}
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#1a1a1a] border-white/20 rounded-lg h-12 px-4 text-white placeholder:text-[#666] focus-visible:ring-[#EAFF00] focus-visible:border-[#EAFF00] font-['Satoshi']"
        />

        {/* WhatsApp */}
        <div className="whatsapp-input-container">
          <PhoneInput
            defaultCountry="in"
            value={whatsapp}
            onChange={(phone) => setWhatsapp(phone)}
            required
            placeholder="WhatsApp number"
            data-testid={`${testIdPrefix}-whatsapp-input`}
            className="w-full"
            inputClassName="!w-full !bg-[#1a1a1a] !border-white/20 !rounded-r-lg !h-12 !px-4 !text-white !placeholder:text-[#666] !focus:ring-[#EAFF00] !focus:border-[#EAFF00] !font-['Satoshi'] !border-l-0"
            countrySelectorStyleProps={{
              buttonClassName: "!bg-[#1a1a1a] !border-white/20 !rounded-l-lg !h-12 !px-3 !border-r-0 hover:!bg-[#222] transition-colors",
              dropdownClassName: "!bg-[#1a1a1a] !border-white/20 !text-white",
            }}
          />
          <p className="text-xs text-[#666] mt-1.5 ml-1 font-['Satoshi']">
            Select your country and enter your WhatsApp number
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex gap-3">
          <button
            type="button"
            data-testid={`${testIdPrefix}-role-artist-toggle`}
            onClick={() => setRole('artist')}
            className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${
              role === 'artist'
                ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00] shadow-[0_0_15px_rgba(234,255,0,0.15)]'
                : 'bg-[#1a1a1a] border-white/10 text-[#ffffff] hover:border-white/30'
            }`}
          >
            🎤 Artist / Creator
          </button>
          <button
            type="button"
            data-testid={`${testIdPrefix}-role-business-toggle`}
            onClick={() => setRole('business')}
            className={`flex-1 py-3.5 rounded-lg text-sm font-semibold font-['Satoshi'] transition-all duration-300 border ${
              role === 'business'
                ? 'bg-[#EAFF00]/10 border-[#EAFF00] text-[#EAFF00] shadow-[0_0_15px_rgba(234,255,0,0.15)]'
                : 'bg-[#1a1a1a] border-white/10 text-[#ffffff] hover:border-white/30'
            }`}
          >
            🏢 Business / Venue
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid={`${testIdPrefix}-submit-button`}
          disabled={loading || !name || !email || !whatsapp || !role}
          className="w-full sm:w-auto sm:min-w-[240px] sm:mx-auto sm:block bg-[#EAFF00] text-black font-bold py-4 px-8 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi'] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </form>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            data-testid={`${testIdPrefix}-success-message`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-[#EAFF00] font-['Satoshi'] text-sm space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              <span>
                You're on the waitlist! We'll be in touch soon with more updates.
              </span>
            </div>
          </motion.div>
        )}
        {status === 'duplicate' && (
          <motion.div
            key="duplicate"
            data-testid={`${testIdPrefix}-duplicate-message`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-amber-400 font-['Satoshi'] text-sm space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle size={18} />
              <span>{validationMessage || 'This entry is already registered on our waitlist.'}</span>
            </div>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            data-testid={`${testIdPrefix}-error-message`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-red-400 font-['Satoshi'] text-sm"
          >
            {validationMessage || 'Something went wrong. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
