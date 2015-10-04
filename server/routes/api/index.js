var express = require('express');
var router = express.Router();
var decorators = require('../../lib/decorators');
var api = require('../../api');

var auth = decorators.requiresLogin;

// ----------------------------------------
// messages
// ----------------------------------------
router.post('/messages/create', api.messages.create);
router.get('/messages/list', api.messages.list);
router.get('/messages/poll', api.messages.poll);

module.exports = router;