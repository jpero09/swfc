var _ = require('lodash');

var OBJECT = 'cards';
var ctrlHelper = require('../controllers/controllerHelpers');

var validate = require('validate.js');
var cardConstraints = require('../validators/cards');

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
    .get('/', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      ctrl.Get(function(err, result) {
        return ctrlHelper.handleControllerResponse(err, result, res);
      });
    })
    .post('/import', function(req, res) {
      var ctrl = ctrlHelper.getController(req, options);
      var input = req.body;
      var output = {httpCode: 200, success: [], errors: []};

      // TODO: Move this to the controller! All of it!!

      if(!_.isArray(input)) { input = [input]; }

      // Save each of our cards:
      _.each(input, function(i) {
        var converted = ctrl.convert(i);
        var validationErr = validate(converted, cardConstraints);
        if(validationErr) {
          output.httpCode = 400;
          validationErr.card = converted;
          output.errors.push(validationErr);
        }
        else {
          ctrl.Save(converted, function(err, result) {
            if(err) {
              output.httpCode = 500;
              output.errors.push(err);
            }
            else { output.success.push(result); }
          });
        }
      });

      return ctrlHelper.handleControllerResponse(undefined, output, res);
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
