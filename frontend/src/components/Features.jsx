/* Features section - 2-column layout for Artists & Businesses with glassmorphism cards */
import { motion } from 'framer-motion';
import { Mic, CalendarDays, Banknote, Search, ClipboardList, Star } from 'lucide-react';
import {
  growthCardStyle,
  handleGrowthCardMouseLeave,
  handleGrowthCardMouseMove,
} from '../lib/cardFx';

const artistFeatures = [
  {
    icon: Mic,
    title: 'Build Your Profile',
    description: 'Create a stunning talent portfolio that showcases your skills, past gigs, and reviews.',
  },
  {
    icon: CalendarDays,
    title: 'Get Booked',
    description: 'Receive gig requests directly from venues and businesses looking for your talent.',
  },
  {
    icon: Banknote,
    title: 'Get Paid',
    description: 'Secure, fast in-app payments so you can focus on what you do best — performing.',
  },
];

const businessFeatures = [
  {
    icon: Search,
    title: 'Discover Talent',
    description: 'Browse verified local and global creators, filter by category, reviews, and availability.',
  },
  {
    icon: ClipboardList,
    title: 'Manage Bookings',
    description: 'Handle everything from one dashboard — scheduling, payments, and communications.',
  },
  {
    icon: Star,
    title: 'Rate & Review',
    description: 'Build trust with your audience through transparent ratings and verified reviews.',
  },
];

function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      data-testid={`feature-card-${title.toLowerCase().replace(/\s/g, '-')}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      onMouseMove={handleGrowthCardMouseMove}
      onMouseLeave={handleGrowthCardMouseLeave}
      style={growthCardStyle}
      className="group relative overflow-hidden bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-[#EAFF00]/50 hover:shadow-[0_16px_28px_rgba(0,0,0,0.35)] will-change-transform"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 56%)",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-0 h-full w-10 rotate-12 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-[220px] transition-all duration-700" />
      <motion.div
        className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-4 group-hover:bg-[#EAFF00]/20 transition-colors duration-300"
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon size={24} className="text-[#EAFF00]" />
      </motion.div>
      <h4 className="font-['Syne'] text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-[#ffffff] text-base leading-relaxed font-['Satoshi']">{description}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative bg-black py-24 md:py-32 z-10"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#EAFF00] opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-16"
        >
          <motion.h2
            data-testid="features-headline"
            className="font-['Syne'] text-3xl md:text-5xl tracking-tight font-bold text-white mb-4"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Everything You Need to{" "}
            <span className="text-[#EAFF00]">Shine</span> or{" "}
            <span className="text-[#EAFF00]">Scout</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#ffffff] text-lg font-['Satoshi'] max-w-2xl mx-auto"
          >
            Whether you're a performer looking for your next stage or a venue searching for the perfect act.
          </motion.p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Artists */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <motion.span
                className="w-2 h-8 bg-[#EAFF00] rounded-full inline-block"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              For Artists & Creators
            </motion.h3>
            <div className="flex flex-col gap-5">
              {artistFeatures.map((feature, i) => (
                <FeatureCard key={feature.title} {...feature} index={i} />
              ))}
            </div>
          </div>

          {/* For Businesses */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <motion.span
                className="w-2 h-8 bg-[#EAFF00] rounded-full inline-block"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              For Businesses & Venues
            </motion.h3>
            <div className="flex flex-col gap-5">
              {businessFeatures.map((feature, i) => (
                <FeatureCard key={feature.title} {...feature} index={i + 3} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
