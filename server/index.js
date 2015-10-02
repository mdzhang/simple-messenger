var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var logger         = require('morgan');
var flash          = require('connect-flash');
var passport       = require('passport');

// ----------------------------------------
// server instantiation and config
// ----------------------------------------
var app = express();
var publicDir = __dirname + '/../public';

app.use(express.static(publicDir));
// app.use(favicon(publicDir + '/favicon.png'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// session storage
// ----------------------------------------
app.use(session({
  secret: 'AonDor',
  saveUninitialized: true,
  resave: true
}));


// ----------------------------------------
// logs
// ----------------------------------------
app.use(logger('dev'));
app.use(flash());


// ----------------------------------------
// database
// ----------------------------------------
require('./config/db');


// ----------------------------------------
// views
// ----------------------------------------
app.set('views',  __dirname + '/views');
app.set('view engine', 'jade');


// ----------------------------------------
// auth (passport)
// ----------------------------------------
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


// ----------------------------------------
// routes
// ----------------------------------------
app.use('/', require('./routes'));


// ----------------------------------------
// server start
// ----------------------------------------
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Simple messenger listening on port ' + port);


module.exports = app;