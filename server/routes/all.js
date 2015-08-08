module.exports = function(app) {
  var router = express.Router();

  router.all('*', function(req, res, next) {
    // TODO: things that run on all routes

    return next();
  });

  app.use('*', router);
};
