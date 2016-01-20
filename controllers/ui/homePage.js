'use strict';

function HomePageController() {}

// [GET] /
HomePageController.prototype.homePage = function (request, reply) {
  // Render the view with the custom greeting
  var data = {
    title: 'Oh Hai!'
  };

  return reply.view('index', data);
};

module.exports = HomePageController;