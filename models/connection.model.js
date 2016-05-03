'use strict'

module.exports = function(sequelize, DataTypes) {
  var Connection = sequelize.define('Connection', {
    nb_connection: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Connection.belongsTo(models.User, {foreignKey: 'UserId'});
      }
    }
  });
  return Connection;
};