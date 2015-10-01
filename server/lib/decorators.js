// Call before allowing a user to make any calls where they must be authenticated.
var requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

module.exports = {
  requiresLogin: requiresLogin
};