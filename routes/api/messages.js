'use strict';

var Joi = require('joi');
var cors = require('../../utils/cors');

var MessageController = require('../../controllers/api/Message');
var messageValidation = require('../../validations/message');

exports.register = function (server, options, next) {
  var messageController = new MessageController();
  server.bind(messageController);

  server.route([
    {
      method: 'POST',
      path: '/messages',
      config: {
        handler: messageController.pushMessage,
        validate: {
          payload: messageValidation.post.required()
        },
        description: 'Push new messages.',
        tags: ['api', 'messages', 'push'],
        cors: cors
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'message-route', // Must be unique
  version: '1.0.0'
};