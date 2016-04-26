'use strict';

var models = require('../models/index');

var getHelloWorld = function (req, res) {
  var msg = {"hello":"Hello World"};

  res.contentType('application/json');
  res.send(JSON.stringify(msg));
};
module.exports.getHelloWorld = getHelloWorld;
