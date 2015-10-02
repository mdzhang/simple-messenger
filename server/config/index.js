var config = {};

config.env = 'development';
config.host = 'http://localhost:8080';

config.auth = {};

config.auth.github = {
  clientID: '7fdb690145028e053cbc',
  clientSecret: '485983c2718cf70ba0776a376c881011c6140d25',
  callbackURL: 'http://localhost:8080/auth/github/callback'
};

config.auth.google = {
  clientID: '549143509739-96p3svhavujrnnu81nni9mvuu1tr3qqd.apps.googleusercontent.com',
  clientSecret: 'bZaLrATvYm32-sT3Q7RWNyAF',
  callbackURL: 'http://localhost:8080/auth/google/callback'
};

module.exports = config;