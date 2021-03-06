var util = require('util');
var ctrlBase = require('../base/vehicles');
var pgHelper = require('./_pgHelper');

// TODO: This is terrible; dont do this.
var PARTS_COLS = 'p.id, p.name, p.description, p.cost, p.attack, p.defense, p.hp,' +
  'p.accuracy, p.evade, p.price, p.attack_pattern';
var SELECT_ALL = 'SELECT * from swfc.vehicles ORDER BY name;';
var SELECT_BY_ID = 'SELECT * FROM swfc.vehicles WHERE id = $1;';
var SELECT_PARTS = 'SELECT ' + PARTS_COLS + ' FROM swfc.parts p LEFT JOIN swfc."vehicle_parts"' +
  ' vp on vp.partid = p.id WHERE vp.vehicleid = $1;';

var Vehicles = function(options) {
  var self = this;
  Vehicles.super_.call(self, options); // Call the base init
  self.name = 'postgres';
};

util.inherits(Vehicles, ctrlBase);

Vehicles.prototype.Get = function(callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, SELECT_ALL, [], function(err, results) {
    return callback(err, Vehicles.prototype.ConvertObjects.call(self, results));
  });
};

Vehicles.prototype.GetByID = function(id, callback) {
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

Vehicles.prototype.GetParts = function(id, callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, SELECT_PARTS, [id], callback);
};

module.exports = Vehicles;
