'use strict';

var models = require('../models/index');

/**
 * Controller for GET /users/
 * Return all the users of the database
 * @return {Array of User} array contening all the users objects
 */
var getAllUsers = function (req, res) {
  // TODO: Return all users as an array on user
};
module.exports.getAllUsers = getAllUsers;

/**
 * Controller for POST /user/
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
  models.User.sync().then(function () {
    models.User.create({
      username: req.query.username.toLowerCase(),
      email: req.query.email.toLowerCase(),
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
  });
};
module.exports.addUser = addUser;

/**
 * Controller for update /user/:id
 * Return a user by id
 * @param {interger} id : the user id
 * @return {User} user if existing, error else
 */
var updateUser = function (req, res) {
  // mise à jour du jour du user à partir de son id
  var userId = req.params.id;
  models.User.update({where: {id: userId,}})
  .then(function(user)) {

  }
}
module.exports.updateUser = updateUser;

/**
 * Controller for delete /user/:id
 * Return nothing
 * @param {interger} id : the user id
 */
var deleteUser = function(req, res) {
  // supprime un user à partir de son id
  var userId = req.params.id;
  models.User.destroy({where: {id: userId,} truncate: true})
  .then(function(user) {
    if(user)
      res.send('User with id'+ userId +' deleted' );
    else
      res.send('No User with this id :' + userId);
    });
}
module.exports.deleteUser = deleteUser;

/**
 * Controller for GET /user/:id
 * Return a user by id
 * @param {interger} id : the user id
 * @return {User} user if existing, error else
 */
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
 * Controller for GET /connection
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
    var query = {username: req.query.username.toLowerCase()};
  else if (req.query.email)
    var query = {email: req.query.email.toLowerCase()};
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
