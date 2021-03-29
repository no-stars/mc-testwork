const KoaRouter = require('koa-router');
const router = new KoaRouter();
const models = require('../models/index');
const { incDate, generateError, isValidDate } = require('../helpers')


const createLessonTeacher = async (lessonId, teacherId) => {
  const fields = {
    lesson_id: lessonId,
    teacher_id: teacherId
  }

  try {
    const createdLessonTeacher = await models.lesson_teacher.create(fields);
    return createdLessonTeacher;
  } catch (error) {
    throw generateError(error.message, 500);
  }
}

const createLesson = async (date, title, teacherIds) => {
  try {
    const createdLesson = await models.lesson.create({ date, title });
    const createdId = createdLesson.id;
    
    teacherIds.forEach((teacherId) => {
      createLessonTeacher(createdId, teacherId);
    });

    return createdId;
  } catch (error) {
    throw generateError(error.message, 500);
  }
}

const checkData = (data) => {
  if (!data.teacherIds || !data.title || !data.firstDate) {
    throw generateError('Data is incomplete', 400);
  }
  if (!data.lessonsCount && !data.lastDate) {
    throw generateError('Data is incomplete', 400);
  }
  if (data.lastDate && !isValidDate(data.lastDate)) {
    throw generateError('Invalid data', 400);
  }
  if (data.firstDate && !isValidDate(data.firstDate)) {
    throw generateError('Invalid data', 400);
  }
}

const createLessons = async (data) => {
  const stopDate = new Date(data.firstDate);
  stopDate.setFullYear(stopDate.getFullYear() + 1);

  let counter = data.lessonsCount || 300;
  const dateCounter = new Date(data.firstDate);
  const lastDate = data.lastDate ? new Date(data.lastDate) : stopDate;

  const result = [];
  while (counter > 0 && dateCounter <= lastDate) {
    if (data.days.includes(dateCounter.getDay())) {
      result.push(await createLesson(dateCounter, data.title, data.teacherIds));
      counter--;
    }
    incDate(dateCounter)
  }

  return result;
}

router.post('/lessons', async ctx => {
  const lessonData = ctx.request.body;
  console.log(checkData(lessonData));
  const createdIds = await createLessons(lessonData);
  ctx.body = { createdIds };
})

module.exports = router
