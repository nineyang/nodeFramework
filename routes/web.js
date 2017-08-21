/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const route = require('../lib/Route');
const router = route.wrapRoute(require('koa-router')());

const routers = router
    .get('/', 'Data#Index@index');

module.exports = routers;

