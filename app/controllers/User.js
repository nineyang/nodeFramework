/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const Base = require('./Base');
const helper = require('../../lib/helper');

/**
 *
 * @type {module.User}
 */
module.exports = class User extends Base {

    /**
     *
     * @param ctx
     * @param next
     */
    index(ctx, next) {
        ctx.body = 'hello api';
    }

    /**
     *
     * @param ctx
     * @param next
     */
    aaa(ctx, next) {
        ctx.body = 'aaaa';
    }


};

