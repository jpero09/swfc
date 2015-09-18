var pg = require('pg');

var pgHelper = function() {};

var query = function(databaseUrl, query, args, callback) {
  var output = [];
  pg.connect(databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }

    client
      .query(query, args)
      .on('row', function(row) {
        output.push(row);
      })
      .on('error', function(error) {
        client.end.bind(client);
        done();

        return callback(error);
      })
      .on('end', function() {
        client.end.bind(client);
        done();

        return callback(undefined, output);
      });
  });
};

// Exports:
module.exports.query = query;
