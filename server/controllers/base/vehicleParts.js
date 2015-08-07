var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var VehicleParts = function(options) {
  var me = this;
  me.options = options;
};

VehicleParts.prototype.GetByID = function(callback) {
	return callback(undefined, defaultResponse);
};

module.exports = VehicleParts;