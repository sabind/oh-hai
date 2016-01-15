var xss = require('xss');
var _ = require('lodash');

function cleanXss(dirtyObject) {
  if (typeof dirtyObject === 'string') {
    return xss(dirtyObject);
  } else if (dirtyObject instanceof Array) {
    _.map(dirtyObject, function(dirtyValue) {
      return xss(dirtyValue);
    })
  } else if (dirtyObject instanceof Object) {
    _.forEach(dirtyObject, function(dirtyValue, dirtyKey) {
      dirtyObject[dirtyKey] = xss(dirtyValue);
    });
    return dirtyObject;
  } else {
    return dirtyObject;
  }
}

modules.export = cleanXss;
