// Vercel Serverless Function entry point
console.log('🚀 Invoking api/index.js...');
const app = require('../backend/server/server');

// Ensure all environment variants recognize this is the entry point
module.exports = app;
