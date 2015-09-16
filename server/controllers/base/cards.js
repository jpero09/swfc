var util = require('util');
var _ = require('lodash');
var ctrlBase = require('./baseModel');

var Cards = function(options) {
  var self = this;
  Cards.super_.call(self, options); // Call the base init
  self.object = 'card';
};
util.inherits(Cards, ctrlBase);

// Take json from SWFC and converts to our format.
Cards.prototype.convert = function(card) {
  var output = {};
  if(!card) { return undefined; }

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  output.id = parseInt(card.card_id);
  output.accuracy = parseInt(card.accuracy);
  output.appearDate = card.appear_date;
  output.attacksPerTurn = parseInt(card.per_num);
  output.attack = parseInt(card.attack);
  output.cost = parseInt(card.cost);
  output.defense = parseInt(card.defence);
  output.description = card.comment;
  output.evade = (card.avoid) ? parseInt(card.avoid) : 0;
  output.gender = 'M';
  output.hp = parseInt(card.max_hp);
  output.isHealer = !!card.is_healer;
  output.isJunkyardExclusive = false;
  output.isRepairer = !!card.is_repairer;
  output.isStun = !!card.is_stun;
  output.maxLevel = parseInt(card.max_level);
  output.price = parseInt(card.price);
  output.race = parseInt(card.race);
  output.range = (card.range) ? card.range.substring(0,1) : 'M';
  output.rarity = parseInt(card.rarity);

  if(card.attribute === '1') { output.side = 'L'; }
  else if(card.attribute === '2') { output.side = 'D'; }
  else { output.side = card.side; }

  // Skills
  output.skill = {
    id: card.skill_id,
    name: card.skill_name,
    description: card.skill_comment,
    maxLevel: card.skill_max_level
  };
  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var nickNameIndex = card.name.indexOf('[');
  if(nickNameIndex >= 0) {
    output.name = card.name.substring(0, nickNameIndex - 1);
    output.nickname = card.name.substring(nickNameIndex + 1, card.name.length - 1);
  }
  else {
    output.name = card.name;
  }

  return output;
};

module.exports = Cards;
