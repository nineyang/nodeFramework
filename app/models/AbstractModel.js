/**
 * created by Nine on 2017/8/16.
 */

'use strict';
const Table = require('../../lib/Db/Table');
const Connector = require('../../lib/Db/Connector');
const helper = require('../../lib/Helper');

/**
 *
 * @type {module.Base}
 */
module.exports = class AbstractModel {

    /**
     *
     * @returns {*}
     */
    getDb() {
        return new Connector();
    }

    /**
     *
     * @returns {*}
     */
    getTable(){
        return this.getDb().getTable(this.name);
    }

    get(id) {
        // return this.getTable.findBy({'id' : id});
    }


    getRedis() {

    }

    getMongodb() {

    }

};