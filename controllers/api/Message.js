'use strict';
var Boom = require('boom');
var pusher = require('../../clients/pusher');

function MessageController() {}

// [POST] /messages
MessageController.prototype.pushMessage = function (request, reply) {
  var message = request.payload;

  pusher.trigger(message.room, 'chat_message', {message: message.body}, null, function(err, socketRequest, socketResponse) {
    if (!err) {
      return reply(message).created('');
    }
  });
};

module.exports = MessageController;