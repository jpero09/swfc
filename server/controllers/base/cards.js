var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var Cards = function(options) {
  var me = this;
  me.options = options;
};

Cards.prototype.Get = function(callback) {
  return callback(undefined, defaultResponse);
};

Cards.prototype.GetByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

Cards.prototype.Save = function(card, callback) {
  return callback(undefined, defaultResponse);
};

Cards.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = Cards;
