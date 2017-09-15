/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const route = require('../lib/Route');
const router = route.wrapRoute(require('koa-router')());

const routers = router
    .get('/' , 'User@index');

module.exports = routers;

