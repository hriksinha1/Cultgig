// CultGig Backend — Express.js + Mongoose Entry Point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Load .env from the server directory regardless of where this file is require()'d from
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const waitlistRoutes = require('./routes/waitlist');

const app = express();

// Middleware
const corsOriginConfig = process.env.CORS_ORIGIN;
const rawAllowedOrigins = corsOriginConfig 
  ? corsOriginConfig.split(',').map(o => o.trim()).filter(o => o.length > 0)
  : [];

// If no origins specified, allow all
const allowedOrigins = rawAllowedOrigins.length > 0 ? rawAllowedOrigins : '*';

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Log CORS configuration for debugging
console.log('🔐 CORS Configuration:');
const originDisplay = Array.isArray(allowedOrigins) ? allowedOrigins.join(', ') : allowedOrigins;
console.log(`   Allowed Origins: ${originDisplay}`);
console.log(`   Tip: If CORS errors occur, verify REACT_APP_BACKEND_URL in frontend .env matches one of CORS_ORIGIN values in backend .env`);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle pre-flight for all routes
app.use(express.json());

// MongoDB Connection — use local MongoDB (managed by platform)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://thecultgig_db_user:jNUuZLq8Nk3I05oM@cultgig.jpebwri.mongodb.net/';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected — CultGig DB ready'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'CultGig Node.js API is running', status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'CultGig Node.js API', version: '1.0.0' });
});

// CORS debug endpoint
app.get('/api/cors-debug', (req, res) => {
  const origin = req.get('origin');
  const allowedOrigins = Array.isArray(corsOptions.origin) ? corsOptions.origin : [(corsOptions.origin || '*')];
  const isOriginAllowed = corsOptions.origin === '*' || allowedOrigins.includes(origin);
  
  res.json({
    corsConfig: {
      allowedOrigins: allowedOrigins,
      methods: corsOptions.methods,
      credentials: corsOptions.credentials,
      optionsSuccessStatus: corsOptions.optionsSuccessStatus,
    },
    requestOrigin: origin || 'none',
    originAllowed: isOriginAllowed,
    corsEnabled: true,
  });
});

// Start server if running directly (local dev)
if (require.main === module) {
  const PORT = process.env.PORT || 5555;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CultGig server running on port ${PORT}`);
  });
}

// Export for Vercel functions
module.exports = app;
