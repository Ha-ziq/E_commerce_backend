import express from "express";
import passport from "../config/password.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Step 1: Redirects user to Google's login page
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Step 2: Google redirects back here after user approves
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;

    // Generate JWT exactly like your existing login route
    const token = jwt.sign(
      { id: user._id, name: user.username, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Send token and user data back to frontend via URL params
    res.redirect(
      `http://localhost:5174/auth/callback?token=${token}&id=${user._id}&name=${user.username}&email=${user.email}&role=${user.role}`,
    );
  },
);

export default router;
