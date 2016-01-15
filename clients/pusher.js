var Pusher = require('pusher');
var config = require('../config/config');

modules.export = new Pusher({
  appId: config.get('pusher').get('appId'),
  key: config.get('pusher').get('appKey'),
  secret: config.get('pusher').get('appSecret')
});