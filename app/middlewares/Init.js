/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const Base = require('./Base');

/**
 *
 * @type {module.Init}
 */
module.exports = class Init extends Base {

    /**
     *
     * @param ctx
     * @param next
     */
    async handle(ctx, next) {
        console.log('aa');
        await next();
    }
};

