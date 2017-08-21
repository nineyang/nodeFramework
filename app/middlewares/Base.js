/**
 * created by Nine on 2017/8/14.
 */

'use strict';

/**
 *
 * @type {module.Base}
 */
module.exports = class Base {

    /**
     *
     */
    handle(ctx , next) {
        // todo 这里后面用error模板输出好了
        ctx.response.status = 404;
        ctx.response.body = 'method handle has not fount';
    }
};

