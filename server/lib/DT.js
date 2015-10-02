var _ = require('lodash');
var errors = require('./errors');
var mongoose = require('mongoose');
var uid = require('uid');

var CustomFields = {
  id: {
    type: String,
    default: uid(24)
  },
  created_at: {
    type: Date,
    default: Date.now
  }
};

var addCustomFuncsToModel = function(schema) {
  schema.get = function(id) {
    console.log('get ', id)
    return schema.findOne({ id: id });
  };

  // schema.create = function(modelJson, cb) {
  //   var model = new schema(data);

  //   if (cb) {
  //     return model.save(cb);
  //   } else {
  //     return model.save();
  //   }
  // };

  return schema;
};

var getBaseModel = function(name) {
  if (!name) {
    throw new errors.IllegalArgumentError('buildModel requires a valid model name');
  }

  return {
    name: name,
    fields: {},
    getterMethods: {},
    setterMethods: {},
    classMethods: {},
    instanceMethods: {}
  };
};

/**
 * Create a model according to the underlying ORM/ODM from the given base model.
 *
 * @param  {Object} baseModel see return value of DT.getBaseModel()
 * @return {mongoose Model} mongoose model created from the base model
 */
var buildModel = function(baseModel) {
  var schema = new mongoose.Schema(baseModel.fields);
  schema.methods = baseModel.instanceMethods;
  schema.statics = baseModel.classMethods;

  _.each(baseModel.getterMethods, function(method, name) {
    schema.virtual(name).get(method);
  });

  _.each(baseModel.setterMethods, function(method, name) {
    schema.virtual(name).set(method);
  });

  var dtModel = mongoose.model(baseModel.name, schema);
  dtModel = addCustomFuncsToModel(dtModel);

  return dtModel;
};

module.exports = {
  getBaseModel: getBaseModel,
  buildModel: buildModel,
  CustomFields: CustomFields
};