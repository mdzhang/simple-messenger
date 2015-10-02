var DT = require('../DT');
var models = require('./index');

var m = DT.getBaseModel('message');

m.fields = {
  created_at:         DT.CustomFields.created_at,
  created_by:         {
                        type: DT.Types.ID,
                        ref: 'user'
                      },
  note:               { type: DT.Types.STRING }
};

m.classMethods.createBy = function(messageData, user) {
  messageData.created_by = user;
  return models.Message.create(messageData);
};

module.exports = DT.buildModel(m);
