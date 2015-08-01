
var obj = 'vehicles';
var sqlCtrl = require('../controllers/sql/' + obj);
var mockCtrl = require('../controllers/mock/' + obj);

module.exports = function(app) {
  var router = express.Router();
  var options = {};

  router.get(['/:id', '/'], function(req, res) {
    var ctrl = getController(req, options);
    ctrl.GetByID(req.params.id, function(err, result) {
      if(err) {
        // TODO: Handle Error
        console.log('Unhandled error calling ' + obj + '.GetByID:', err);

        return res.status(500).json({error: err});
      }

      if(result && result.httpCode) { res.status(result.httpCode); }

      return res.json(result);
    });
  });

  // TODO: Move more central for all controllers to use.
 function getController(req, options) {
    var MOCK_ADAPTER = 'mock';
    var useMockAdapter = false;

    if(req && req.headers && req.headers.adapter) {
      useMockAdapter = req.headers.adapter.toLowerCase() === MOCK_ADAPTER;
    }

    return (true || useMockAdapter) ? new mockCtrl(options) : new sqlCtrl(options);
  }

  app.use('/' + obj, router);
};