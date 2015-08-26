var util = require('util');
var ctrlBase = require('../base/vehicles');
var pg = require('pg');

var SELECT_ALL = 'SELECT * FROM swfc.vehicles;';

var Vehicles = function(options) {
  var self = this;
  Vehicles.super_.call(self, options); // Call the base init
  self.name = 'postgres';
};

util.inherits(Vehicles, ctrlBase);

Vehicles.prototype.GetByID = function(id, callback) {
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

module.exports = Vehicles;
