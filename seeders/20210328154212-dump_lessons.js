'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lessons', [
      {
        id: 2,
        date: new Date('2019-09-02'),
        title: 'Red Color',
        status: false
      },
      {
        id: 5,
        date: new Date('2019-05-10'),
        title: 'Purple Color',
        status: false
      },
      {
        id: 7,
        date: new Date('2019-06-17'),
        title: 'White Color',
        status: false
      },
      {
        id: 10,
        date: new Date('2019-06-24'),
        title: 'Brown Color',
        status: false
      },
      {
        id: 9,
        date: new Date('2019-06-20'),
        title: 'Yellow Color',
        status: true
      },
      {
        id: 1,
        date: new Date('2019-09-01'),
        title: 'Green Color',
        status: true
      },
      {
        id: 3,
        date: new Date('2019-09-03'),
        title: 'Orange Color',
        status: true
      },
      {
        id: 4,
        date: new Date('2019-09-04'),
        title: 'Blue Color',
        status: true
      },
      {
        id: 6,
        date: new Date('2019-05-15'),
        title: 'Red Color',
        status: true
      },
      {
        id: 8,
        date: new Date('2019-06-17'),
        title: 'Black Color',
        status: true
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
