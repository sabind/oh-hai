'use strict';
var AboutController = require('../../controllers/ui/about');

exports.register = function (server, options, next) {
  var aboutController = new AboutController();
  server.bind(aboutController);

  server.route([
    {
      method: 'GET',
      path: '/about',
      config: {
        auth: 'session',
        handler: aboutController.about
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'ui-about-route',
  version: '1.0.0'
};