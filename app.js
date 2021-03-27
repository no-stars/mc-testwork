const { Sequelize } = require('sequelize');
const db = require('./models/index.js')

console.log('asda')
const test = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test()
