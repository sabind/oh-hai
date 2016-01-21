var convict = require('convict');

// Define a schema
var conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  mongoLabUri: {
    doc: 'The MongoDB URL.',
    format: '*',
    default: 'mongodb://localhost:27017/ohhai',
    env: 'MONGO_LAB_URL'
  },
  jwtKey: {
    doc: 'The key for encrypting the JWT',
    format: '*',
    default: '',
    env: 'JWT_KEY'
  },
  pusher: {
    id: {
      doc: 'The Pusher App Id',
      format: '*',
      default: '172819',
      env: 'PUSHER_APP_ID'
    },
    key: {
      doc: 'The Pusher App Key',
      format: '*',
      default: '3a3c2397786ded7d42aa',
      env: 'PUSHER_APP_KEY'
    },
    secret: {
      doc: 'The Pusher App Secret',
      format: '*',
      default: '5391e23d34dd374e708b',
      env: 'PUSHER_APP_SECRET'
    }
  }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile(['./config/' + env + '.json', './config/default.json']);

// Perform validation
conf.validate({strict: true});

module.exports = conf;