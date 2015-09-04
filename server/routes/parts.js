var OBJECT = 'parts';
var ctrlHelper = require('../controllers/controllerHelpers');

module.exports = function(app) {
  var router = express.Router();
  var options = {
    objectName: OBJECT,
    databaseUrl: config.get('database:url')
  };

  router
    .get('/:id', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.GetByID(req.params.id, function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    })
   .get('/:id/vehicles', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.GetVehicles(req.params.id, function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    })
   .get('/', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.Get(function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    })
    .post('/', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.Save(req.body, function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    })
    .delete('/:id', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.DeleteByID(function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    });

  app.use('/' + OBJECT, router);
};
