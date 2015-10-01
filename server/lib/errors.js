function defineError(name, status) {

  var Err = function(msg, data) {
    Error.captureStackTrace(this, this.constructor);
    this.name = name;
    this.message = msg;
    this.data = data;
    this.status = status;
  };

  Err.prototype = Object.create(Error.prototype);
  Err.prototype.name = name;
  Err.prototype.message = name;

  module.exports[name] = Err;
}

defineError('IllegalArgumentError', 400);