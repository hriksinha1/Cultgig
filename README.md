# CultGig — Full Multi-Page 3D Landing Site

A modern, multi-page responsive 3D landing site for **CultGig** — a talent marketplace platform connecting artists and freelancers with businesses and venues.

---

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | React 19, Tailwind CSS 3, React Router DOM v6, Framer Motion, Shadcn/UI |
| 3D Graphics | Three.js (vanilla) with UnrealBloom post-processing               |
| Backend     | **Node.js + Express.js + Mongoose**                               |
| Database    | MongoDB                                                           |

---

## Pages

| Route              | Page               | Description                           |
| ------------------ | ------------------ | ------------------------------------- |
| `/`                | Home               | 3D hero, features, how it works, download, waitlist |
| `/features`        | Features           | 12 feature cards (6 artists + 6 business) |
| `/how-it-works`    | How It Works       | Tabbed 4-step timeline + FAQ accordion |
| `/for-artists`     | For Artists        | Categories, benefits, mock artist profiles |
| `/for-businesses`  | For Businesses     | Categories, benefits, mock business listings |
| `/waitlist`        | Waitlist           | Stats, form with API, early access benefits |
| `/about`           | About              | Mission, timeline, team, values       |
| `/contact`         | Contact            | Contact info + form (frontend-only)   |
| `/privacy-policy`  | Privacy Policy     | Legal text with sidebar navigation    |
| `/terms-of-service`| Terms of Service   | Legal text with sidebar navigation    |

---

## Project Structure

```
/app/
├── backend/
│   ├── server/                    # Node.js Express backend
│   │   ├── models/
│   │   │   └── Waitlist.js        # Mongoose schema
│   │   ├── routes/
│   │   │   └── waitlist.js        # POST/GET /api/waitlist
│   │   ├── server.js              # Express entry (port 5000)
│   │   ├── package.json
│   │   └── .env
│   ├── server.py                  # FastAPI proxy layer
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.js                 # BrowserRouter + all Routes
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── FeaturesPage.jsx
│   │   │   ├── HowItWorksPage.jsx
│   │   │   ├── WaitlistPage.jsx
│   │   │   ├── ForArtistsPage.jsx
│   │   │   ├── ForBusinessesPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── PrivacyPolicyPage.jsx
│   │   │   └── TermsOfServicePage.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # React Router NavLink + active states
│   │   │   ├── Footer.jsx         # 4-column layout with Router Links
│   │   │   ├── ScrollToTop.jsx    # Scroll to top on route change
│   │   │   ├── Hero.jsx, HeroScene.jsx, Features.jsx, etc.
│   │   │   └── ui/                # Shadcn/UI components
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## Getting Started

### Backend (Node.js)
```bash
cd /app/backend/server
npm install
npm run dev
# Runs on http://localhost:5000
```

### Frontend (React)
```bash
cd /app/frontend
yarn install
yarn start
# Runs on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| POST   | `/api/waitlist`       | Join waitlist (name, email, whatsapp, role) |
| GET    | `/api/waitlist`       | List all waitlist entries                |
| GET    | `/api/waitlist/count` | Total waitlist count                     |

---

## Design System

| Element        | Value                             |
| -------------- | --------------------------------- |
| Primary Accent | `#EAFF00` (electric yellow-green) |
| Background     | `#000000` to `#0a0a0a`           |
| Heading Font   | Syne                              |
| Body Font      | Satoshi                           |

---

## License

Copyright 2025 CultGig. All rights reserved.
