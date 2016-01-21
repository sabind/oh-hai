'use strict';

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'public-route',
  version: '1.0.0'
};