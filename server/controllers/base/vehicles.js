var _ = require('lodash');
var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Vehicles = function(options) {
  var self = this;
  self.options = options;
  logger.debug('OPTINS:', options);
  self.databaseUrl = process.env.DATABASE_URL || options.databaseUrl;
  self.name = 'base';
};

Vehicles.prototype.Get = function(callback) {
  return callback(undefined, defaultResponse);
};

Vehicles.prototype.GetByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

Vehicles.prototype.Save = function(vehicle, callback) {
  return callback(undefined, defaultResponse);
};

Vehicles.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = Vehicles;
