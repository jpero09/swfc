var _ = require('lodash');

var Vehicle = function(dbObj) {
  var self = this;
  self.object = 'vehicle';
  self.LoadFromDB(dbObj);
};

// Take json from SWFC and converts to our format.
Vehicle.prototype.LoadFromKonami = function(card) {
  var output = {};
  if(!card) { return undefined; }

  throw new Error('Not yet implemented');
};

Vehicle.prototype.LoadFromDB = function(dbObj) {
  var output = {};
  var self = this;

  if(!dbObj) { return undefined; }

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  self.attack = dbObj.base_attack;
  self.attackPattern = dbObj.attack_pattern;
  self.attacksPerTurn = dbObj.attacks_per_turn;
  self.accuracy = dbObj.accuracy;
  self.buildTime = dbObj.build_time;
  self.buildPrice = dbObj.build_price;
  self.cost = dbObj.cost;
  self.defense = dbObj.base_defense;
  self.description = dbObj.description;
  self.evade = dbObj.evade;
  self.id = dbObj.id;
  self.legionAtWarVehicle = dbObj.law_vehicle;
  self.name = dbObj.name;
  self.numberOfPilots = dbObj.number_pilots;
  self.numberOfCoPilots = dbObj.number_copilots;
  self.parts = dbObj.parts;
  self.price = dbObj.price;
  self.xSize = dbObj.x_size;
  self.ySize = dbObj.y_size;
  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
};

module.exports = Vehicle;
