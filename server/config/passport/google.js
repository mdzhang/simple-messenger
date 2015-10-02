var mongoose = require('mongoose');
var passport = require('passport');
var models = require('../../lib/models');
var config = require('../../config');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var strategy = new GoogleStrategy(config.auth.google, function(accessToken, refreshToken, profile, done) {
  models.User.findOne({ provider_id: profile.id }).exec()
    .then(function(user) {
      // If we couldn't find the user, create and save a new one.
      if (!user) {
        var data = {
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          username: profile.email,
          provider: 'google',
          provider_id: profile.id
        };

        return new models.User.create(data, done);
      } else {
        return done(null, user);
      }
    });
});

module.exports = strategy;