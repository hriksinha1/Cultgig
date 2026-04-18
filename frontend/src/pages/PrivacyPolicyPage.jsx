/* PrivacyPolicyPage - /privacy-policy - Legal text with sidebar nav */
import { motion } from 'framer-motion';
import { setSEO } from '../components/SEOHelmet';

const sections = [
  { id: 'data-collection', title: 'Data Collection', content: 'cultgig collects personal information you voluntarily provide when registering, creating a profile, booking talent, or contacting us. This includes your name, email address, phone/WhatsApp number, location, payment details, and profile media (photos, videos, audio). We also automatically collect device information, IP addresses, browser type, and usage analytics when you interact with our platform.' },
  { id: 'data-usage', title: 'How We Use Your Data', content: 'We use your information to operate and improve the cultgig platform, process bookings and payments, verify user identities, match talent with venues, send transactional notifications (booking confirmations, payment receipts), and communicate product updates. We may also use aggregated, anonymized data for analytics and business insights.' },
  { id: 'data-sharing', title: 'Data Sharing', content: 'cultgig does not sell your personal data to third parties. We share information only with: (1) other users as necessary for bookings (e.g., a venue sees an artist\'s profile), (2) payment processors to facilitate transactions, (3) cloud service providers who host our infrastructure, and (4) law enforcement when required by applicable law.' },
  { id: 'cookies', title: 'Cookies & Tracking', content: 'We use cookies and similar tracking technologies to maintain your session, remember preferences, and analyze platform usage. Essential cookies are required for the platform to function. Analytics cookies (e.g., Google Analytics) help us understand user behavior. You can manage cookie preferences through your browser settings, though disabling essential cookies may affect functionality.' },
  { id: 'security', title: 'Data Security', content: 'We implement industry-standard security measures including SSL/TLS encryption, secure payment processing (PCI-DSS compliant), encrypted database storage, and regular security audits. While we strive to protect your data, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.' },
  { id: 'your-rights', title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time by contacting us at privacy@cultgig.com. You may also request data portability, restrict processing, or withdraw consent for non-essential data usage. We will respond to all data requests within 30 days. To delete your account and all associated data, email us or use the in-app account deletion feature.' },
];

export default function PrivacyPolicyPage() {
  setSEO({
    title: 'Privacy Policy - cultgig',
    description: "Read cultgig's privacy policy. We're committed to protecting your personal data and privacy.",
    keywords: 'privacy policy, data protection, privacy',
    url: 'https://cultgig.com/privacy-policy',
    image: 'https://cultgig.com/og-image.jpg',
    type: 'website',
  });

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div data-testid="privacy-policy-page" className="pt-20">
      {/* Header */}
      <section className="py-16 md:py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-['Syne'] text-3xl md:text-4xl font-extrabold text-white mb-3">
          Privacy <span className="text-[#EAFF00]">Policy</span>
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
