var OBJECT = 'vehicles';
var ctrlHelper = require('../controllers/controllerHelpers');

module.exports = function(app) {
  var router = express.Router();
  var options = {
    objectName: OBJECT,
    databaseUrl: config.get('database:url')
  };

  router.get(['/:id', '/'], function(req, res) {
    var ctrl = ctrlHelper.getController(req, options);
    logger.debug('Calling "GetByID" on controller:', ctrl);
    ctrl.GetByID(req.params.id, function(err, result) {
      return ctrlHelper.handleControllerResponse(err, result, res);
    });
  });

  app.use('/' + OBJECT, router);
};
