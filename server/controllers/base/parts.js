var util = require('util');
var ctrlBase = require('./baseModel');
var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Parts = function(options) {
  var self = this;
  Parts.super_.call(self, options); // Call the base init
  self.object = 'part';
};
util.inherits(Parts, ctrlBase);

Parts.prototype.GeVehicles = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = Parts;
