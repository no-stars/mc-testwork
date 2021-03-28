'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teachers', [
      {
        id: 1,
        name: 'Sveta'
      },
      {
        id: 2,
        name: 'Marina'
      },
      {
        id: 3,
        name: 'Angelina'
      },
      {
        id: 4,
        name: 'Masha'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teachers', null, {});
  }
};
