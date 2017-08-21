/**
 * created by Nine on 2017/8/17.
 */

'use strict';

const helper = require('../../lib/Helper');
const base = require('../../config/base');
const path = require('path');

/**
 *
 * @type {module.Base}
 */
module.exports = class Base {

    /**
     *
     */
    constructor() {
        this.db = null;
    }

    /**
     *
     * @returns {null|*}
     */
    getDb() {
        if (this.db === null) {
            this.db = helper.withObj(path.join(base.rootPath , 'app/models/Base'));
        }
        return this.db;
    }

    getTest(){
        console.log('this is test');
    }

};

