'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _systemId: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

userSchema.statics.checkPassword = function (email, password, dbUser, callback) {
  bcrypt.compare(password, dbUser.password, function(err, result) {
    if (err || !result) {
      callback(err, result);
    } else {
      callback(null, true);
    }
  })
};

userSchema.statics.createUser = function(user, callback) {
  var self = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return callback(err);
    } else {
      user.password = hash;

      var createUser = self.create(user);
      createUser.then(function (created) {
        var toClient = created.toObject();
        delete toClient.password;

        return callback(null, toClient);
      }, function (dbErr) {
        return callback(dbErr);
      });
    }
  });
};

userSchema.statics.getList = function (options, pagination, callback) {
  this.find(options, {}, pagination).exec(function (error, result) {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

var userModel = mongoose.model('User', userSchema);

module.exports = {
  Model: userModel,
  Schema: userSchema
};