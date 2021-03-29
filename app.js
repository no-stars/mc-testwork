const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const routerRoot = require('./routes/root');
const routerLessons = require('./routes/lessons');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = error.message || 'При выполнении произошла ошибка';
    ctx.status = error.status || 500;
  }
}

app.use(errorHandler);
app.use(bodyParser());
app.use(routerRoot.routes());
app.use(routerLessons.routes());

app.listen(5000, () => console.log('App is running on port 5000'));