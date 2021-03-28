'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('students', [
      {
        id: 1,
        name: 'Ivan'
      },
      {
        id: 2,
        name: 'Sergey'
      },
      {
        id: 3,
        name: 'Maxim'
      },
      {
        id: 4,
        name: 'Slava'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});
  }
};
