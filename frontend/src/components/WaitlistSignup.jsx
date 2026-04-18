import { motion } from 'framer-motion';
import WaitlistForm from './WaitlistForm';

export default function WaitlistSignup() {
  return (
    <section
      id="waitlist"
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
            Get <span className="text-[#EAFF00]">early access</span> to Cultgig
          </h2>
          <p className="text-[#ffffff] text-lg font-['Satoshi'] leading-relaxed mb-10">
            Join our waitlist and be the first to experience Cultgig. Tell us if you're an Artist/Creator
            or Business/Venue so we can tailor your experience.
          </p>

          {/* Form */}
          <WaitlistForm testIdPrefix="waitlist" buttonText="Join the Waitlist" />

          {/* Privacy note */}
          <p className="text-sm text-[#666] mt-6 font-['Satoshi']">
            Your info is safe with us. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
