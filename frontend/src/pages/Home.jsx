/* Home page - wraps existing landing sections (unchanged) */
import { setSEO } from '../components/SEOHelmet';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AppDownload from '../components/AppDownload';
import WaitlistSignup from '../components/WaitlistSignup';

export default function Home() {
  setSEO({
    title: 'Book Gigs, Perform, Get Discovered',
    description: 'cultgig connects artists, creators, and freelancers with businesses and venues. Book gigs, perform, and get discovered. The ultimate platform for talent discovery.',
    keywords: 'gig booking, artists, musicians, photographers, comedians, performers, venues, talent discovery, entertainment',
    url: 'https://cultgig.com',
    image: 'https://cultgig.com/og-image.jpg',
    type: 'website',
  });

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <AppDownload />
      <WaitlistSignup />
    </>
  );
}
