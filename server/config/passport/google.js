var mongoose = require('mongoose');
var passport = require('passport');
var models = require('../../lib/models');
var config = require('../../config');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var strategy = new GoogleStrategy(config.auth.google, function(accessToken, refreshToken, profile, done) {
  // var options = {
  //   criteria: {
  //     'google.id': profile.id
  //   },
  //   newUserInfo: {
  //     name: profile.displayName,
  //     email: profile.emails[0].value,
  //     username: profile.username,
  //     provider: 'google',
  //     github: profile._json
  //   }
  // };

  // User.findOne(options.criteria, function(err, user) {
  //   if (err) return done(err);

  //   // If we couldn't find the user, create and save a new one.
  //   if (!user) {
  //     user = new User(options.newUserInfo);

  //     user.save(function(err) {
  //       return done(err, user);
  //     });
  //   } else {
  //     return done(err, user);
  //   }
  // });
});

module.exports = strategy;