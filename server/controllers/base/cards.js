var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Cards = function(options) {
  var me = this;
  me.options = options;
};

Cards.prototype.GetByID = function(callback) {
	return callback(undefined, defaultResponse);
};

module.exports = Cards;