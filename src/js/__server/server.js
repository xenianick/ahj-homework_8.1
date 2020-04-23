const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');

const app = new Koa();
const router = new Router();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

const matchArchive = [JSON.stringify({ message: 'Игра началась', date: +new Date(), id: 1 })];

router.get('/', async (ctx) => {
  ctx.response.body = matchArchive;
});

router.get('/sse', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);
      return [];
    },
    stream(sse) {
      const interval = setInterval(() => {
        const index = Math.floor(Math.random() * (100 - 0) + 0);
        let currentEvent = '';
        let newsMessage = '';
        if (index <= 29) {
          currentEvent = 'freekick';
          newsMessage = JSON.stringify({
            message: 'Нарушение правил, будет штрафной удар', date: +new Date(), id: matchArchive.length + 1, icon: '&#8252;&#65039;',
          });
        }
        if (index >= 30 && index <= 89) {
          currentEvent = 'action';
          newsMessage = JSON.stringify({ message: 'Идет перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать', date: +new Date(), id: matchArchive.length + 1 });
        }
        if (index >= 90) {
          currentEvent = 'goal';
          newsMessage = JSON.stringify({
            message: 'Отличный удар, И Г-О-О-О-Л!', date: +new Date(), id: matchArchive.length + 1, icon: '&#9917;',
          });
        }
        if (matchArchive.length < 50) {
          matchArchive.push(newsMessage);
          sse.sendEvent({
            data: newsMessage,
            event: currentEvent,
          });
        } else {
          sse.sendEvent({
            data: 'match ended',
            event: 'end',
          });
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
  });
  ctx.respond = false;
});

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    await next();
    return;
  }
  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      await next();
      return;
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port);
