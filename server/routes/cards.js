
var OBJECT = 'cards';
var ctrlHelper = require('../controllers/controllerHelpers');

var validate = require('validate.js');
var cardConstraints = require('../validators/cards');

module.exports = function(app) {
  var router = express.Router();
  var options = {objectName: OBJECT};

  router
    .get('/:id', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.GetByID(req.params.id, function(err, result) {
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
      var validationErr = validate(req.body, cardConstraints);
      if(validationErr) {
        return ctrlHelper.handleControllerResponse(undefined, {httpCode: 400, errors: validationErr}, res);
      }
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

  app.use('/' + options.objectName, router);
};
