var Helpers = function() {};

var MOCK_ADAPTER = 'mock';
var getController = function(req, options) {
  var useMockAdapter = false;
  var Output;
  var objName;

  if(options && options.objectName) { objName = options.objectName; }
  else {
    throw new Error('Missing required object name for controller', options);
  }

  if(req) {
    var header = (req.headers && req.headers.adapter) ? req.headers.adapter.toLowerCase() : undefined;
    var query = (req.query && req.query.adapter) ? req.query.adapter.toLowerCase() : undefined;
    useMockAdapter = (header === MOCK_ADAPTER) || (query === MOCK_ADAPTER);
  }

  if(useMockAdapter) { Output = require('../controllers/mock/' + objName); }
  else { Output = require('../controllers/sql/' + objName); }

  return new Output(options);
};

var handleControllerResponse = function(err, result, res) {
  if(err) {
    logger.error('Unhandled error calling controller:', err);

    return res.status(500).json({error: err});
  }

  if(result && result.httpCode) { res.status(result.httpCode); }

  return res.json(result);
};

// Exports:
module.exports.getController = getController;
module.exports.handleControllerResponse = handleControllerResponse;
