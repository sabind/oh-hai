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
  }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile(['./config/' + env + '.json', './config/default.json']);

// Perform validation
conf.validate({strict: true});

module.exports = conf;