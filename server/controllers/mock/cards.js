var _ = require('lodash');
var util = require('util');
var Chance = require('chance');

var ctrlBase = require('../base/cards');

var chance = new Chance();

var AFFILIATIONS = ['Beast', 'Bounty Hunter', 'Clone', 'Droid', 'Empire', 'Ewok', 
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

// private methods
function getMock(id) {

  var output = {
  	id: parseInt(id), //Lets pretend this doesnt need validated
  	gender: chance.gender(),
  	nickname: getRandomNickname(),
  	stars: chance.integer({min: 1, max: 5}),
  	cost: chance.integer({min: 4, max: 35}),
  	range: chance.character({pool: 'SML'}),
  	side: chance.character({pool: 'LDN'}),
  	affiliations: getRandomAffiliations(),
  	accuracy: chance.integer({min: 80, max: 150}),
  	evade: chance.integer({min: 40, max: 160}),
  	baseAttack: chance.integer({min: 40, max: 1000}),
  	baseDefense: chance.integer({min: 40, max: 1000}),
  	attacksPerTurn: chance.integer({min: 1, max: 2}),
  	attackPattern: 'TODO',
  	images: {
  		baseImg: './images/cards/' + id + '-Base.jpeg',
  		baseEvo1: './images/cards/' + id + '-Evo1.jpeg',
  		baseEvo2: './images/cards/' + id + '-Evo2.jpeg',
  		baseEvoMax: './images/cards/' + id + '-EvoMax.jpeg'
  	},
  	skill: getRandomSkill()
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

	return { firstName: fNamePiece1 + fNamePiece2.toLowerCase(), lastName: lNamePiece1 + lNamePiece2.toLowerCase() };
}

function getRandomSkill() {
	var output = {
		name: 'Short EVA Up',
		strength: 'Sml',
		range: {min: '10%', max: '20%'},
		description: 'Increases 10-20% of EVA on all the short-ranged units in the Formation.'
	};
	
	// TODO: Randomize

	return output;
}

function getRandomAffiliations() {
	var output = [];
	var num = chance.integer({min: 1, max: 5});
	var shuffled = chance.shuffle(AFFILIATIONS);
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

module.exports = MockCards;