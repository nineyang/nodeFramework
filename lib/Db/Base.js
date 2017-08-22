/**
 * created by Nine on 2017/8/18.
 */

'use strict';

/**
 *
 * @type {module.Base}
 */
module.exports = class Base {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this._connection = connection;
        this._query = [];
    }

    /**
     *
     * @returns {*}
     */
    get connection() {
        return this._connection;
    }

    /**
     *
     * @returns {Array}
     */
    get query() {
        return this._query;
    }


};

