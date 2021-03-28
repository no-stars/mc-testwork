'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsToMany(models.lesson, 
        {
          through: 'lesson_teachers',
          timestamps: false,
          foreignKey: 'teacher_id',
          otherKey: 'lesson_id'
        }
      );
    }
  };
  Teacher.init({
    name: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'teacher',
    timestamps: false
  });
  return Teacher;
};