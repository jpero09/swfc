var http = require('http');
var https = require('https');
var express = require('express');

// Globals
// TODO: Move to seperate file
global.express = require('express');
global.pkgjson = require('../package.json');

var app = global.express();

// TODO: config

// TODO: logger

// TODO: Middleware
app.set('name', pkgjson.name);
app.set('version', pkgjson.version);
app.set('host', process.env.HOST || 'localhost'); // || config.get('app:host'));
app.set('port', process.env.PORT || 3000); // || config.get('app:port'));

// Heartbeat
var hbMiddleware = require('./middleware/heartbeat');
var hb = new hbMiddleware(app.get('name'));
app.use(hb.Handler);

// Routes
require('./routes')(app);

// TODO: Unhandled errors
// app.use(errorHandler);

// start up the server
http.createServer(app).listen(app.get('port'), app.get('host'), function toListen() {
  // TODO: Convert to logger
  console.log('Software:', process.versions);
  console.log(
    '%s v%s running @ //%s:%s',
    app.get('name'),
    app.get('version'),
    app.get('host'),
    app.get('port')
  );
});