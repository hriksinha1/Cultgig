/* AboutPage - /about - Company story, team, and values */
import { motion } from "framer-motion";
import {
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Instagram,
  Github,
} from "lucide-react";

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
    name: "Hrik",
    role: "Designer & Product Head",
    image: "/image/Hrik - Blue Hoodie.jpeg",
    instagram: "#",
    github: "#",
  },
  {
    name: "Debashis",
    role: "Backend Developer",
    image: "/image/Debashis.jpeg",
    instagram: "#",
    github: "#",
  },
  {
    name: "Kushall",
    role: "Developer",
    image: "/image/Kushall.jpeg",
    instagram: "#",
    github: "#",
  },
  {
    name: "Soham",
    role: "Developer",
    image: "/image/Soham.jpeg",
    instagram: "#",
    github: "#",
  },
  {
    name: "Sounak",
    role: "Developer",
    image: "/image/Sounak.jpeg",
    instagram: "#",
    github: "#",
  },
  {
    name: "Haseeb",
    role: "Developer",
    image: "/image/haseeb.png",
    instagram: "#",
    github: "#",
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Meet the <span className="text-[#EAFF00]">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`team-card-${i}`}
                className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center hover:border-[#EAFF00]/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#EAFF00]/20 flex items-center justify-center mx-auto mb-4 text-[#EAFF00] font-['Syne'] font-bold text-2xl overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-['Syne'] text-base font-semibold text-white mb-1">
                  {m.name}
                </h4>
                <p className="text-[#ffffff] text-xs font-['Satoshi']">
                  {m.role}
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffffff] hover:text-[#EAFF00] transition-colors"
                    >
                      <Instagram size={14} />
                    </a>
                  )}
                  {m.github && (
                    <a
                      href={m.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffffff] hover:text-[#EAFF00] transition-colors"
                    >
                      <Github size={14} />
                    </a>
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
                className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center hover:border-[#EAFF00]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-[#EAFF00]" />
                </div>
                <h4 className="font-['Syne'] text-lg font-semibold text-white mb-2">
                  {v.title}
                </h4>
                <p className="text-[#ffffff] text-sm font-['Satoshi']">
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
