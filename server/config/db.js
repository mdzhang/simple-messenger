var mongoose = require('mongoose');

var db = {
  url: "mongodb://mdzhang:mz1213@ds051903.mongolab.com:51903/simple-messenger"
};

// Connect to the underlying db.
var connect = function() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  mongoose.connect(db.url, options);
};

connect();

// Print to console when we connect to the database successfully.
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + db.url);
});

// Print to the console if we encounter any db connection errors.
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// Try to reconnect when the connection is lost.
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
  connect();
});