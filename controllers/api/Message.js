'use strict';
var Boom = require('boom');
var pusher = require('../../clients/pusher');

function MessageController() {
}

// [POST] /messages
MessageController.prototype.pushMessage = function (request, reply) {
  var message = request.payload;
  var twitterProfile = request.auth.credentials.session.raw;

  pusher.trigger(message.room, 'chat_message', {
    image: twitterProfile.profile_image_url_https,
    name: twitterProfile.name,
    message: message.body,
    at: Date.now()
  }, null, function (err, socketRequest, socketResponse) {
    if (!err) {
      return reply(message).created('');
    }
  });
};

module.exports = MessageController;