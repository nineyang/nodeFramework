/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const Base = require('./Base');

/**
 *
 * @type {module.Index}
 */
module.exports = class Index extends Base {

    /**
     *
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async index(ctx, next) {

        ctx.body = await ctx.render('index', {
            name: 'nine'
        })
    }

    /**
     *
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async aa(ctx, next) {
        ctx.body = await ctx.render('index', {
            name: 'nine'
        })
    }
};
