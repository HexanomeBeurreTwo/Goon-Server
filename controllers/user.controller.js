'use strict';

var models = require('../models/index');

var getUsers = function (req, res) {
  models.User.findOne().then(function (user) {
    var user = user.get('name');
    if(user)
      res.send(user);
    else
      res.send('error');
  });
};
module.exports.getUsers = getUsers;

var addUser = function (req, res) {
  return models.User.create({
    username: 'Victor',
    email: 'victor@free.fr',
    password: 'azerty',
    citizen: 'lyon',
    age: 21,
    tags: null,
  }).then(function()  {
    res.send('Created');
  });
};
module.exports.addUser = addUser;
