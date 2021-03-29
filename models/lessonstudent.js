'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonStudent extends Model {};

  LessonStudent.init({
    lesson_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    visit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'lesson_student',
    timestamps: false
  });
  return LessonStudent;
};