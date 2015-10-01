var config = {};

config.env = 'development';
config.host = 'http://localhost:8080';

config.auth = {};

config.auth.github = {
  clientID: 'b8129bda378e487e84f8',
  clientSecret: 'c70a8e3304cf7fb807eee94d01f5ce60f11cd614',
  callbackURL: 'http://127.0.0.1:8080/auth/github/callback'
};

config.auth.google = {
  clientID: '549143509739-96p3svhavujrnnu81nni9mvuu1tr3qqd.apps.googleusercontent.com',
  clientSecret: 'bZaLrATvYm32-sT3Q7RWNyAF',
  callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
};

module.exports = config;