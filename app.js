"use strict";

var express = require('express');
var Sequelize = require('sequelize');

var routes = require('./routes/routes.js');


// *** Config Express *** //

var app = express();

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
User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  }).then(function()  {
    User.findOne().then(function (user) {
      var user = user.get('firstName');
      console.log(user);
    });
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Goon server listening at http://%s:%s', host, port);
});
