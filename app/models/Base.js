/**
 * created by Nine on 2017/8/16.
 */

'use strict';
const mysql = require('mysql');

/**
 *
 * @type {module.Base}
 */
module.exports = class Base {

    /**
     *
     * @returns {*|"orm".orm.ORM|any}
     */
    constructor() {
        this.config = require('../../config/mysql');
        this.connection = mysql.createConnection({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port
        });
        this.tableName = this.getTableName();
        this.connection.connect((err) => {
            console.log(err);
        });
        this.connection.connect(err => {
            if (err) {
                console.log(err);
            } else {
                return this.db = this.connection;
            }
        });
    }

    /**
     *
     */
    getTableName() {
    }
};