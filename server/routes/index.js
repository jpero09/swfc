module.exports = function(app) {
  require('./all')(app);

  require('./cards')(app);
  require('./vehicles')(app);
};
