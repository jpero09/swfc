var HEARTBEAT_PATH = '/heartbeat';
var heartbeat = function(name) {
	var self = this;
	self.appName = name || 'Untitled Application';

	self.Handler = function(req, res, next) {
		var paths = [
			(req.path || '').toLowerCase(), 
			(req.originalUrl || '').toLowerCase(), 
			(req.baseUrl || '').toLowerCase()];

		if(paths.indexOf(HEARTBEAT_PATH) === -1) { return next(); }

		if(req.accepts('json')) { res.json({name: self.appName, status: 200}); }
		else if(req.accepts('html')) { res.send(200); }

		res.status(200);
		res.end();
	};
};

module.exports = heartbeat;