var util = require('util');
var ctrlBase = require('../base/parts');
var pgHelper = require('./_pgHelper');

// TODO: This is terrible; dont do this.
var VEHICLES_COLS = 'v.id, v.name, v."build_time", v."build_price", v.cost, v.accuracy, v.evade, ' +
  'v."base_attack", v."base_defense", v."attacks_per_turn", v."attack_pattern", v."number_pilots", ' +
  'v."number_copilots", v."law_vehicle", v."x_size", v."y_size", v.price, ' +
  'v.parts, v.description';
var SELECT_ALL = 'select * from swfc.parts ORDER BY name;';
var SELECT_BY_ID = 'SELECT * FROM swfc.parts WHERE id = $1;';
var SELECT_VEHICLES = 'SELECT ' + VEHICLES_COLS + ' FROM swfc.vehicles v LEFT JOIN swfc."vehicle_parts"' +
  ' vp on vp.vehicleid = v.id WHERE vp.partid = $1;';

var Parts = function(options) {
  Parts.super_.call(this, options); // Call the base init
};
util.inherits(Parts, ctrlBase);

Parts.prototype.Get = function(callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, SELECT_ALL, [], callback);
};

Parts.prototype.GetByID = function(id, callback) {
  var self = this;
  var output;
  pgHelper.query(self.databaseUrl, SELECT_BY_ID, [id], function(err, results) {
    if(err) { return callback(err); }
    if(!results) {
      output = {httpCode: 404, message: 'Unable to find ' + self.object + ' with ID of ' + id};
    }
    else {
      output = results[0];
    }

    return callback(undefined, output);
  });
};

Parts.prototype.GetVehicles = function(id, callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, SELECT_VEHICLES, [id], callback);
};

module.exports = Parts;
