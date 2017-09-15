/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Base = require('./AbstractModel');

/**
 *
 * @type {module.User}
 */
module.exports = class User extends Base {

    /**
     *
     */
    constructor(){
        super();
        this.name = 'user';
    }

};

