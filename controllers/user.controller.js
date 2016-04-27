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
 * Creates a user in the database
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

/**
 * Allows connection for users and return the user object if succed. email or username required
 * @param {string} username : the user username - required (or email)
 * @param {string} email : the user email - required (or username)
 * @param {string} password : the user password - required
 * @return {Object} user if succed, error else
 */
var userConnection = function (req, res) {
  if (!req.query.username && !req.query.email)
    return res.status(500).send('ERROR: Missing params "email" or "username"');
  if (!req.query.password)
    return res.status(500).send('ERROR: Missing params "password"');
  if (req.query.username)
    var query = {username: req.query.username};
  else if (req.query.email)
    var query = {email: req.query.email};
  models.User.findOne({where: query})
  .then(function (user) {
    if(user.get('password') === req.query.password)
      res.send(user.toJSON());
    else
      res.send('Wrong password');
  })
  .catch(function(err) {
    console.error(err.stack);
    return res.status(500).send('An error occured. Please try again later.');
  });
}
module.exports.userConnection = userConnection;
