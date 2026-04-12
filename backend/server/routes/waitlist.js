// POST /api/waitlist — stores signup; returns inviteUrl from env:
//   WHATSAPP_GROUP_ARTIST_URL   — chat.whatsapp.com invite for Artist/Creator
//   WHATSAPP_GROUP_BUSINESS_URL — chat.whatsapp.com invite for Business/Venue
const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');

function inviteUrlForRole(role) {
  const raw =
    role === 'business'
      ? process.env.WHATSAPP_GROUP_BUSINESS_URL
      : process.env.WHATSAPP_GROUP_ARTIST_URL;
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : null;
}

// POST /api/waitlist — Save signup and return WhatsApp group invite for role
router.post('/', async (req, res) => {
  try {
    const { name, email, whatsapp, role } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.toLowerCase().trim() : '';
    const normalizedWhatsapp = typeof whatsapp === 'string' ? whatsapp.replace(/\D/g, '').trim() : '';
    const normalizedRole = typeof role === 'string' ? role.trim() : '';

    // Validate all fields are present
    if (!normalizedName || !normalizedEmail || !normalizedWhatsapp || !normalizedRole) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    // Validate phone is exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(normalizedWhatsapp)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number',
      });
    }

    // Validate role is allowed
    if (!['artist', 'business'].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be "artist" or "business"',
      });
    }

    // Check if email already exists
    const existing = await Waitlist.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered.',
        inviteUrl: inviteUrlForRole(normalizedRole),
      });
    }

    // Save new waitlist entry
    const entry = new Waitlist({
      name: normalizedName,
      email: normalizedEmail,
      whatsapp: normalizedWhatsapp,
      role: normalizedRole,
    });
    await entry.save();

    return res.status(201).json({
      success: true,
      message: 'Saved! Opening WhatsApp to join your community…',
      inviteUrl: inviteUrlForRole(normalizedRole),
    });
  } catch (err) {
    console.error('Waitlist error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error. Try again.',
    });
  }
});

// GET /api/waitlist — List all entries - This opens public data. Don't use this.
// router.get('/', async (req, res) => {
//   try {
//     const entries = await Waitlist.find().sort({ joinedAt: -1 });
//     return res.json({ success: true, data: entries });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// GET /api/waitlist/count — Count entries
router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    return res.json({ success: true, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
