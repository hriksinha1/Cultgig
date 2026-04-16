/* ForBusinessesPage - /for-businesses - Dedicated page for venue/business audience */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Coffee, Hotel, Tent, Clapperboard, Building, Search, ShieldCheck, CreditCard, BarChart3, Star, MapPin } from 'lucide-react';

const categories = [
  { icon: UtensilsCrossed, label: 'Restaurants', emoji: '🍽️' },
  { icon: Coffee, label: 'Cafes', emoji: '☕' },
  { icon: Hotel, label: 'Hotels', emoji: '🏨' },
  { icon: Tent, label: 'Event Organizers', emoji: '🎪' },
  { icon: Clapperboard, label: 'Production Houses', emoji: '🎬' },
  { icon: Building, label: 'Corporates', emoji: '🏢' },
];

const benefits = [
  { icon: Search, title: 'Curated Talent Pool', desc: 'Access thousands of verified artists across genres — musicians, comedians, photographers, and more.' },
  { icon: ShieldCheck, title: 'Verified & Reviewed', desc: 'Every artist is identity-verified with ratings and reviews from past venues.' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'Escrow-protected payments ensure you only pay when the gig is delivered.' },
  { icon: BarChart3, title: 'Booking Analytics', desc: 'Track your hiring trends, audience engagement, and ROI from live events.' },
];

const mockBusinesses = [
  { name: 'SkyLounge Mumbai', type: 'Rooftop Bar', city: 'Mumbai', bookings: 24, rating: 4.8 },
  { name: 'The Green Cafe', type: 'Live Music Cafe', city: 'Bangalore', bookings: 18, rating: 4.6 },
  { name: 'Royal Orchid Hotels', type: 'Luxury Hotel', city: 'Hyderabad', bookings: 31, rating: 4.9 },
  { name: 'Laugh Factory India', type: 'Comedy Club', city: 'Delhi', bookings: 42, rating: 4.7 },
  { name: 'Sunset Bistro', type: 'Restaurant & Bar', city: 'Goa', bookings: 15, rating: 4.5 },
  { name: 'EventCraft Co.', type: 'Event Management', city: 'Pune', bookings: 27, rating: 4.8 },
];

export default function ForBusinessesPage() {
  return (
    <div data-testid="for-businesses-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6">
            Find the Perfect Talent for{' '}<span className="text-[#EAFF00]">Your Venue</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#a0a0a0] font-['Satoshi'] max-w-xl mx-auto mb-8">
            Discover, book, and manage world-class performers and creators for your events — all from one platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link to="/waitlist" data-testid="biz-hero-cta"
              className="inline-block bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']">
              Join businesses on WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Who Is This <span className="text-[#EAFF00]">For?</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-[#111111] border border-white/10 rounded-xl p-5 text-center hover:border-[#EAFF00]/50 transition-all duration-300 group">
                <span className="text-3xl block mb-2">{c.emoji}</span>
                <p className="font-['Satoshi'] text-sm font-semibold text-white group-hover:text-[#EAFF00] transition-colors">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose cultgig */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Why Choose <span className="text-[#EAFF00]">cultgig?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-[#EAFF00]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-4">
                  <b.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">{b.title}</h4>
                <p className="text-[#a0a0a0] text-sm leading-relaxed font-['Satoshi']">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Business Listings */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Venues on <span className="text-[#EAFF00]">cultgig</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockBusinesses.map((b, i) => (
              <motion.div key={b.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                data-testid={`biz-card-${i}`}
                className="bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#EAFF00]/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/20 flex items-center justify-center text-[#EAFF00] font-['Syne'] font-bold text-lg">
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-['Syne'] text-base font-semibold text-white">{b.name}</h4>
                    <p className="text-[#a0a0a0] text-xs font-['Satoshi']">{b.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-['Satoshi']">
                  <span className="flex items-center gap-1 text-[#a0a0a0]"><MapPin size={12} />{b.city}</span>
                  <span className="flex items-center gap-1 text-[#EAFF00]"><Star size={12} />{b.rating}</span>
                  <span className="text-[#a0a0a0]">{b.bookings} Bookings</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#EAFF00] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-6">Start Hiring Talent Today</h3>
          <Link to="/waitlist" data-testid="biz-bottom-cta"
            className="inline-block bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']">
            Join Waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
