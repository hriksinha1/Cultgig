import { motion } from 'framer-motion';
import { setSEO } from '../components/SEOHelmet';
import { Users, Building2, MapPin, Zap, Gift, Shield } from 'lucide-react';
import WaitlistForm from '../components/WaitlistForm';
import {
  growthCardStyle,
  handleGrowthCardMouseLeave,
  handleGrowthCardMouseMove,
} from '../lib/cardFx';

const stats = [
  { icon: Users, label: 'Artist & creator community', color: 'text-[#EAFF00]' },
  { icon: Building2, label: 'Venue & business circle', color: 'text-[#EAFF00]' },
  { icon: MapPin, label: 'Updates & launches', color: 'text-[#EAFF00]' },
];

const benefits = [
  { icon: Zap, title: 'Early access', desc: 'Be among the first to experience Cultgig and help shape the platform with your feedback.' },
  { icon: Gift, title: 'Tailored experience', desc: 'Tell us if you\'re an Artist/Creator or Business/Venue so we deliver features that matter to you.' },
  { icon: Shield, title: 'Stay connected', desc: 'We\'ll keep your email and number on file to send you exclusive updates, launches, and opportunities.' },
];

export default function WaitlistPage() {
  setSEO({
    title: 'Join the Waitlist - Be First to Experience cultgig',
    description: 'Join cultgig\'s exclusive waitlist and be among the first to experience the future of talent discovery. Early access to artists and venues.',
    keywords: 'waitlist, early access, join cultgig, beta access',
    url: 'https://cultgig.com/waitlist',
    image: 'https://cultgig.com/og-image.jpg',
    type: 'website',
  });

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
            Get <span className="text-[#EAFF00]">early access</span> to Cultgig
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#ffffff] font-['Satoshi'] max-w-xl mx-auto"
          >
            Join our waitlist and be the first to experience Cultgig. Tell us if you're an Artist/Creator
            or Business/Venue so we can tailor your experience.
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
              onMouseMove={handleGrowthCardMouseMove}
              onMouseLeave={handleGrowthCardMouseLeave}
              style={growthCardStyle}
              className="group relative overflow-hidden bg-[#111111] border border-white/10 rounded-xl p-5 text-center transition-[border-color,box-shadow,transform] duration-300 hover:border-[#EAFF00]/50 hover:shadow-[0_14px_26px_rgba(0,0,0,0.32)] will-change-transform"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 58%)' }}
              />
              <s.icon size={28} className="text-[#EAFF00] mx-auto mb-2" />
              <p className="font-['Syne'] text-lg font-bold text-white">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="max-w-xl mx-auto px-6">
          <WaitlistForm testIdPrefix="wp" buttonText="Join Waitlist" />
          <p className="text-sm text-[#666] mt-6 font-['Satoshi']">Your info is safe with us. No spam, ever.</p>
        </div>
      </section>

      {/* Why Join Early */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Why join the <span className="text-[#EAFF00]">community?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative overflow-hidden bg-[#111111] border border-white/10 rounded-xl p-6 text-center hover:border-[#EAFF00]/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_14px_26px_rgba(0,0,0,0.32)] will-change-transform">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 58%)' }}
                />
                <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">{b.title}</h4>
                <p className="text-[#ffffff] text-sm font-['Satoshi']">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
