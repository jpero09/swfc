var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var path = require('path');
var serveFavicon = require('serve-favicon');

// Globals
// TODO: Move to seperate file?
global.express = require('express');
global.pkgjson = require('../package.json');

var app = global.express();
app.set('name', pkgjson.name);

// Config
global.config = require('./app/config').initConfig();

// logger
var loggingConfig = config.get('Logger');
loggingConfig.name = app.get('name');
global.logger = require('./app/logger').createLogger(loggingConfig);

// TODO: Middleware
app.set('version', pkgjson.version);
app.set('host', process.env.HOST || config.get('app:host'));
app.set('port', process.env.PORT || config.get('app:port'));
app.use(morgan(config.get('app:morganFormat') || 'tiny')); // Morgan Formats: combined, common, dev, short, tiny
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(serveFavicon(path.join(__dirname, '../public/favicon.ico')));

// Heartbeat
var HeartbeatMW = require('./middleware/heartbeat');
var hb = new HeartbeatMW(app.get('name'));
app.use(hb.Handler);

// Routes
require('./routes')(app);

// TODO: Unhandled errors
// app.use(errorHandler);

// Start this party:
http.createServer(app).listen(app.get('port'), app.get('host'), function() {
  logger.info('Starting: %s v%s', app.get('name'), app.get('version'));
  logger.debug('Running @ //%s:%s', app.get('host'), app.get('port'));
  logger.debug('Environment:', process.env.NODE_ENV);
  logger.debug('Software:', process.versions);
});
