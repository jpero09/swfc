var http = require('http');
var https = require('https');
var express = require('express');
var morgan = require('morgan');

// Globals
// TODO: Move to seperate file
global.express = require('express');
global.pkgjson = require('../package.json');

var app = global.express();

// TODO: config

// logger
var tmpLoggingConfig = {name: 'swfc', console: {enabled: true, level: 'info',
	pretty: true}};
global.logger = require('./app/logger').createLogger(tmpLoggingConfig);

// TODO: Middleware
app.set('name', pkgjson.name);
app.set('version', pkgjson.version);
app.set('host', process.env.HOST || 'localhost'); // || config.get('app:host'));
app.set('port', process.env.PORT || 3000); // || config.get('app:port'));
app.use(morgan('tiny'));

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
  logger.info('Software:', process.versions);
  logger.info(
    '%s v%s running @ //%s:%s',
    app.get('name'),
    app.get('version'),
    app.get('host'),
    app.get('port')
  );
});
