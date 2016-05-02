'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Connections', {
      userId: {
        type: Sequelize.INTEGER
      },
      nb_connection: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Connections');
  }
};