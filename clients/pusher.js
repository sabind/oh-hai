var Pusher = require('pusher');
var config = require('../config/config');

var pusher = new Pusher({
  appId: config.get('pusher').id,
  key: config.get('pusher').key,
  secret: config.get('pusher').secret,
  encrypted: true
});

pusher.port = 443;

module.exports = pusher;