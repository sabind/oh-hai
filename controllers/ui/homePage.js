'use strict';

function HomePageController() {}

// [GET] /
HomePageController.prototype.homePage = function (request, reply) {
  // Render the view with the custom greeting
  var data = {
    title: 'This is Index!',
    message: 'Hello, World. You crazy handlebars layout'
  };

  return reply.view('index', data);
};

module.exports = HomePageController;