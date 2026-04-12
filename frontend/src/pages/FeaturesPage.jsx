/* FeaturesPage - /features - Full dedicated features page */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mic, CalendarDays, Banknote, Image, Star, BarChart3,
  Search, ClipboardList, CreditCard, ShieldCheck, MessageSquare, CalendarClock
} from 'lucide-react';

const artistFeatures = [
  { icon: Mic, title: 'Profile Builder', desc: 'Create a stunning portfolio with photos, videos, audio clips, and your complete body of work.' },
  { icon: CalendarDays, title: 'Gig Requests', desc: 'Receive booking requests directly from venues and businesses — no cold-calling needed.' },
  { icon: Banknote, title: 'Secure Payments', desc: 'Get paid safely through the app with instant payouts and transparent fee structure.' },
  { icon: Image, title: 'Portfolio Showcase', desc: 'Highlight your best work in a visual portfolio that makes first impressions count.' },
  { icon: Star, title: 'Reviews & Ratings', desc: 'Build credibility with verified reviews from venues you have performed at.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track profile views, booking trends, and earnings with real-time analytics.' },
];

const businessFeatures = [
  { icon: Search, title: 'Talent Discovery', desc: 'Browse thousands of verified artists filtered by category, location, rating, and price.' },
  { icon: ClipboardList, title: 'Booking Manager', desc: 'Handle all your bookings from one dashboard — scheduling, communication, and status tracking.' },
  { icon: CreditCard, title: 'Payment Gateway', desc: 'Process payments securely with escrow protection and automated invoicing.' },
  { icon: ShieldCheck, title: 'Verified Profiles', desc: 'Every artist on cultgig is identity-verified so you can book with confidence.' },
  { icon: MessageSquare, title: 'Review System', desc: 'Rate and review talent after every booking to help the community make better choices.' },
  { icon: CalendarClock, title: 'Event Planner Tool', desc: 'Plan multi-act events with our timeline tool — manage lineup, breaks, and schedules.' },
];

function FeatureCard({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(234,255,0,0.3)] hover:border-[#EAFF00]/50 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-4 group-hover:bg-[#EAFF00]/20 transition-colors">
        <Icon size={24} className="text-[#EAFF00]" />
      </div>
      <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-[#a0a0a0] text-sm leading-relaxed font-['Satoshi']">{desc}</p>
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <div data-testid="features-page" className="pt-20">
      {/* Hero Banner */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6"
          >
            Powerful Features Built for{' '}
            <span className="text-[#EAFF00]">Talent & Business</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a0a0a0] font-['Satoshi'] max-w-2xl mx-auto"
          >
            Everything you need to shine on stage or find the perfect act for your venue.
          </motion.p>
        </div>
      </section>

      {/* For Artists */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-[#EAFF00] rounded-full" />
            For Artists & Creators
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {artistFeatures.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-16 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-[#EAFF00] rounded-full" />
            For Businesses & Venues
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessFeatures.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to get started?
          </h3>
          <Link
            to="/waitlist"
            data-testid="features-cta-waitlist"
            className="inline-block bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']"
          >
            Join WhatsApp community
          </Link>
        </div>
      </section>
    </div>
  );
}
