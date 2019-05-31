const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const jwtKoa = require('koa-jwt')      // 用于路由权限控制
const koaBody = require('koa-body')//解析上传文件的插件
const jwtErr = require('./app/middleware/jwtError')
const logUtil = require('./app/utils/log_util')
const index = require('./routes/index')
const users = require('./routes/users')
const cors = require('koa2-cors')
const config = require('./config/config')
// error handler
onerror(app)
app.use(json())
app.use(jwtErr())
//app.use(logger())
/* 路由权限控制 */
app.use(jwtKoa({ secret: config.jwt.secret }).unless({
  path: [
    /^\/openapi\//,//以openapi为开端的连接开放
    /^\/users\/token/,
    /^\/users\/strMd5/,
    ///^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));

app.use(require('koa-static')(__dirname + '/public'))
app.use(koaBody({
  enableTypes: ['json', 'form', 'text', 'file'],
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/api/act_add') {
      return "*"; // 允许来自所有域名请求
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();
    ms = new Date() - start;
    console.log(`---------START_TIME=>${start}------------`)
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)   
    console.log(`---------END_TIME=>${new Date}-----------`)
    //记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  ms = new Date() - start;
  logUtil.logError(ctx, err, ms);
  //console.error('server error', err, ctx)
});

module.exports = app
