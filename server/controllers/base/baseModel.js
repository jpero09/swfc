
var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var baseModel = function(options) {
  var self = this;
  self.options = options;
  self.databaseUrl = process.env.DATABASE_URL || options.databaseUrl;
  self.name = 'base';
};

baseModel.prototype.Get = function(callback) {
  return callback(undefined, defaultResponse);
};

baseModel.prototype.GetByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

baseModel.prototype.Save = function(obj, callback) {
  return callback(undefined, defaultResponse);
};

baseModel.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

module.exports = baseModel;
