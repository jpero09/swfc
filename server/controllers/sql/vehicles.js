var util = require('util');
var ctrlBase = require('../base/vehicles');
var pg = require('pg');

var SELECT_ALL = 'SELECT * from swfc.vehicles ORDER BY name;';
var SELECT_BY_ID = 'SELECT * FROM swfc.vehicles WHERE id = $1;';
var SELECT_PARTS = 'SELECT * FROM swfc.parts p LEFT JOIN swfc."vehicleParts"' +
  ' vp on vp.partid = p.id WHERE vp.vehicleid = $1;';

var Vehicles = function(options) {
  var self = this;
  Vehicles.super_.call(self, options); // Call the base init
  self.name = 'postgres';
};

util.inherits(Vehicles, ctrlBase);

Vehicles.prototype.Get = function(callback) {
  var self = this;
  var output = [];

  pg.connect(self.databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }

    client
      .query(SELECT_ALL)
      .on('row', function(row) {
        output.push(row);
      })
      .on('end', function() {
        client.end.bind(client);

        return callback(undefined, output);
      });
  });
};

Vehicles.prototype.GetByID = function(id, callback) {
  var self = this;
  var output;

  pg.connect(self.databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }

    client
      .query(SELECT_BY_ID, [id])
      .on('row', function(row) {
        output = row;
      })
      .on('end', function() {
        client.end.bind(client);

        if(!output) {
          output = {httpCode: 404, message: 'Unable to find ' + self.object + ' with ID of ' + id};
        }

        return callback(undefined, output);
      });
  });
};

Vehicles.prototype.GetParts = function(id, callback) {
  var self = this;
  var output = [];

  pg.connect(self.databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }

    client
      .query(SELECT_PARTS, [id])
      .on('row', function(row) {
        output.push(row);
      })
      .on('end', function() {
        client.end.bind(client);

        return callback(undefined, output);
      });
  });
};

module.exports = Vehicles;
