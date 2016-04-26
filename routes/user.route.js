'use strict';

var user = require ("../controllers/user.controller");

module.exports = function(router)
{
  router.get('/users', user.getUsers);
};
