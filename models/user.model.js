'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    lyonCitizen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
