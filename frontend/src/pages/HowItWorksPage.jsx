/* HowItWorksPage - /how-it-works - 4-step vertical timeline + FAQ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { UserPlus, Eye, CalendarCheck, CreditCard, FileText, BookOpen, PartyPopper, ThumbsUp, ChevronDown } from 'lucide-react';

const artistSteps = [
  { num: '01', icon: UserPlus, title: 'Create Your Profile', desc: 'Upload your portfolio with photos, videos, and audio. Set your rates, availability, and preferred gig types to get started.' },
  { num: '02', icon: Eye, title: 'Get Discovered by Venues', desc: 'Your profile appears in search results. Venues browse talent by category, location, and reviews — and reach out directly.' },
  { num: '03', icon: CalendarCheck, title: 'Confirm the Booking', desc: 'Review the gig details — date, venue, pay, and requirements. Accept the booking and prepare for your performance.' },
  { num: '04', icon: CreditCard, title: 'Perform & Get Paid Securely', desc: 'Show up, deliver your art, and get paid directly through the app. Secure escrow ensures your payment is guaranteed.' },
];

const businessSteps = [
  { num: '01', icon: FileText, title: 'Post Your Gig Requirement', desc: 'Tell us what talent you need — music, comedy, photography, or more. Set the date, budget, and venue details.' },
  { num: '02', icon: BookOpen, title: 'Browse Verified Talent', desc: 'Explore artist profiles with portfolios, reviews, and ratings. Filter by genre, location, availability, and price range.' },
  { num: '03', icon: PartyPopper, title: 'Send a Booking Request', desc: 'Found the perfect act? Send a booking request with your offer. Artists respond within 24 hours.' },
  { num: '04', icon: ThumbsUp, title: 'Host the Event & Review', desc: 'Enjoy a seamless experience. After the event, leave a review to help the community find great talent.' },
];

const faqs = [
  { q: 'Is cultgig free to join?', a: 'Yes! Joining our WhatsApp community and creating a profile is completely free. We only charge a small commission on completed bookings.' },
  { q: 'How do payments work?', a: 'Payments are processed securely through our in-app escrow system. The venue pays upfront, and the artist receives the funds after the gig is completed.' },
  { q: 'What types of artists can join?', a: 'Musicians, singers, DJs, photographers, videographers, comedians, spoken word artists, magicians, dancers, and all kinds of live performers and creators.' },
  { q: 'How do I get discovered?', a: 'Complete your profile with high-quality media, collect reviews from past gigs, and keep your availability updated. The more complete your profile, the higher you rank in search.' },
  { q: 'What cities does cultgig operate in?', a: 'We are launching in 10 cities across India initially — Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Jaipur, Goa, and Ahmedabad. More cities coming soon.' },
];

function StepCard({ step, index, total }) {
  return (
    <div className="flex gap-6 relative">
      {/* Vertical connector line */}
      {index < total - 1 && (
        <div className="absolute left-7 top-16 bottom-0 w-px border-l-2 border-dashed border-[#EAFF00]/30" />
      )}
      {/* Number circle */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.12, type: 'spring' }}
        className="w-14 h-14 rounded-full bg-[#EAFF00] flex items-center justify-center shrink-0 z-10"
      >
        <span className="font-['Syne'] text-black font-extrabold text-lg">{step.num}</span>
      </motion.div>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1 }}
        className="pb-12"
      >
        <div className="w-10 h-10 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-3">
          <step.icon size={20} className="text-[#EAFF00]" />
        </div>
        <h4 className="font-['Syne'] text-xl font-semibold text-white mb-2">{step.title}</h4>
        <p className="text-[#a0a0a0] text-base leading-relaxed font-['Satoshi'] max-w-lg">{step.desc}</p>
      </motion.div>
    </div>
  );
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-white/10 rounded-xl overflow-hidden"
    >
      <button
        data-testid={`faq-${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-[#111111] hover:bg-[#1a1a1a] transition-colors"
      >
        <span className="font-['Satoshi'] font-semibold text-white text-base pr-4">{faq.q}</span>
        <ChevronDown size={20} className={`text-[#EAFF00] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="p-5 pt-0 text-[#a0a0a0] text-sm leading-relaxed font-['Satoshi'] bg-[#111111]">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <div data-testid="how-it-works-page" className="pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#EAFF00] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white mb-6"
          >
            How <span className="text-[#EAFF00]">cultgig</span> Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#a0a0a0] font-['Satoshi'] max-w-xl mx-auto"
          >
            From signup to showtime — here's how it all comes together.
          </motion.p>
        </div>
      </section>

      {/* Timeline with Tabs */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Tabs defaultValue="artists" className="w-full">
            <div className="flex justify-center mb-14">
              <TabsList className="bg-[#111111] border border-white/10 rounded-full p-1 h-auto">
                <TabsTrigger value="artists" data-testid="hiw-tab-artists" className="rounded-full px-6 py-2.5 text-sm font-['Satoshi'] font-semibold data-[state=active]:bg-[#EAFF00] data-[state=active]:text-black text-[#a0a0a0] transition-all">
                  For Artists
                </TabsTrigger>
                <TabsTrigger value="businesses" data-testid="hiw-tab-businesses" className="rounded-full px-6 py-2.5 text-sm font-['Satoshi'] font-semibold data-[state=active]:bg-[#EAFF00] data-[state=active]:text-black text-[#a0a0a0] transition-all">
                  For Businesses
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="artists">
              {artistSteps.map((s, i) => <StepCard key={s.title} step={s} index={i} total={artistSteps.length} />)}
            </TabsContent>
            <TabsContent value="businesses">
              {businessSteps.map((s, i) => <StepCard key={s.title} step={s} index={i} total={businessSteps.length} />)}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-10 text-center"
          >
            Frequently Asked <span className="text-[#EAFF00]">Questions</span>
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
