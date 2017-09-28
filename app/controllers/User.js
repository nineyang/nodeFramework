/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const AbstractController = require('./AbstractController');
const helper = require('../../lib/Helper');
const UserModel = require('../models/User');

/**
 *
 * @type {module.User}
 */
module.exports = class User extends AbstractController {

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
    async index(ctx, next) {

    }

    async detail(ctx, next) {
        let userModel = this.getUserModel();
        console.log(await userModel.getTable().findBy({'id':ctx.params.id}));
        // let user = await userModel.getTable().findBy({'id': ctx.params.id});
        // if (!user) {
        //    todo 404页面
        // }
    }


    getUserModel() {
        return new UserModel();
    }

};

