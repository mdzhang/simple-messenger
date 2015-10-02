var express = require('express');
var router = express.Router();
var passport = require('passport');
var decorators = require('../lib/decorators');

// client app routes
router.get('/', require('./app'));
router.use('/messages*', require('./app'));

// api routes
router.use('/api', require('./api'));

// ----------------------------------------
// user login/logout
// ----------------------------------------
router.get('/login', function(req, res, next) {
  res.render('login.jade');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/logged-out');
});

router.get('/logged-out', function(req, res, next) {
  res.render('logged-out.jade');
});

// oauth logins
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;