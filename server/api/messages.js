var models = require('../lib/models');
var _ = require('lodash');

var create = function(req, res, next) {
  models.Message.createBy(req.body, req.user)
    .then(function(message) {
      res.json(message);
    }, next);
};

var list = function(req, res, next) {
  // TODO: get these with virtuals
  models.Message.find({}).populate('created_by').exec()
    .then(function(messages) {
      res.json(messages);
    }, next);
};

var poll = function(req, res, next) {
  models.Message.addBusListener(res);
};

module.exports = {
  create: create,
  list: list,
  poll: poll
};