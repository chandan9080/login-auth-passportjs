const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRECT;

function initializePassportLocal(passport) {
  passport.use(
    //For Google Authentication Strategy
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/users/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const user = new User({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            provider: "google",
            avatar: profile.photos[0].value,
          });
          user.save();
          done(null, user);
        } else {
          done(null, user);
        }
      }
    )
  );
  //Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "user not found" });
          }
          if (!user.password) {
            return done(null, false, {
              message: "Please Login using GoogleId ",
            });
          }
          bcrypt.compare(password, user.password).then((match) => {
            if (match) {
              return done(null, user, { message: "signed in" });
            }
            return done(null, false, { message: "password incorrect" });
          });
        } catch (err) {
          return done(err, false, { message: "Something went Wrong" });
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
module.exports = initializePassportLocal;
