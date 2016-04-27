'use strict';

var models = require('../models/index');

var getAllUsers = function (req, res) {
  models.User.findOne().then(function (user) {
    var user = user.get('name');
    if(user)
      res.send(user);
    else
      res.send('error');
  });
};
module.exports.getAllUsers = getAllUsers;

var addUser = function (req, res) {
  if (!req.query.username)
    res.send('ERR: Missing params "username"');
  if (!req.query.email)
    res.send('ERR: Missing params "email"');
  if (!req.query.password)
    res.send('ERR: Missing params "password"');
  return models.User.create({
    username: req.query.username,
    email: req.query.email,
    password: req.query.password,
    citizen: req.query.citizen,
    age: req.query.age,
    tags: null,
  }).then(function(user)  {
    var user_id = user.get('id');
    res.send({userId: user_id});
  });
};
module.exports.addUser = addUser;

var updateUser = function (req, res) {
  // mise à jour du jour du user à partir de son id
}
module.exports.updateUser = updateUser;


var deleteUser = function(req, res) {
  // supprime un user à partir de son id
}
module.exports.deleteUser = deleteUser;

var getUser = function(req, res) {
  //récuper les infos d'un user à partir de son id
  var userId = req.params.id;
  models.User.findOne({
    where: {
      id: userId,
    }
  }).then(function (user) {
    if(user)
      res.send(user.toJSON());
    else
      res.send('No User with the id :' + userId);
  });
}
module.exports.getUser = getUser;
