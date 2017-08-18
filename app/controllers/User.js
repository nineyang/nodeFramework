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
     */
    constructor() {
        super();
        this.name = 'User';
    }

    /**
     *
     * @param ctx
     * @param next
     */
    index(ctx, next) {
        ctx.body = 'hello api';
    }


    add(ctx, next) {
        ctx.body = 'hello , add';
    }

    getUserModel() {

    }

};

