var express = require('express');
var path    = require('path');
var router = express.Router();
var models = require('../models/index');

var user = require('./user.route');
var helloworld = require('./helloworld.route');
user(router);
helloworld(router);

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'../views/index.html'));
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
