'use strict';

function AboutController() {}

// [GET] /
AboutController.prototype.about = function (request, reply) {
  // Render the view with the custom greeting
  var data = {
    title: 'Oh Hai! - About'
  };

  return reply.view('about', data);
};

module.exports = AboutController;