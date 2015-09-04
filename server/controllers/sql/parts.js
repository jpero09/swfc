var util = require('util');
var ctrlBase = require('../base/parts');
var pg = require('pg');

var SELECT_ALL = 'select * from swfc.parts ORDER BY name;';
var SELECT_BY_ID = 'SELECT * FROM swfc.parts WHERE id = $1;';
var SELECT_VEHICLES = 'SELECT * FROM swfc.vehicles v LEFT JOIN swfc."vehicleParts"' +
  ' vp on vp.partid = v.id WHERE vp.partid = $1;';

var Parts = function(options) {
  Parts.super_.call(this, options); // Call the base init
};
util.inherits(Parts, ctrlBase);

Parts.prototype.Get = function(callback) {
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

Parts.prototype.GetByID = function(id, callback) {
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

Parts.prototype.GetVehicles = function(id, callback) {
  var self = this;
  var output = [];

  pg.connect(self.databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }

    client
      .query(SELECT_VEHICLES, [id])
      .on('row', function(row) {
        output.push(row);
      })
      .on('end', function() {
        client.end.bind(client);

        return callback(undefined, output);
      });
  });
};

module.exports = Parts;
