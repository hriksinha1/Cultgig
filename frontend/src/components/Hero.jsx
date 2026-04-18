/* Hero section - Full viewport, CENTER-ALIGNED on all screen sizes */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroScene from "./HeroScene";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Hero() {
  const { scrollProgress } = useScrollAnimation();

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1], // cubic-bezier for modern smooth easing
      },
    },
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Animated scroll progress indicator */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3D Background Canvas */}
      <HeroScene />

      {/* Subtle radial glow behind content with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[120px]"
          animate={{
            scale: 1 + scrollProgress * 0.2,
            opacity: 0.04 + scrollProgress * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Content Overlay — strictly center-aligned */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pointer-events-none text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto">
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-6"
          >
            <span
              data-testid="hero-pill-label"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#ffffff] font-['Satoshi'] backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <span className="text-base">🎭</span> Where Talent Meets
              Opportunity
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            data-testid="hero-headline"
            variants={itemVariants}
            className="font-['Syne'] text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white mb-6"
          >
            Book. Perform.
            <br />
            <motion.span
              className="text-[#EAFF00] inline-block"
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Get Discovered.
            </motion.span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            data-testid="hero-subheadline"
            variants={itemVariants}
            className="text-lg text-[#fffbfb] font-['Satoshi'] leading-relaxed mb-10 max-w-[600px] mx-auto"
          >
            cultgig connects artists, creators, and freelancers with businesses
            and venues that need their talent.
          </motion.p>

          {/* CTA Buttons — centered row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 pointer-events-auto mb-10"
          >
            <motion.button
              data-testid="hero-cta-download"
              onClick={() => handleScroll("#download")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(234,255,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#EAFF00] text-black font-bold px-8 py-4 rounded-lg text-base shadow-[0_0_20px_rgba(234,255,0,0.4)] hover:shadow-[0_0_40px_rgba(234,255,0,0.6)] transition-all duration-300 glow-pulse font-['Satoshi']"
            >
              Download the App
            </motion.button>
            <motion.button
              data-testid="hero-cta-waitlist"
              onClick={() => handleScroll("#whatsapp-community")}
              whileHover={{ scale: 1.05, borderColor: "#EAFF00", color: "#EAFF00" }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border border-white/20 font-bold px-8 py-4 rounded-lg text-base transition-all duration-300 font-['Satoshi']"
            >
              Join Waitlist
            </motion.button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            data-testid="hero-trust-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm text-[#666666] font-['Satoshi']"
          >
            🎵 For Musicians &middot; 📸 Photographers &middot; 😂 Comedians
            &middot; 🎭 Creators &middot; 🏨 Venues &middot; 🍽️ Restaurants
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Down Arrow — centered at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          data-testid="hero-scroll-down"
          onClick={() => handleScroll("#features")}
          className="text-[#EAFF00]/60 hover:text-[#EAFF00] transition-colors bounce-down"
        >
          <ChevronDown size={32} />
        </button>
      </motion.div>
    </section>
  );
}
