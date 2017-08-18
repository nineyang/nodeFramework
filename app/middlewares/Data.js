/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Base = require('./Base');

/**
 *
 * @type {module.Init}
 */
module.exports = class Data extends Base {

    handle(ctx, next) {
        console.log(this);
        ctx.body = 'this is init';
    }
};
