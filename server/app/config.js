var nconf = require('nconf');
var path = require('path');

var CONFIG_NAME = 'config';
var CONFIG_DIR = path.join(__dirname, '../', 'config');

var Configuration = function() {
  var self = this;

  nconf.argv().env();

  // Environments
  nconf.env(['NODE_ENV']);
  nconf.defaults({'NODE_ENV': 'dev'});

  // Load config files
  // Environment config (ex/ 'config.dev.json')
  var environmentConfig = CONFIG_NAME + '.' + nconf.get('NODE_ENV') + '.json';
  nconf.file({
    file: environmentConfig,
    dir: CONFIG_DIR,
    search: true
  });

  //Default base config
  var defaultConfig = path.join(CONFIG_DIR, CONFIG_NAME + '.json');
  nconf.file('default', defaultConfig);

  return nconf;
};

// Exports:
module.exports = Configuration;

module.exports.initConfig = function() {
  return Configuration();
};
