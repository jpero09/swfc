var _ = require('lodash');

var defaultResponse = {httpCode: 501, message: 'Route not yet implemented.'};

var baseController = function(options) {
  var self = this;
  self.options = options;
  self.databaseUrl = process.env.DATABASE_URL || options.databaseUrl;
  self.name = 'base';
};

baseController.prototype.Get = function(callback) {
  return callback(undefined, defaultResponse);
};

baseController.prototype.GetByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

baseController.prototype.Save = function(obj, callback) {
  return callback(undefined, defaultResponse);
};

baseController.prototype.DeleteByID = function(id, callback) {
  return callback(undefined, defaultResponse);
};

// TODO: Add validation here as well.

baseController.prototype.ConvertObject = function(obj) {
  if(!obj) {return obj;}
};

baseController.prototype.ConvertObjects = function(objs) {
  var self = this;
  var output = [];
  if(!objs) {return objs;}

  _.each(objs, function(o) {
    output.push(new self.model(o));
  });

  return output;
};

module.exports = baseController;
