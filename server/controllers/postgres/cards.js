var util = require('util');
var ctrlBase = require('../base/cards');
var pgHelper = require('./_pgHelper');

// TODO: This is terrible; dont do this.
var SELECT_ALL = 'SELECT * from swfc.cards ORDER BY rarity desc, name;';
var SELECT_BY_ID = 'SELECT * FROM swfc.cards WHERE id = $1;';
var INSERT = 'INSERT INTO swfc.cards(id, name, description, cost, attack, ' +
  'defense, accuracy, evade, price, attack_pattern, gender, nickname, rarity, ' +
  'range, side, max_level, attacks_per_turn, skill_id, support_id, is_junkyard_exclusive, ' +
  'hp, appear_date, is_healer, is_repairer, is_stun, race) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,' +
  ' $9, $10, $11, $12, $13,' +
  ' $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26);';
var INSERT_SKILL = 'INSERT INTO swfc.skills(id, name, description, max_level) VALUES ($1, $2, $3, $4);';

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

  if(obj.skill) {
    pgHelper.query(self.databaseUrl, INSERT_SKILL, self.GetSkillParams(obj.skill, true), function(skillErr, skill) {
      if(skillErr) { logger.error('Unexpected error saving skill:', skillErr); }
      pgHelper.query(self.databaseUrl, INSERT, self.GetCardParams(obj, true), callback);
    });
  }
  else {
    pgHelper.query(self.databaseUrl, INSERT, self.GetCardParams(obj, true), callback);
  }
};

Cards.prototype.GetSkillParams = function(skill) {
  var output = [
    skill.id,
    skill.name,
    skill.description || null,
    skill.maxLevel
  ];

  return output;
};

Cards.prototype.GetCardParams = function(obj, isCreate) {
  var output = [
    obj.name,
    obj.description || null,
    obj.cost,
    obj.attack,
    obj.defense,
    obj.accuracy,
    obj.evade,
    obj.price,
    obj.attackPattern,
    obj.gender ? obj.gender.toUpperCase() : null,
    obj.nickname || null,
    obj.rarity,
    obj.range.toUpperCase(),
    obj.side.toUpperCase(),
    obj.maxLevel,
    obj.attacksPerTurn || null,
    (obj.skill) ? obj.skill.id : null,
    obj.supportID || null,
    !!obj.isJunkyardExclusive,
    obj.hp,
    obj.appearDate,
    !!obj.isHealer,
    !!obj.isRepairer,
    !!obj.isStun,
    obj.race];

  if(isCreate) { output.splice(0, 0, obj.id); }

  return output;
};

module.exports = Cards;
