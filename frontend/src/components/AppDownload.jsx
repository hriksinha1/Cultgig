/* AppDownload section - App store download CTAs with phone mockup */
import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';

export default function AppDownload() {
  return (
    <section
      id="download"
      data-testid="app-download-section"
      className="relative bg-black py-24 md:py-32 z-10 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#EAFF00] opacity-[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2
              data-testid="app-download-headline"
              className="font-['Syne'] text-3xl md:text-5xl tracking-tight font-bold text-white mb-4"
            >
              Take <span className="text-[#EAFF00]">cultgig</span> Everywhere
            </h2>
            <p className="text-[#ffffff] text-lg font-['Satoshi'] leading-relaxed mb-10 max-w-md">
              Available on iOS and Android. Discover gigs or talent on the go.
              Book, perform, and get paid — all from your pocket.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                data-testid="app-store-button"
                className="flex items-center gap-3 bg-[#111111] border border-[#EAFF00]/20 rounded-xl px-6 py-4 hover:border-[#EAFF00]/50 hover:shadow-[0_0_20px_rgba(234,255,0,0.15)] transition-all duration-300 group"
              >
                <Apple size={28} className="text-white group-hover:text-[#EAFF00] transition-colors" />
                <div>
                  <span className="text-xs text-[#ffffff] font-['Satoshi'] block">Download on the</span>
                  <span className="text-base font-semibold text-white font-['Satoshi']">App Store</span>
                </div>
              </a>

              <a
                href="#"
                data-testid="google-play-button"
                className="flex items-center gap-3 bg-[#111111] border border-[#EAFF00]/20 rounded-xl px-6 py-4 hover:border-[#EAFF00]/50 hover:shadow-[0_0_20px_rgba(234,255,0,0.15)] transition-all duration-300 group"
              >
                <Play size={28} className="text-white group-hover:text-[#EAFF00] transition-colors fill-current" />
                <div>
                  <span className="text-xs text-[#ffffff] font-['Satoshi'] block">Get it on</span>
                  <span className="text-base font-semibold text-white font-['Satoshi']">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center phone-glow"
          >
            <div className="relative w-[280px] md:w-[320px]">
              {/* Phone Frame */}
              <div className="bg-[#1a1a1a] rounded-[40px] border-2 border-white/10 p-3 shadow-2xl">
                {/* Screen area */}
                <div className="bg-gradient-to-b from-[#0a0a0a] to-[#111111] rounded-[32px] overflow-hidden aspect-[9/19]">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-4">
                    <div className="w-24 h-6 bg-[#1a1a1a] rounded-full" />
                  </div>

                  {/* Mock UI Content */}
                  <div className="px-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-['Syne'] font-bold text-white">Cult<span className="text-[#EAFF00]">Gig</span></span>
                      <div className="w-6 h-6 rounded-full bg-[#EAFF00]/20" />
                    </div>

                    {/* Search bar */}
                    <div className="bg-[#1a1a1a] rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#EAFF00]/40" />
                      <span className="text-[10px] text-[#666]">Search talent...</span>
                    </div>

                    {/* Featured card */}
                    <div className="bg-[#111111] border border-[#EAFF00]/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#EAFF00]/30" />
                        <div>
                          <div className="w-16 h-2 bg-white/40 rounded" />
                          <div className="w-10 h-1.5 bg-[#EAFF00]/40 rounded mt-1" />
                        </div>
                      </div>
                      <div className="w-full h-20 bg-[#0a0a0a] rounded-lg mb-2" />
                      <div className="flex gap-2">
                        <div className="flex-1 bg-[#EAFF00] rounded-md py-1.5 text-center">
                          <span className="text-[8px] font-bold text-black">Book Now</span>
                        </div>
                        <div className="flex-1 border border-white/20 rounded-md py-1.5 text-center">
                          <span className="text-[8px] text-white">Profile</span>
                        </div>
                      </div>
                    </div>

                    {/* Talent list items */}
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#1a1a1a]/50 rounded-lg p-2">
                        <div className="w-10 h-10 rounded-lg bg-[#EAFF00]/10" />
                        <div className="flex-1">
                          <div className="w-20 h-2 bg-white/30 rounded mb-1" />
                          <div className="w-14 h-1.5 bg-[#666]/40 rounded" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[#EAFF00]/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
