/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const AbstractController = require('./AbstractController');

/**
 *
 * @type {module.Index}
 */
module.exports = class Index extends AbstractController {

    /**
     *
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async index(ctx, next) {
        ctx.body = await ctx.render('index', {
            title: 'nine'
        });
    }
};
