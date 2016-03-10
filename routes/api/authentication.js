'use strict';

var Boom = require('Boom');

exports.register = function (server, options, next) {
  server.route([
    {
      method: ['GET', 'POST'],
      path: '/auth/twitter',
      config: {
        auth: 'twitter',
        handler: function (request, reply) {
          if (!request.auth.isAuthenticated) {
            return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
          }

          request.cookieAuth.set({session: request.auth.credentials.profile});
          return reply.redirect('/');
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'authentication-route', // Must be unique
  version: '1.0.0'
};