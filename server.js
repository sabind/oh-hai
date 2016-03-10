'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var config = require('./config/config');
var pjson = require('./package.json');

var server = new Hapi.Server();

server.connection({
  port: config.get('port'),
  routes: {
    cors: true
  }
});

// Library for logging requests, OS output, and errors.
var goodOptions = {
  opsInterval: 15000,
  reporters: [{
    reporter: require('good-console'),
    events: {log: '*', response: '*', ops: '*', err: '*'}
  }]
};

var swaggerOptions = {
  apiVersion: pjson.version,
  authorizations: {
    'apiKey': {
      type: 'apiKey',
      passAs: 'header',
      keyname: 'Authorization'
    }
  },
  info: {
    title: pjson.name,
    description: pjson.description,
    contact: pjson.author,
    license: pjson.license
  }
};

var healthyOptions = {
  env: config.get('env'),
  name: pjson.name,
  version: pjson.version,
  path: '/health',
  test: {
    node: [
      function (cb) {
        switch (require('mongoose').connection.readyState) {
          case 0:
            return cb(true, 'Mongo servers: DISCONNECTED');
          case 1:
            return cb(null, 'Mongo servers: CONNECTED');
          case 2:
            return cb(null, 'Mongo servers: CONNECTING');
          case 3:
            return cb(true, 'Mongo servers: DISCONNECTING');
          default:
            return cb(true, 'Mongo servers: UNKNOWN');
        }
      }
    ]
  }
};

var plugins = [
  {register: require('inert')},
  {register: require('vision')},
  {register: require('./routes/public')},
  {register: require('./routes/ui/homePage')},
  {register: require('./routes/ui/about')},
  {register: require('./routes/ui/help')},
  {register: require('./routes/api/authentication')},
  {register: require('./routes/api/messages')},
  {register: require('good'), options: goodOptions},
  {register: require('hapi-swagger'), options: swaggerOptions},
  {register: require('hapi-and-healthy'), options: healthyOptions}
];

server.register([require('hapi-auth-cookie'), require('bell')], function (err) {
  Hoek.assert(!err, err);

  //Setup the session strategy
  server.auth.strategy('session', 'cookie', {
    password: 'secret_cookie_encryption_password', //Use something more secure in production
    cookie: 'session',
    redirectTo: '/auth/twitter', //If there is no session, redirect here
    isSecure: false //Should be set to true (which is the default) in production
  });

  //Setup the social Twitter login strategy
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'secret_cookie_encryption_password', //Use something more secure in production
    clientId: '0C2Ag5Tai4mMhYIg6q04iZDs7',
    clientSecret: 'MfzwYzAtR69y9fjkfsyhTCB0fgCvsZ86qOjsbZTPoYxX3sSbfW',
    isSecure: false //Should be set to true (which is the default) in production
  });

  server.register(plugins, function (err) {
    Hoek.assert(!err, err);

    server.views({
      engines: {
        html: require('handlebars')
      },
      path: 'views',
      layoutPath: 'views/layout',
      layout: 'default',
      helpersPath: 'views/helpers',
      partialsPath: 'views/partials'
    });

    if (!module.parent) {
      require('./clients/mongodb');
      require('./clients/pusher');

      server.start(function () {
        console.info('Server started at ' + server.info.uri);
      });
    }
  });
});

module.exports = server;