var util = require('util');
var ctrlBase = require('../base/cards');

var Vehicles = function(options) {
  Vehicles.super_.call(this, options); // Call the base init
};
util.inherits(Vehicles, ctrlBase);

module.exports = Vehicles;