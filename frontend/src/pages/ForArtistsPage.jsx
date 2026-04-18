/* ForArtistsPage - /for-artists - Dedicated page for artist audience */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { setSEO } from '../components/SEOHelmet';
import { Music, Camera, Laugh, Theater, Palette, Mic, Briefcase, TrendingUp, Shield, DollarSign, Star, MapPin } from 'lucide-react';
import {
  growthCardStyle,
  handleGrowthCardMouseLeave,
  handleGrowthCardMouseMove,
} from '../lib/cardFx';

const categories = [
  { icon: Music, label: 'Musicians', emoji: '🎵' },
  { icon: Camera, label: 'Photographers', emoji: '📸' },
  { icon: Laugh, label: 'Comedians', emoji: '😂' },
  { icon: Theater, label: 'Performers', emoji: '🎭' },
  { icon: Palette, label: 'Visual Artists', emoji: '🎨' },
  { icon: Mic, label: 'Spoken Word', emoji: '🎤' },
];

const benefits = [
  { icon: Briefcase, title: 'Get Booked Directly', desc: 'No middlemen. Venues find you and send booking requests straight to your inbox.' },
  { icon: TrendingUp, title: 'Grow Your Audience', desc: 'Build a public profile with reviews, photos, and videos that attract more gigs.' },
  { icon: Shield, title: 'Verified & Trusted', desc: 'Every booking is backed by our escrow system. No more chasing payments.' },
  { icon: DollarSign, title: 'Set Your Own Rates', desc: 'You decide how much you charge. No hidden fees, transparent pricing.' },
];

const mockArtists = [
  { name: 'Aisha Kapoor', role: 'Jazz Musician', city: 'Mumbai', rating: 4.9, gigs: 47 },
  { name: 'Rohan Mehta', role: 'Stand-up Comedian', city: 'Delhi', rating: 4.8, gigs: 34 },
  { name: 'Priya Sharma', role: 'Wedding Photographer', city: 'Jaipur', rating: 4.7, gigs: 62 },
  { name: 'Vikram Singh', role: 'Classical Vocalist', city: 'Bangalore', rating: 4.9, gigs: 28 },
  { name: 'Sneha Reddy', role: 'Spoken Word Artist', city: 'Hyderabad', rating: 4.6, gigs: 19 },
  { name: 'Arjun Nair', role: 'Acoustic Guitarist', city: 'Pune', rating: 4.8, gigs: 41 },
];

export default function ForArtistsPage() {
  setSEO({
    title: 'For Artists - Get Booked, Perform, Get Paid',
    description: 'Your stage is everywhere. Join cultgig to get discovered by venues, manage bookings, and build your career. Musicians, photographers, comedians, and creators welcome.',
    keywords: 'artists, get booked, find gigs, music booking, talent platform',
    url: 'https://cultgig.com/for-artists',
    image: 'https://cultgig.com/og-image.jpg',
    type: 'website',
  });

  return (
    <div data-testid="for-artists-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6">
            Your Stage is <span className="text-[#EAFF00]">Everywhere</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#ffffff] font-['Satoshi'] max-w-xl mx-auto mb-8">
            Get discovered by top venues and businesses. Build your portfolio, get booked, and get paid — all in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link to="/waitlist" data-testid="artists-hero-cta"
              className="inline-block bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']">
              Join artists on WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Who Can <span className="text-[#EAFF00]">Join?</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative overflow-hidden bg-[#111111] border border-white/10 rounded-xl p-5 text-center hover:border-[#EAFF00]/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_14px_26px_rgba(0,0,0,0.32)] will-change-transform">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 58%)' }}
                />
                <span className="text-3xl block mb-2">{c.emoji}</span>
                <p className="font-['Satoshi'] text-sm font-semibold text-white group-hover:text-[#EAFF00] transition-colors">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            What You <span className="text-[#EAFF00]">Get</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative overflow-hidden bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-[#EAFF00]/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_14px_26px_rgba(0,0,0,0.32)] will-change-transform">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 58%)' }}
                />
                <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-4">
                  <b.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">{b.title}</h4>
                <p className="text-[#ffffff] text-sm leading-relaxed font-['Satoshi']">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Artist Profiles */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Featured <span className="text-[#EAFF00]">Artists</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockArtists.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                data-testid={`artist-card-${i}`}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative overflow-hidden bg-[#111111] border border-white/10 rounded-xl p-5 hover:border-[#EAFF00]/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_14px_26px_rgba(0,0,0,0.32)] will-change-transform">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 58%)' }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#EAFF00]/20 flex items-center justify-center text-[#EAFF00] font-['Syne'] font-bold text-lg">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-['Syne'] text-base font-semibold text-white">{a.name}</h4>
                    <p className="text-[#ffffff] text-xs font-['Satoshi']">{a.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-['Satoshi']">
                  <span className="flex items-center gap-1 text-[#ffffff]"><MapPin size={12} />{a.city}</span>
                  <span className="flex items-center gap-1 text-[#EAFF00]"><Star size={12} />{a.rating}</span>
                  <span className="text-[#ffffff]">{a.gigs} Gigs</span>
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
          <h3 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-6">Ready to Get Booked?</h3>
          <Link to="/waitlist" data-testid="artists-bottom-cta"
            className="inline-block bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] hover:bg-[#d4e600] transition-all duration-300 font-['Satoshi']">
            Join Waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
