import dotenv from "dotenv";
dotenv.config(); // ← add this
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/Users.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // Check if a local account exists with the same email
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          user.googleId = profile.id;
          user.authProvider = "google";
          await user.save();
          return done(null, user);
        }

        // Brand new user — create an account
        const newUser = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          authProvider: "google",
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
