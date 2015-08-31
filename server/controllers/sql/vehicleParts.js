var util = require('util');
var ctrlBase = require('../base/vehicleParts');

var VehicleParts = function(options) {
  VehicleParts.super_.call(this, options); // Call the base init
};
util.inherits(VehicleParts, ctrlBase);

module.exports = VehicleParts;
