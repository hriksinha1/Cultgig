/* TermsOfServicePage - /terms-of-service - Legal text with sidebar nav */
import { motion } from 'framer-motion';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms', content: 'By accessing or using the cultgig platform (website and mobile application), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access or use the platform. cultgig reserves the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.' },
  { id: 'eligibility', title: 'Eligibility & Accounts', content: 'You must be at least 18 years old to create an account on cultgig. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to provide accurate, current, and complete information during registration and to update it as needed. cultgig may suspend or terminate accounts that violate these terms.' },
  { id: 'platform-rules', title: 'Platform Rules', content: 'Users must not: (1) post false, misleading, or fraudulent information, (2) harass, threaten, or discriminate against other users, (3) use the platform for illegal activities, (4) attempt to bypass the platform\'s payment system for direct transactions, (5) scrape, crawl, or extract data from the platform without permission, or (6) impersonate another person or entity. Violations may result in permanent account suspension.' },
  { id: 'bookings', title: 'Bookings & Payments', content: 'All bookings made through cultgig are agreements between the artist and the venue/business. cultgig acts as a facilitator and is not a party to the booking contract. Payments are processed through our secure escrow system — the venue pays upfront, and funds are released to the artist after the gig is completed. cultgig charges a platform fee (disclosed before each transaction). Refund policies are outlined in the booking confirmation.' },
  { id: 'liability', title: 'Limitation of Liability', content: 'cultgig provides the platform "as is" without warranties of any kind, express or implied. We are not liable for any disputes between artists and venues, quality of performances, cancellations, or damages arising from platform use. In no event shall cultgig\'s total liability exceed the fees paid by you to cultgig in the 12 months preceding the claim. This limitation applies to the fullest extent permitted by law.' },
  { id: 'ip', title: 'Intellectual Property', content: 'All content, branding, logos, and software on cultgig are owned by or licensed to cultgig and are protected by intellectual property laws. Users retain ownership of content they upload (portfolios, media) but grant cultgig a non-exclusive, worldwide license to display and promote that content on the platform. You may not reproduce, distribute, or create derivative works from cultgig\'s proprietary content without written permission.' },
];

export default function TermsOfServicePage() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div data-testid="terms-of-service-page" className="pt-20">
      {/* Header */}
      <section className="py-16 md:py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-['Syne'] text-3xl md:text-4xl font-extrabold text-white mb-3">
          Terms of <span className="text-[#EAFF00]">Service</span>
        </motion.h1>
        <p className="text-[#ffffff] font-['Satoshi'] text-sm">Last updated: December 2025</p>
      </section>

      {/* Content with sidebar */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <nav className="lg:w-56 shrink-0 lg:sticky lg:top-24 lg:self-start">
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <button onClick={() => handleScrollTo(s.id)}
                    className="text-sm text-[#ffffff] hover:text-[#EAFF00] transition-colors font-['Satoshi'] text-left w-full py-1">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-12">
            {sections.map((s, i) => (
              <motion.div key={s.id} id={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="font-['Syne'] text-xl font-bold text-[#EAFF00] mb-3">{s.title}</h2>
                <p className="text-[#ffffff] text-base leading-relaxed font-['Satoshi']">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
