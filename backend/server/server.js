// CultGig Backend — Express.js + Mongoose Entry Point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ FATAL: MONGO_URI environment variable is not set');
  console.error('   Please add MONGO_URI to your .env file');
  console.error('   Example: MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database');
  process.exit(1);
}

/**
 * Handle index creation errors gracefully
 * If unique index creation fails due to duplicates, provide clear guidance
 */
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected — CultGig DB ready');
    
    // Import models AFTER connection to ensure indexes are created
    try {
      require('./models/Waitlist');
      console.log('✅ Database indexes validated successfully');
    } catch (indexErr) {
      if (indexErr.code === 11000 || indexErr.message.includes('duplicate')) {
        console.error('⚠️  INDEX CREATION FAILED: Duplicate values detected in database');
        console.error('The whatsapp field has a unique constraint but duplicate phone numbers exist.');
        console.error('\n🔧 To fix this, run the migration script:');
        console.error('   npm run migrate:cleanup\n');
        console.error('This will remove duplicate phone number entries while keeping the first one.');
        process.exit(1);
      } else {
        throw indexErr;
      }
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

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

// Start server
app.listen(5555, '0.0.0.0', () => {
  console.log(`CultGig server running on port ${5555}`);
});
