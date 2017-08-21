/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Form = require('../Form');

/**
 *
 * @type {module.Add}
 */
module.exports = class Add extends Form {

    /**
     *
     * @param name
     * @returns {*|Promise|boolean|any}
     */
    checkFirstName(name) {
        return this.validate(name, 'url', 'url格式有误')
            .validate(name, 'email', 'email格式有误');
    }

};

