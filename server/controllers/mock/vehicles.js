var _ = require('lodash');
var util = require('util');
var Chance = require('chance');

var ctrlBase = require('../base/vehicles');

var chance = new Chance();

var MockVehicles = function(options) {
  var self = this;
  MockVehicles.super_.call(this, options); // Call the base init
  self.name = 'mock';
};
util.inherits(MockVehicles, ctrlBase);

MockVehicles.prototype.GetByID = function(id, callback) {
  return callback(undefined, getMock(id));
};

// private methods
function getMock(id) {

  var output = {
    id: parseInt(id), //Lets pretend this doesnt need validated
    name: 'Blizzard 1',
    buildTime: chance.integer({min: 60, max: 180}),
    buildPrice: chance.integer({min: 60, max: 180}),
    cost: chance.integer({min: 10, max: 35}),
    accuracy: chance.integer({min: 80, max: 150}),
    evade: chance.integer({min: 40, max: 160}),
    baseAttack: chance.integer({min: 40, max: 1000}),
    baseDefense: chance.integer({min: 40, max: 1000}),
    attacksPerTurn: chance.integer({min: 1, max: 2}),
    attackPattern: 'TODO',
    numberOfPilots: chance.integer({min: 0, max: 2}),
    numberOfCoPilots: chance.integer({min: 0, max: 2}),
    legionAtWarVehicle: chance.bool(),
    xSize: chance.integer({min: 1, max: 3}),
    ySize: chance.integer({min: 1, max: 3}),
    images: {
      baseImg: './images/vehicles/' + id + '.jpeg',
    },
    parts: [],
    price: chance.integer({min: 60, max: 180})
  };

  return output;
}

module.exports = MockVehicles;
