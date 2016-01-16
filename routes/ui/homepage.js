'use strict';
var HomePageController = require('../../controllers/ui/homePage');

exports.register = function (server, options, next) {
  var homePageController = new HomePageController();
  server.bind(homePageController);

  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        handler: homePageController.homePage
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'ui-homepage-route',
  version: '1.0.0'
};