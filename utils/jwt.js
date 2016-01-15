'use strict';

var User = require('../models/user');
var userModel = User.Model;

var validateUser = function(decoded, request, callback) {
  if (decoded.application === 'sra') {
    return callback(null, true);
  }

  var user = {
    '_id': decoded._id
  };

  userModel.findOne(user, function(err, result) {
    if (err) {
      return callback(null, false);
    } else if (result) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  })
};

module.exports = {
  validateUser: validateUser
};