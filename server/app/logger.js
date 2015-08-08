var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var _ = require('lodash');

var Logger = function(options) {
  var self = this;
  var DEFAULT_LOG_LEVEL = 'info';
  var defaultConsoleStream = {stream: process.stdout};
  var bunyanOptions = {
    name: (options && options.name) ? options.name : 'untitled-app-log',
    streams: []
  };

  if(!options) { return bunyan.createLogger(bunyanOptions); }

  if(options.console) { // TODO: Check for enabled: false
    var stream = null;
    if(options.console.pretty) {
      var prettyStdOut = new PrettyStream();
      prettyStdOut.pipe(process.stdout);
      stream = {
        level: options.console.level || DEFAULT_LOG_LEVEL,
        type: 'raw',
        stream: prettyStdOut
      };
    }
    else {
      var stream = defaultConsoleStream;
      _.assign(stream, options.Console);
    }
    bunyanOptions.streams.push(stream);
  }

  return bunyan.createLogger(bunyanOptions);
};

// Exports:
module.exports = Logger;

module.exports.createLogger = function createLogger(options) {
  return new Logger(options);
};
