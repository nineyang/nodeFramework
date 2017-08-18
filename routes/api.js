/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const route = require('../lib/route');
const router = route.wrapRoute(require('koa-router')());

const routers = router
    .get('/', 'User@index')
    .get('/aa', 'User@aaa');

module.exports = routers;

