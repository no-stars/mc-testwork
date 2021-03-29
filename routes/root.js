const KoaRouter = require('koa-router');
const models = require('../models/index');
const { Op } = models.Sequelize;
const router = new KoaRouter();
const { isValidDate, isValidNumber, generateError } = require('../helpers')


const parseDate = (dateQuery) => {
  if (dateQuery === undefined) {
    return {}
  }

  const dates = dateQuery.split(',');
  if (!dates.every((element) => isValidDate(element))) {
    throw generateError('Invalid date', 400);
  }

  const between = dates.length === 2 ? dates : [dates[0], dates[0]];

  return {
    date: {
      [Op.between]: between
    }
  }
}

const parseTeachers = (tearcherString) => {
  if (tearcherString === undefined) {
    return {}
  }
  const teachers = tearcherString.split(',');

  if (!teachers.every((element) => isValidNumber(element))) {
    throw generateError('Invalid ids', 400);
  }

  return {
    where: {
      id: teachers
    }
  }
}

const reorganizeLessons = (lessons) => {

  const countedLesson = lessons.map((element) => {
    const lesson = element.get({ plain: true });
    lesson.visitCount = 0;

    lesson.students.forEach((student) => {
      student.visit = student.lesson_students.visit;
      student.lesson_students = undefined;
      
      if (student.visit === true) {
        lesson.visitCount += 1;
      }
    });

    return lesson;
  });

  return countedLesson;
}

const formQueryFilter = (params) => {
  const filter = {};
  const teacherFilter = parseTeachers(params.teacherIds);

  const page = Number.parseInt(params.page) || 1;
  const perPage = Number.parseInt(params.lessonsPerPage) || 5;

  Object.assign(filter, parseDate(params.date));

  if (params.status && [0,1].includes(params.status)) {
    filter.status = params.status;
  }

  return {
    include: [{
      ...teacherFilter,
      model: models.teacher,
      as: 'teachers',
      through: {
        attributes: []
      }
    }, {
      model: models.student,
      as: 'students',
      through: {
        attributes: ['visit']
      }
    }],
    where: filter,
    offset: page * perPage - perPage,
    limit: perPage
  }
}

const filterByStudentCount = (source, studentsCount) => {
  if (studentsCount === undefined) {
    return source;
  }

  const range = studentsCount.split(',');
  const [min, max] = range.length === 2 ? range : [range[0], range[0]];

  return source.filter((element) => {
    const studentCount = element.students.length;
    return studentCount >= min && studentCount <= max;
  });
}

router.get('/', async ctx => {
  const params = ctx.request.query;
  const queryFilter = formQueryFilter(params);

  const lessons = await models.lesson.findAll(queryFilter);
  const reorganizedLessons = reorganizeLessons(lessons);

  const result = filterByStudentCount(reorganizedLessons, params.studentsCount);

  ctx.body = result;
})

module.exports = router
