var mongoose = require('mongoose');
var passport = require('passport');
var models = require('../../lib/models');
var config = require('../../config');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var strategy = new GoogleStrategy(config.auth.google, function(accessToken, refreshToken, profile, done) {
  console.log('google profile: ', profile);
  models.User.findOne({ provider_id: profile.id }).exec()
    .then(function(user) {
      // If we couldn't find the user, create and save a new one.
      if (!user) {
        var data = {
          email: profile.emails[0].value,
          username: profile.login,
          provider: 'google',
          provider_id: profile.id
        };

        user = new models.User(data);
        user.save()
          .then(function(user) {
            done(null, user);
          });
      } else {
        return done(null, user);
      }
    });
});

module.exports = strategy;