import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // This function is called when Google auth is successful
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          // If user doesn't exist, create a new one
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);