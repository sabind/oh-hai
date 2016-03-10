'use strict';
var HelpController = require('../../controllers/ui/help');

exports.register = function (server, options, next) {
  var helpController = new HelpController();
  server.bind(helpController);

  server.route([
    {
      method: 'GET',
      path: '/help',
      config: {
        auth: 'session',
        handler: helpController.help
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'ui-help-route',
  version: '1.0.0'
};