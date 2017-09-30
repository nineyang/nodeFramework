/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const Koa = require('koa');
const compose = require('koa-compose');
const env = require('../lib/Env');
const views = require('koa-swig');
const staticServer = require('koa-static');
const path = require('path');

let app = new Koa();

// 使用视图
const co = require('co');
app.context.render = co.wrap(views({
    root: path.join(__dirname, '../app/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));

app.use(staticServer(path.join(__dirname, '../static')));

// 配置引入config
env.getContent(process.env.NODE_ENV).parse();

// 加载路由
const route = require('../lib/Route').routeServe();
app.use(route.routes()).use(route.allowedMethods());

let port = parseInt(process.env.PORT || env.getEnv('ENV_PORT'));

app.listen(port);
