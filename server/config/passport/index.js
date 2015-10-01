var passport = require('passport');
var models = require('../../lib/models');

// only store a user's id on the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// find user by session user_id and store on req.user
passport.deserializeUser(function(user_id, done) {
  models.User.get(user_id, function(err, user) {
    done(err, user);
  });
});

passport.use(require('./github'));
passport.use(require('./google'));