/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const Koa = require('koa');
const compose = require('koa-compose');
const env = require('../lib/env');
const views = require('koa-swig');
const path = require('path');

let app = new Koa();

// 使用视图
// app.use(views(__dirname + '/../app/views'));
const co = require('co');
app.context.render = co.wrap(views({
    root: path.join(__dirname, '../app/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));

// 配置config
env.getContent().parse();

const orm = require('orm');


// 加载路由
const route = require('../lib/route').serve();

app.use(route.routes()).use(route.allowedMethods());

let port = parseInt(process.env.PORT || env.getEnv('ENV_PORT'));

app.listen(port);
