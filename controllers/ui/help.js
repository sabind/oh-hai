'use strict';

function HelpController() {}

// [GET] /
HelpController.prototype.help = function (request, reply) {
  // Render the view with the custom greeting
  var data = {
    title: 'Oh Hai! - Help'
  };

  return reply.view('help', data);
};

module.exports = HelpController;