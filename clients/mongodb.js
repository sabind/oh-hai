'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var conf = require('../config/config');

var mongoOptions = {
  server: {
    poolSize: 10,
    socketOptions: {
      keepAlive: 1
    }
  }
};

mongoose.connect(conf.get('mongoLabUri'), mongoOptions);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('connected', console.error.bind(console, 'MongoDB connection established'));
db.on('disconnected', console.error.bind(console, 'MongoDB connection terminated by MongoDB'));

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});