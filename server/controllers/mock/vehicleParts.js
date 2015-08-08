var _ = require('lodash');
var util = require('util');
var Chance = require('chance');

var ctrlBase = require('../base/vehicleParts');

var chance = new Chance();

var MockVehicleParts = function(options) {
  MockVehicleParts.super_.call(this, options); // Call the base init
};
util.inherits(MockVehicleParts, ctrlBase);

MockVehicleParts.prototype.GetByID = function(id, callback) {
  return callback(undefined, getMock(id));
};

// private methods
function getMock(id) {

  var output = {
    id: parseInt(id), //Lets pretend this doesnt need validated
    name: chance.word(),
    description: chance.paragraph(),
    stars: chance.integer({min: 1, max: 3}),
    cost: chance.integer({min: 10, max: 35}),
    accuracy: chance.integer({min: 80, max: 150}),
    defense: chance.integer({min: 80, max: 150}),
    attack: chance.integer({min: 80, max: 150}),
    evade: chance.integer({min: 40, max: 160}),
    hitPoints: chance.integer({min: 80, max: 150}),
    limitPerVehicle: chance.integer({min: 1, max: 5}),
    attacksPerTurn: chance.integer({min: -2, max: 1}),
    attackPattern: 'TODO',
    price: chance.integer({min: 10, max: 100}),
    comments: chance.paragraph(),
    images: {
      baseImg: './images/vehicleParts/' + id + '.jpeg',
    },
    skill: getRandomSkill()
  };

  return output;
}

function getRandomSkill() {
  var output = {
    name: chance.word(),
    skillGradeMax: chance.integer({min: 1, max: 40}),
    strength: undefined,
    range: undefined,
    description: chance.paragraph()
  };

  return output;
}

module.exports = MockVehicleParts;
