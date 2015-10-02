var mongoose = require('mongoose');
var passport = require('passport');
var models = require('../../lib/models');
var config = require('../../config');

var GitHubStrategy = require('passport-github2').Strategy;

var strategy = new GitHubStrategy(config.auth.github, function(accessToken, refreshToken, profile, done) {
  models.User.findOne({ provider_id: profile.id }).exec()
    .then(function(user) {
      // If we couldn't find the user, create and save a new one.
      if (!user) {
        var data = {
          email: profile.emails[0].value,
          username: profile.login,
          provider: 'github',
          provider_id: profile.id
        };

        return new models.User.create(data, done);
      } else {
        return done(null, user);
      }
    });
});

module.exports = strategy;