var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var VehicleParts = function(options) {
  var me = this;
  me.options = options;
};

VehicleParts.prototype.Get = function(callback) {
  return callback(undefined, defaultResponse);
};

VehicleParts.prototype.GetByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

VehicleParts.prototype.Save = function(vehicleParts, callback) {
  return callback(undefined, defaultResponse);
};

VehicleParts.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = VehicleParts;
