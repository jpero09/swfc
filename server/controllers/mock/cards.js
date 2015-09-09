var _ = require('lodash');
var util = require('util');
var Chance = require('chance');

var ctrlBase = require('../base/cards');

var chance = new Chance();
chance.mixin({
  skill: getRandomSkill,
  types: getRandomTypes,
  nickname: getRandomNickname,
  price: getRandomPrice,
  maxLevel: getRandomMaxLevel,
  supportAbility: getRandomSupportAbility,
  percentageBool: getPercentBool
});

var TYPES = ['Beast', 'Bounty Hunter', 'Clone', 'Droid', 'Empire', 'Ewok',
  'Galactic Republic', 'Gungan', 'Jabbas Crime Syndicate', 'Jedi', 'Nabooan', 'Pod Racer',
  'Rebel', 'Separatist', 'Sith', 'Tatooinian', 'Wookie'];

var NICKNAMES = ['Frenemy of the Republic', 'The Chosen One', 'The Fallen One', 'The Old One', 'The Relentless Hunter',
  'May the 4th Limited Edition', 'Assassin', 'Master of Stuff', 'Elusive Commander', 'Nerfherder for Hire',
  'The Original Warrior'];

var MockCards = function(options) {
  MockCards.super_.call(this, options); // Call the base init
};
util.inherits(MockCards, ctrlBase);

MockCards.prototype.GetByID = function(id, callback) {
  return callback(undefined, getMock(id));
};

MockCards.prototype.Get = function(callback) {
  var output = [];
  _.times(chance.integer({min: 20, max: 85}), function(n) {
    output.push(getMock(n));
  });

  return callback(undefined, output);
};

MockCards.prototype.Save = function(card, callback) {
  card.id = card.id || chance.integer();
  card.lastUpdated = new Date();
  return callback(undefined, card);
};

MockCards.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, {status: 'OK'});
};

// private methods
function getMock(id) {

  var output = {
    id: parseInt(id), //Lets pretend this doesnt need validated
    gender: chance.gender(),
    description: chance.paragraph({sentences: 3}),
    nickname: chance.nickname(),
    stars: chance.integer({min: 1, max: 5}),
    cost: chance.integer({min: 4, max: 35}),
    range: chance.character({pool: 'SML'}),
    side: chance.character({pool: 'LDN'}),
    types: chance.types(),
    maxLevel: chance.maxLevel(),
    accuracy: chance.integer({min: 80, max: 150}),
    evade: chance.integer({min: 40, max: 160}),
    baseAttack: chance.integer({min: 40, max: 1000}),
    baseDefense: chance.integer({min: 40, max: 1000}),
    attacksPerTurn: chance.integer({min: 1, max: 2}),
    attackPattern: 'TODO',
    skill: chance.skill(),
    price: chance.price(),
    supportAbility: chance.supportAbility(),
    isJunkyardExclusive: chance.percentageBool(.1)
  };

  var swName = getSWName(
    chance.first({gender: output.gender}),
    chance.last(),
    chance.last(),
    chance.city()
  );
  output = _.extend(output, swName);

  return output;
}

function getSWName(fName, lName, maidenName, birthCity) {
  var fNamePiece1 = (fName && fName.length >= 3) ? fName.substring(0, 3) : '';
  var fNamePiece2 = (lName && lName.length >= 2) ? lName.substring(0, 2) : '';

  var lNamePiece1 = (maidenName && maidenName.length >= 2) ? maidenName.substring(0, 2) : '';
  var lNamePiece2 = (birthCity && birthCity.length >= 3) ? birthCity.substring(0, 3) : '';

  return {firstName: fNamePiece1 + fNamePiece2.toLowerCase(), lastName: lNamePiece1 + lNamePiece2.toLowerCase()};
}

function getRandomSkill() {
  var output = undefined;
  if(chance.bool()) {
    output = {
      name: chance.word(),
      strength: 'Sml',
      skillGradeMax: chance.integer({min: 1, max: 40}),
      range: {min: '10%', max: '20%'},
      description: chance.paragraph()
    };
  }

  return output;
}

function getRandomTypes() {
  var output = [];
  var num = chance.integer({min: 1, max: 5});
  var shuffled = chance.shuffle(TYPES);
  for(var i = 0; i < num; i++) {
    output.push(shuffled[i]);
  }

  return output;
}

function getRandomNickname() {
  var output = undefined;
  if(chance.bool()) {
    var shuffled = chance.shuffle(NICKNAMES);
    output = shuffled[0];
  }

  return output;
}

function getRandomPrice() {
  var base = chance.integer({min: 1, max: 30});

  return base * ((chance.bool()) ? 100 : 1000);
}

function getRandomMaxLevel() {
  var base = chance.integer({min: 3, max: 5});
  return base * 10;
}

function getRandomSupportAbility() {
  var output = undefined;
  if(chance.bool()) {
    var nLevels = chance.integer({min: 1, max: 5});
    var baseValue = chance.integer({min: 3, max: 6});
    var levels = [];

    _.times(nLevels, function(n) {
      levels.push({level: n + 1, typeValue: baseValue + ((n - 1) * 3), effect: n + 1});
    });
    output = {
      name: chance.word(),
      effect: chance.paragraph(),
      types: chance.types(),
      levels: levels
    };
  }

  return output;
}

function getPercentBool(percentage) {
  if(!percentage) { return chance.bool(); }
  percentage = (percentage < 0) ? (percentage * 100) : percentage;

  return percentage > chance.integer({min: 0, max: 100});
}

module.exports = MockCards;
