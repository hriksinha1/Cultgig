# CultGig — PRD

## Original Problem Statement
Build a full, modern, single-page responsive 3D landing page for CultGig, then extend with multi-page routing.

## Architecture
- Frontend: React 19, Tailwind CSS 3, React Router DOM v6, Framer Motion, Three.js, Shadcn/UI
- Backend: Node.js + Express.js + Mongoose (port 5000), proxied through FastAPI (port 8001)
- Database: MongoDB (local, cultgigDB)

## What's Been Implemented
- [x] 3D Hero with vanilla Three.js + Bloom
- [x] Center-aligned hero section
- [x] 10 pages with React Router v6
- [x] Active NavLink highlighting in #EAFF00
- [x] ScrollToTop on route change
- [x] 4-column footer with all navigation links
- [x] Waitlist form with WhatsApp + API integration
- [x] Node.js Express Mongoose backend with validation
- [x] Contact form (frontend-only)
- [x] Privacy Policy & Terms of Service pages with sidebar nav
- [x] FAQ accordion on How It Works page
- [x] Mock artist/business profiles
- [x] README.md with full documentation

## Backlog
- P1: Production MongoDB Atlas, rate limiting, SEO meta tags
- P2: Testimonials section, analytics/tracking, image optimization
