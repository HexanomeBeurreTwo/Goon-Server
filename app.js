"use strict";

var fs      = require('fs');
var express = require('express');
var Sequelize = require('sequelize');

var routes = require('./routes/routes.js');


// *** Config Express *** //

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/views',express.static(__dirname + '/views'));


// *** main routes *** //
app.use('/', routes);

/* Avoid CROSS Origin request */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// *** Config Postgres *** //


var sequelize = new Sequelize('postgres://localhost:5432/victor', {
  define: {
    timestamps: false // true by default
  }
});

//
// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   }).then(function()  {
//     User.findOne().then(function (user) {
//       var user = user.get('firstName');
//       console.log(user);
//     });
//   });
// });

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Goon server listening at http://%s:%s', host, port);
});
