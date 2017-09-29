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

    }


    getUserModel() {
        return new UserModel();
    }

};

