var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Vehicles = function(options) {
  var me = this;
  me.options = options;
};

Vehicles.prototype.GetByID = function(callback) {
  return callback(undefined, defaultResponse);
};

module.exports = Vehicles;
