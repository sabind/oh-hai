var _ = require('lodash');
var conf = require('../../config/config');

module.exports = function (context) {
  if (_.isEmpty(context)) {
    return context.inverse(this);
  }

  var env = conf.get('env');

  if (env !== 'production') {
    return context.fn(this);
  }

  return context.inverse(this);
};