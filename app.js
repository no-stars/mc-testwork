const { Sequelize } = require('sequelize');
const models = require('./models/index.js')

const test = async () => {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const find = async () => {
  const ls = await models.lesson.findAll({
    raw: true,
    include: 'students'
  });
  console.log(ls);
}

test()
find()