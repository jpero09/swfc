var util = require('util');
var ctrlBase = require('../base/cards');
var pgHelper = require('./_pgHelper');

// TODO: This is terrible; dont do this.
var SELECT_ALL = 'SELECT * from swfc.cards ORDER BY "firstName";';
var SELECT_BY_ID = 'SELECT * FROM swfc.cards WHERE id = $1;';
var INSERT = 'INSERT INTO swfc.cards(id, "firstName", description, cost, baseattack, ' +
  'basedefense, accuracy, evade, price, "attackPattern", gender, nickname, stars, ' +
  'range, side, maxlevel, attacksperturn, skill, supportability, isjunkyardexclusive, ' +
  '"lastName") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,' +
  ' $14, $15, $16, $17, $18, $19, $20, $21);';

var Cards = function(options) {
  var self = this;
  Cards.super_.call(self, options); // Call the base init
  self.name = 'postgres';
};
util.inherits(Cards, ctrlBase);

Cards.prototype.Get = function(callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, SELECT_ALL, [], callback);
};

Cards.prototype.GetByID = function(id, callback) {
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

Cards.prototype.Save = function(obj, callback) {
  var self = this;
  pgHelper.query(self.databaseUrl, INSERT, self.GetCreateParams(obj, true), callback);
};

Cards.prototype.GetCreateParams = function(obj, isCreate) {
  var output;
  output = [
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
    obj.lastName];

  if(isCreate) { output.splice(0, 0, obj.id); }

  return output;
};

module.exports = Cards;
