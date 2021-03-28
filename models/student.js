'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsToMany(models.lesson, 
        {
          through: 'lesson_students',
          timestamps: false,
          foreignKey: 'student_id',
          otherKey: 'lesson_id'
        }
      );
    }
  };
  Student.init({
    name: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'student',
    timestamps: false
  });
  return Student;
};