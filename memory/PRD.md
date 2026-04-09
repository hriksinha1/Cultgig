# CultGig Landing Page — PRD

## Original Problem Statement
Build a full, modern, single-page responsive 3D landing page for "CultGig" — a talent marketplace platform connecting artists/freelancers with businesses/venues.

## Architecture
- **Frontend**: React 19, Tailwind CSS 3, Framer Motion, Three.js (vanilla), Shadcn/UI
- **Backend**: Node.js + Express.js + Mongoose (port 5000), proxied through FastAPI (port 8001, platform requirement)
- **Database**: MongoDB (local, `cultgigDB`)
- **3D**: Vanilla Three.js with UnrealBloom post-processing

## User Personas
1. **Artists/Creators** — Musicians, photographers, comedians looking for gig opportunities
2. **Businesses/Venues** — Restaurants, cafés, hotels, event organizers looking to hire talent

## Core Requirements
- 3D animated hero section with neon glow aesthetic
- Waitlist signup form with name, email, WhatsApp, role
- Center-aligned hero layout
- Dark theme with #EAFF00 accent
- Syne + Satoshi typography

## What's Been Implemented (April 2025)
- [x] 3D Hero with vanilla Three.js (microphone, camera, notes, particles, bloom)
- [x] Center-aligned hero section
- [x] Sticky navbar with mobile hamburger
- [x] Features section (2-column: Artists vs Businesses)
- [x] How It Works with Shadcn Tabs
- [x] App Download section with phone mockup
- [x] Waitlist form with WhatsApp field + API integration
- [x] Node.js Express Mongoose backend
- [x] Email validation, duplicate detection (409)
- [x] Footer with social links
- [x] README.md

## Backlog
- P0: None remaining
- P1: Connect to production MongoDB Atlas, add rate limiting
- P2: Add testimonials/social proof section, analytics tracking
