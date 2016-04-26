"use strict";

var express = require('express');
var path    = require('path');
var Sequelize = require('sequelize');
// var globe = require('./helpers/globe.js');

var app = express();
app.use('/views',express.static(__dirname + '/views'));

/* Avoid CROSS Origin request */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/helloworld', function (req, res) {
	var searchQuery = req.query.q;
  // default google results is set to 10
	var msg = "Hello World"

	res.contentType('application/json');
  res.send(JSON.stringify(msg));
});

// var sequelize = new Sequelize("cyrilcanete", "cyrilcanete", "", {
//   host: 'localhost',
//   dialect: 'postgres',
//
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });

var sequelize = new Sequelize('postgres://localhost:5432/cyrilcanete', {
  define: {
    timestamps: false // true by default
  }
});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});



var User = sequelize.define('user', {}); // timestamps is false by default
var Post = sequelize.define('post', {}, {
  timestamps: true // timestamps will now be true
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

User.findOne().then(function (user) {
    console.log(user);
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Goon server listening at http://%s:%s', host, port);
});
