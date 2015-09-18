var util = require('util');
var ctrlBase = require('./_baseController');
var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Vehicles = function(options) {
  var self = this;
  Vehicles.super_.call(self, options); // Call the base init
  self.object = 'vehicle';
  self.model = require('./../../models/vehicle');
};
util.inherits(Vehicles, ctrlBase);

Vehicles.prototype.GetParts = function(id, callback) {
  return callback(undefined, defaultResponse);
};

Vehicles.prototype.GetPilots = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = Vehicles;
