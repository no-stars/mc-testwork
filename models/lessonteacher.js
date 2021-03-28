'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonTeacher extends Model {};

  LessonTeacher.init({
    lesson_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false 
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'lesson_teacher',
  });
  return LessonTeacher;
};