'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      Lesson.belongsToMany(models.teacher, 
        {
          through: 'lesson_teachers',
          timestamps: false,
          foreignKey: 'lesson_id',
          otherKey: 'teacher_id'
        }
      );

      Lesson.belongsToMany(models.student, 
        {
          through: 'lesson_students',
          timestamps: false,
          foreignKey: 'lesson_id',
          otherKey: 'student_id'
        }
      );
    }
  };
  Lesson.init({
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    title: DataTypes.STRING(100),
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'lesson',
    timestamps: false
  });
  return Lesson;
};