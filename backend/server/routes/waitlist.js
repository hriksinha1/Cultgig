// POST /api/waitlist — stores signup and saves to MongoDB
const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");

function inviteUrlForRole(role) {
  const raw =
    role === "business"
      ? process.env.WHATSAPP_GROUP_BUSINESS_URL
      : process.env.WHATSAPP_GROUP_ARTIST_URL;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : null;
}

// POST /api/waitlist — Save signup and return WhatsApp group invite for role
router.post("/", async (req, res) => {
  try {
    const { name, email, whatsapp, role } = req.body;
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail =
      typeof email === "string" ? email.toLowerCase().trim() : "";
    const normalizedWhatsapp =
      typeof whatsapp === "string" ? whatsapp.replace(/\D/g, "").trim() : "";
    const normalizedRole = typeof role === "string" ? role.trim() : "";

    // Validate all fields are present
    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedWhatsapp ||
      !normalizedRole
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate phone is exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(normalizedWhatsapp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number",
      });
    }

    // Validate role is allowed
    if (!["artist", "business"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be "artist" or "business"',
      });
    }

    // Check for duplicates (email OR phone) in a single atomic query to prevent race conditions
    const existingEntry = await Waitlist.findOne({
      $or: [
        { email: normalizedEmail },
        { whatsapp: normalizedWhatsapp }
      ]
    });
    
    if (existingEntry) {
      if (existingEntry.email === normalizedEmail) {
        return res.status(409).json({
          success: false,
          message: 'This email is already registered.',
        });
      } else {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already registered.',
        });
      }
    }

    // Save new waitlist entry
    const entry = new Waitlist({
      name: normalizedName,
      email: normalizedEmail,
      whatsapp: normalizedWhatsapp,
      role: normalizedRole,
    });

    try {
      await entry.save();
    } catch (saveErr) {
      // Handle MongoDB duplicate key error (E11000) from unique constraints
      if (saveErr.code === 11000) {
        const field = Object.keys(saveErr.keyPattern || {})[0];
        if (field === 'email') {
          return res.status(409).json({
            success: false,
            message: 'This email is already registered.',
          });
        } else if (field === 'whatsapp') {
          return res.status(409).json({
            success: false,
            message: 'This mobile number is already registered.',
          });
        }
        return res.status(409).json({
          success: false,
          message: 'This entry already exists.',
        });
      }
      // Re-throw other errors to outer catch block
      throw saveErr;
    }

    return res.status(201).json({
      success: true,
      message: "Saved! Opening WhatsApp to join your community…",
      inviteUrl: inviteUrlForRole(normalizedRole),
    });
  } catch (err) {
    console.error("Waitlist error:", err);

    // Handle any remaining errors
    return res.status(500).json({
      success: false,
      message: "Server error. Try again.",
    });
  }
});

// GET /api/waitlist/count — Count entries
router.get("/count", async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    return res.json({ success: true, count });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
