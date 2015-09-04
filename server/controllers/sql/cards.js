var util = require('util');
var ctrlBase = require('../base/cards');
var pg = require('pg');

// TODO: This is terrible; dont do this. 
var SELECT_ALL = 'SELECT * from swfc.cards ORDER BY "firstName";';
var SELECT_BY_ID = 'SELECT * FROM swfc.cards WHERE id = $1;'
var INSERT = 'INSERT INTO swfc.cards("firstName", description, cost, baseattack, ' +
  'basedefense, accuracy, evade, price, "attackPattern", gender, nickname, stars, '+
  'range, side, maxlevel, attacksperturn, skill, supportability, isjunkyardexclusive, '+
  '"lastName") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);';

var Cards = function(options) {
  var self = this;
  Cards.super_.call(self, options); // Call the base init
  self.name = 'postgres';
};
util.inherits(Cards, ctrlBase);

Cards.prototype.Get = function(callback) {
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

Cards.prototype.GetByID = function(id, callback) {
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

Cards.prototype.Save = function(obj, callback) {
  var self = this;
  var output; 

  pg.connect(self.databaseUrl, function(err, client, done) {
    if(err) {
      logger.error('Unexpected error connecting to db.', err);

      return callback(err);
    }
    
    client
       .query(INSERT, self.GetCreateParams(obj))
      .on('row', function(row) {
        output = row;
      })
      .on('end', function() {
        client.end.bind(client);

        return callback(undefined, output);
      });
  });
};

Cards.prototype.GetCreateParams = function(obj) {
  return [
    obj.firstName,
    obj.description || null,
    obj.cost,
    obj.baseAttack,
    obj.baseDefense,
    obj.accuracy,
    obj.evade,
    obj.price,
    obj.attackPattern,
    obj.gender.toUpperCase(),
    obj.nickname || null,
    obj.stars,
    obj.range.toUpperCase(),
    obj.side.toUpperCase(),
    obj.maxLevel,
    obj.attacksPerTurn || -1,
    obj.skill || null,
    obj.supportability || -1,
    obj.isjunkyardexclusive || false,
    obj.lastName
    ];
}

module.exports = Cards;
