const app = require('../backend/server/server');

// Bridge for Vercel Serverless Function
module.exports = (req, res) => {
  return app(req, res);
};
