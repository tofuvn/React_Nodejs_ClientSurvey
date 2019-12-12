const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  };
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
        return done(null, user);
    } 
    
    const newUser = await new User({ googleId: profile.id }).save();
    done(null, newUser);
    
  })
);
