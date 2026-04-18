/* SEO Helper Component - Sets meta tags for each page */
import { useEffect } from 'react';

/**
 * Core function to update meta tags (imperative, no hooks)
 * Can be called from anywhere, including outside React components
 */
const updateMetaTags = ({ 
  title = 'cultgig - Book Gigs, Perform, Get Discovered',
  description = 'cultgig connects artists, creators, and freelancers with businesses and venues. Book gigs, perform, and get discovered.',
  keywords = 'gig booking, artists, musicians, performers, venues, talent discovery',
  image = 'https://cultgig.com/og-image.jpg',
  url = 'https://cultgig.com',
  type = 'website',
}) => {
  // Set title
  document.title = `${title} | cultgig`;
  
  // Set or update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);
  
  // Set or update keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords);
  
  // Set or update Open Graph tags
  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:url': url,
    'og:image': image,
  };
  
  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
  
  // Set or update Twitter tags
  const twitterTags = {
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
  
  Object.entries(twitterTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
  
  // Set canonical URL
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

/**
 * Custom hook version for use in React components
 * Follows React Hook naming convention
 */
export const useSEO = ({ 
  title = 'cultgig - Book Gigs, Perform, Get Discovered',
  description = 'cultgig connects artists, creators, and freelancers with businesses and venues. Book gigs, perform, and get discovered.',
  keywords = 'gig booking, artists, musicians, performers, venues, talent discovery',
  image = 'https://cultgig.com/og-image.jpg',
  url = 'https://cultgig.com',
  type = 'website',
} = {}) => {
  useEffect(() => {
    updateMetaTags({ title, description, keywords, image, url, type });
  }, [title, description, keywords, image, url, type]);
};

/**
 * Imperative wrapper function for calling from pages
 * Maintains backward compatibility with existing code
 */
export const setSEO = (config) => {
  updateMetaTags(config);
};

/* React Component version for use in pages */
export const SEOHelmet = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type,
}) => {
  useSEO({ title, description, keywords, image, url, type });
  return null;
};

export default SEOHelmet;
