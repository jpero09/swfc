module.exports = function(app) {
  require('./all')(app);

  require('./cards')(app);
};
