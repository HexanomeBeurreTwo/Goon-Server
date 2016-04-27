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

/**
 * Fullfill with activities, booking and reminders a given user profile
 * @param {string} username : the user username - required
 * @param {string} email : the user email - required
 * @param {string} password : the user password - required
 * @param {string} citizen : the city where the user lives
 * @param {string} age : the user age
 * @return {Object} userId if creating, error else
 */
var addUser = function (req, res) {
  if (!req.query.username)
    res.status(500).send('ERROR: Missing params "username"');
  if (!req.query.email)
    res.status(500).send('ERROR: Missing params "email"');
  if (!req.query.password)
    res.status(500).send('ERROR: Missing params "password"');
  models.User.create({
    username: req.query.username,
    email: req.query.email,
    password: req.query.password,
    citizen: req.query.citizen,
    age: req.query.age,
    tags: null,
  })
  .then(function(user) {
    return res.status(200).send({userId: user.get('id')});
  })
  .catch(function(err) {
    console.error(err.stack);
    return res.status(500).send('An error occured. User may already exists.');
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
  models.User.findOne({where: {id: userId,}})
  .then(function (user) {
    if(user)
      res.send(user.toJSON());
    else
      res.send('No User with this id :' + userId);
  });
}
module.exports.getUser = getUser;
