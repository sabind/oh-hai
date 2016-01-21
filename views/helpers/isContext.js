var _ = require('lodash');

function isContext(option, viewdata) {
  var currentContext = viewdata.data.root.context;

  if (!_.isString(currentContext)) {
    return viewdata.inverse(this);
  }

  if (_.isEqual(currentContext, option)) {
    return viewdata.fn(this);
  }

  return viewdata.inverse(this);
}

module.exports = isContext;