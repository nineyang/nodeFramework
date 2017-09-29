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
        let user = await userModel.getTable().listBy({'id': ctx.params.id}, 1, 10, '*', {'name': 'asc', 'id': 'desc'});
        let user = await userModel.getDb().limit(10).offset(1).order('name').orderDesc(['id' , 'age']).fetchRow('name');
    }


    getUserModel() {
        return new UserModel();
    }

};

