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
  models.User.sync({force: true}).then(function () {
    // Table created
    return models.User.create({
      firstName: 'Cyril',
      lastName: 'Canete'
    }).then(function()  {
      res.send('Created');
    });
  });
};
module.exports.addUser = addUser;

var update = function (req, res) {
  // mise à jour du jour du user à partir de son id
}
module.exports.updateUser = updateUser;


var delete = function(req, res) {
  // supprime un user à partir de son id
}
module.exports.deleteUser = deleteUser;

var getUser = function(req, res) {
  //récuper les infos d'un user à partir de son id
}
module.exports.getUser = getUser;
