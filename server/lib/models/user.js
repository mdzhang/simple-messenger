var DT = require('../DT');

var m = DT.getBaseModel('user');

m.fields = {
  created_at:         DT.CustomFields.created_at,
  first_name:         { type: DT.Types.STRING },
  last_name:          { type: DT.Types.STRING },
  // TODO: required
  email:              { type: DT.Types.STRING },
  username:           { type: DT.Types.STRING },
  provider:           {
                        type: DT.Types.STRING,
                        enum: [
                          'github',
                          'google'
                        ]
                      },
  provider_id:        { type: DT.Types.STRING },
};

m.getterMethods = {
  name: function() {
    var name = _.compact([this.first_name, this.last_name]).join(' ');

    if (_.isEmpty(name)) {
      name = this.username;
    }

    if (_.isEmpty(name)) {
      name = this.email;
    }

    return name;
  }
};

module.exports = DT.buildModel(m);