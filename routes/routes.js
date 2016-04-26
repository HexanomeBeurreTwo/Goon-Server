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

// ** EXEMPLES BELOW **

// router.post('/users', function(req, res) {
//   models.User.create({
//     email: req.body.email
//   }).then(function(user) {
//     res.json(user);
//   });
// });
//
// // get all todos
// router.get('/todos', function(req, res) {
//   models.Todo.findAll({}).then(function(todos) {
//     res.json(todos);
//   });
// });
//
// // get single todo
// router.get('/todo/:id', function(req, res) {
//   models.Todo.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     res.json(todo);
//   });
// });
//
// // add new todo
// router.post('/todos', function(req, res) {
//   models.Todo.create({
//     title: req.body.title,
//     UserId: req.body.user_id
//   }).then(function(todo) {
//     res.json(todo);
//   });
// });
//
// // update single todo
// router.put('/todo/:id', function(req, res) {
//   models.Todo.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     if(todo){
//       todo.updateAttributes({
//         title: req.body.title,
//         complete: req.body.complete
//       }).then(function(todo) {
//         res.send(todo);
//       });
//     }
//   });
// });
//
// // delete a single todo
// router.delete('/todo/:id', function(req, res) {
//   models.Todo.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     res.json(todo);
//   });
// });
