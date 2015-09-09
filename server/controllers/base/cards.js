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
  output.attacksPerTurn = 1;
  output.attack = parseInt(card.attack);
  output.defense = parseInt(card.defence);
  output.cost = parseInt(card.cost);
  output.evade = parseInt(card.avoid);
  output.gender = 'M';
  output.maxLevel = parseInt(card.max_level);
  output.price = parseInt(card.price);
  output.range = (card.range) ? card.range.substring(0,1) : 'M';
  output.rarity = parseInt(card.rarity);
  output.description = card.comment;
  output.isJunkyardExclusive = false;
  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  if(card.attribute === '1') { output.side = 'L'; }
  if(card.attribute === '2') { output.side = 'D'; }

  var nickNameIndex = card.name.indexOf('[');
  if(nickNameIndex >= 0) {
    output.name = card.name.substring(0, nickNameIndex - 1);
    output.nickname = card.name.substring(nickNameIndex + 1, card.name.length - 1);
  }
  else {
    output.name = card.name;
  }

  // TODO: Outdated fields,
  output.stars = output.rarity;
  output.baseAttack = output.attack;
  output.baseDefense = output.defense;
  output.firstName = output.name;

  return output;
};

module.exports = Cards;
