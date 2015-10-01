var DT = require('../DT');

var m = DT.getBaseModel('user');

m.fields = {
  id:                 DT.CustomFields.id,
  created_at:         DT.CustomFields.created_at,
  first_name:         { type: String },
  last_name:          { type: String },
  email:              { type: String },
  username:           { type: String },
  provider:           {
                        type: String,
                        enum: [
                          'github',
                          'google'
                        ]
                      }
};

m.getterMethods = {
  name: function() {
    return this.first_name + ' ' + this.last_name;
  }
};

module.exports = DT.buildModel(m);