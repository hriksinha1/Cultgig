// CultGig Backend — Express.js + Mongoose Entry Point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const waitlistRoutes = require('./routes/waitlist');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};
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

// Start server
app.listen(5555, '0.0.0.0', () => {
  console.log(`CultGig server running on port ${5555}`);
});
