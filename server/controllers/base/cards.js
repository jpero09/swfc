var util = require('util');
var ctrlBase = require('./baseModel');

var Cards = function(options) {
  var self = this;
  Cards.super_.call(self, options); // Call the base init
  self.object = 'card';
};
util.inherits(Cards, ctrlBase);

module.exports = Cards;
