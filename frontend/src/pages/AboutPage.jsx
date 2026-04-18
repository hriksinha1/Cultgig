/* AboutPage - /about - Company story, team, and values */
import { motion } from "framer-motion";
import {
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Instagram,
  Github,
} from "lucide-react";
import {
  growthCardStyle,
  handleGrowthCardMouseLeave,
  handleGrowthCardMouseMove,
} from "../lib/cardFx";

const timeline = [
  {
    year: "2024",
    event: "Idea born — frustrated by the disconnect between talent and venues",
  },
  {
    year: "Early 2025",
    event: "Core team formed — 4 builders with a shared vision",
  },
  {
    year: "Mid 2025",
    event: "Beta development begins — first prototypes and user testing",
  },
  {
    year: "Late 2025",
    event: "WhatsApp communities launch — artists and venues connect early",
  },
];

const team = [
  {
    name: "Hrik Sinha",
    role: "Product Design & Product Head",
    image: "/image/Hrik - Blue Hoodie.jpeg",
    instagram: "https://www.instagram.com/hriksinha/",
    github: "https://github.com/hriksinha1",
  },
  {
    name: "Debashis Ganguly",
    role: "Backend Developer",
    image: "/image/Debashis.jpeg",
    instagram: "https://www.instagram.com/subho8___/",
    github: "https://github.com/debashisganguly",
  },
  {
    name: "Kushall Jain",
    role: "Backend Developer",
    image: "/image/Kushall.jpeg",
    instagram: "https://www.instagram.com/kushalljain/",
    github: "https://github.com/kushallj",
  },
  {
    name: "Soham Dutta",
    role: "Frontend Developer",
    image: "/image/Soham.jpeg",
    instagram: "https://www.instagram.com/_dutta_soham_/",
    github: "https://github.com/sohamdutta",
  },
  {
    name: "Sounak Nandi",
    role: "Frontend Developer",
    image: "/image/Sounak.jpeg",
    instagram: "https://www.instagram.com/sounaknandi/",
    github: "https://github.com/SaunakNandi",
  },
  {
    name: "Haseeb Shahzad",
    role: "Developer",
    image: "/image/haseeb.png",
    instagram: "https://www.instagram.com/its_malikian/",
    github: "https://github.com/haseeb318",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Creativity",
    desc: "We believe every artist deserves a platform to express their talent without barriers.",
  },
  {
    icon: HeartHandshake,
    title: "Trust",
    desc: "Verified profiles, secure payments, and transparent reviews build a community you can count on.",
  },
  {
    icon: Lightbulb,
    title: "Opportunity",
    desc: "We exist to create more gigs, more stages, and more moments where talent meets the right audience.",
  },
];

export default function AboutPage() {
  return (
    <div data-testid="about-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6"
          >
            We're Building the Future of{" "}
            <span className="text-[#EAFF00]">Talent Discovery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#ffffff] font-['Satoshi'] max-w-2xl mx-auto leading-relaxed"
          >
            cultgig was born from a simple frustration: talented artists
            struggle to find gigs, while venues struggle to find the right
            talent. We're bridging that gap with technology, trust, and a deep
            love for the creative community.
          </motion.p>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            Our <span className="text-[#EAFF00]">Story</span>
          </h2>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 relative"
              >
                {i < timeline.length - 1 && (
                  <div className="absolute left-[27px] top-14 bottom-0 w-px border-l-2 border-dashed border-[#EAFF00]/30" />
                )}
                <div className="w-14 h-14 rounded-full bg-[#EAFF00] flex items-center justify-center shrink-0 z-10">
                  <span className="font-['Syne'] text-black font-extrabold text-xs">
                    {t.year
                      .replace("Early ", "E")
                      .replace("Mid ", "M")
                      .replace("Late ", "L")}
                  </span>
                </div>
                <div className="pb-10">
                  <h4 className="font-['Syne'] text-lg font-semibold text-[#EAFF00] mb-1">
                    {t.year}
                  </h4>
                  <p className="text-[#ffffff] text-base font-['Satoshi']">
                    {t.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#EAFF00]/10 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="font-['Syne'] text-2xl md:text-4xl font-bold text-white mb-3 text-center">
            Meet the <span className="text-[#EAFF00]">Team</span>
          </h2>
          <p className="text-center text-[#ffffff]/70 font-['Satoshi'] text-sm md:text-base mb-12 max-w-2xl mx-auto">
            The people building cultgig with craft, creativity, and community
            at the core.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`team-card-${i}`}
                whileTap={{ scale: 0.99 }}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative bg-gradient-to-b from-[#161616] to-[#0b0b0b] border border-white/10 rounded-2xl p-6 text-center transition-[border-color,box-shadow,transform] duration-300 hover:border-[#EAFF00]/45 hover:shadow-[0_18px_34px_rgba(0,0,0,0.4)] overflow-hidden will-change-transform"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 52%)",
                  }}
                />
                <div className="pointer-events-none absolute -left-16 top-0 h-full w-12 rotate-12 bg-white/20 blur-md opacity-0 group-hover:opacity-100 group-hover:translate-x-[280px] transition-all duration-700" />

                <motion.div
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="relative w-20 h-20 rounded-full ring-2 ring-[#EAFF00]/30 group-hover:ring-[#EAFF00]/70 transition-all flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-[0_0_20px_rgba(234,255,0,0.15)]"
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
                <h4 className="relative font-['Syne'] text-base md:text-lg font-semibold text-white mb-1">
                  {m.name}
                </h4>
                <p className="relative text-[#ffffff]/80 text-xs md:text-sm font-['Satoshi'] min-h-[40px] transition-colors duration-300 group-hover:text-white">
                  {m.role}
                </p>
                <div className="relative flex items-center justify-center gap-3 mt-5">
                  {m.instagram && (
                    <motion.a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} Instagram profile`}
                      className="w-9 h-9 rounded-full border border-white/15 bg-white/5 text-[#ffffff] flex items-center justify-center hover:text-black hover:bg-[#EAFF00] hover:border-[#EAFF00] transition-all duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Instagram size={16} />
                    </motion.a>
                  )}
                  {m.github && (
                    <motion.a
                      href={m.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} GitHub profile`}
                      className="w-9 h-9 rounded-full border border-white/15 bg-white/5 text-[#ffffff] flex items-center justify-center hover:text-black hover:bg-[#EAFF00] hover:border-[#EAFF00] transition-all duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Github size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Our <span className="text-[#EAFF00]">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.99 }}
                onMouseMove={handleGrowthCardMouseMove}
                onMouseLeave={handleGrowthCardMouseLeave}
                style={growthCardStyle}
                className="group relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#0d0d0d] border border-white/10 rounded-xl p-6 text-center hover:border-[#EAFF00]/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_16px_28px_rgba(0,0,0,0.35)] will-change-transform"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at var(--mx,50%) var(--my,0%), rgba(234,255,0,0.2), transparent 56%)",
                  }}
                />
                <div className="pointer-events-none absolute -left-16 top-0 h-full w-10 rotate-12 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-[220px] transition-all duration-700" />
                <div className="relative w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-[#EAFF00]/20 group-hover:scale-110">
                  <v.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="relative font-['Syne'] text-lg font-semibold text-white mb-2">
                  {v.title}
                </h4>
                <p className="relative text-[#ffffff] text-sm font-['Satoshi']">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
