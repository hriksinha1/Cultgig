// Vercel Serverless Function entry point
// All backend deps (express, mongoose, cors, dotenv) are in root node_modules
const app = require('../backend/server/server');

module.exports = app;
