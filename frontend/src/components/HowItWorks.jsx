/* HowItWorks section - Tabbed 3-step timeline with Shadcn Tabs */
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { UserPlus, Eye, CreditCard, FileText, BookOpen, ThumbsUp } from 'lucide-react';

const artistSteps = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Upload your portfolio, set your rates, and pick your gig types. Show the world what you bring to the stage.',
  },
  {
    num: '02',
    icon: Eye,
    title: 'Get Discovered',
    description: 'Venues and businesses browse talent and reach out to you directly. No more cold-calling — they come to you.',
  },
  {
    num: '03',
    icon: CreditCard,
    title: 'Perform & Get Paid',
    description: 'Confirm the gig, show up, deliver your magic, and get paid securely through the app.',
  },
];

const businessSteps = [
  {
    num: '01',
    icon: FileText,
    title: 'Post Your Requirement',
    description: 'Tell us what kind of talent you need, when you need them, and your budget. We handle the rest.',
  },
  {
    num: '02',
    icon: BookOpen,
    title: 'Browse & Book',
    description: 'Explore artist profiles, check reviews and portfolios, and send a booking request in minutes.',
  },
  {
    num: '03',
    icon: ThumbsUp,
    title: 'Host & Review',
    description: 'Enjoy the performance, then leave a review to help other venues find the best talent.',
  },
];

function StepCard({ step, index, total }) {
  return (
    <div className="flex-1 flex flex-col items-center relative">
      {/* Dashed connector line between steps */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] timeline-connector" />
      )}

      {/* Step number circle */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15, type: 'spring' }}
        className="w-14 h-14 rounded-full bg-[#EAFF00] flex items-center justify-center mb-6 z-10"
      >
        <span className="font-['Syne'] text-black font-extrabold text-lg">{step.num}</span>
      </motion.div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#EAFF00]/10 flex items-center justify-center mb-4">
        <step.icon size={20} className="text-[#EAFF00]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        className="text-center"
      >
        <h4 className="font-['Syne'] text-xl font-semibold text-white mb-2">{step.title}</h4>
        <p className="text-[#ffffff] text-base leading-relaxed font-['Satoshi'] max-w-xs mx-auto">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="relative bg-[#0a0a0a] py-24 md:py-32 z-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            data-testid="how-it-works-headline"
            className="font-['Syne'] text-3xl md:text-5xl tracking-tight font-bold text-white mb-4"
          >
            How <span className="text-[#EAFF00]">cultgig</span> Works
          </h2>
          <p className="text-[#ffffff] text-lg font-['Satoshi'] max-w-xl mx-auto">
            Three simple steps to connect talent with opportunity.
          </p>
        </motion.div>

        {/* Tabs using Shadcn */}
        <Tabs defaultValue="artists" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList
              data-testid="how-it-works-tabs"
              className="bg-[#111111] border border-white/10 rounded-full p-1 h-auto"
            >
              <TabsTrigger
                value="artists"
                data-testid="tab-for-artists"
                className="rounded-full px-6 py-2.5 text-sm font-['Satoshi'] font-semibold data-[state=active]:bg-[#EAFF00] data-[state=active]:text-black data-[state=active]:shadow-[0_0_15px_rgba(234,255,0,0.3)] text-[#ffffff] transition-all duration-300"
              >
                For Artists
              </TabsTrigger>
              <TabsTrigger
                value="businesses"
                data-testid="tab-for-businesses"
                className="rounded-full px-6 py-2.5 text-sm font-['Satoshi'] font-semibold data-[state=active]:bg-[#EAFF00] data-[state=active]:text-black data-[state=active]:shadow-[0_0_15px_rgba(234,255,0,0.3)] text-[#ffffff] transition-all duration-300"
              >
                For Businesses
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="artists" data-testid="tab-content-artists">
            <div className="flex flex-col md:flex-row gap-10 md:gap-8">
              {artistSteps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} total={artistSteps.length} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="businesses" data-testid="tab-content-businesses">
            <div className="flex flex-col md:flex-row gap-10 md:gap-8">
              {businessSteps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} total={businessSteps.length} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
