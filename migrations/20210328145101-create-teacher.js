'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(10)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teachers');
  }
};