var util = require('util');
var ctrlBase = require('../base/cards');

var Cards = function(options) {
  Cards.super_.call(this, options); // Call the base init
};
util.inherits(Cards, ctrlBase);

module.exports = Cards;