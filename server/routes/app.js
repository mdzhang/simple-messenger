var express = require('express');
var router = express.Router();
var decorators = require('../lib/decorators');

var auth = decorators.requiresLogin;

router.use('*', auth);

router.use('*', function(req, res, next) {
  var templateData = {
    user: req.user
  };

  res.render('index.jade', templateData);
});

module.exports = router;