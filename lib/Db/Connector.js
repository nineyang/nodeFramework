/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Select = require('./Sql/Select');
const mysql = require('mysql');
const env = require('../../lib/Env');
const Table = require('./Table');

module.exports = class Connector {

    constructor() {
        this.table = {};
    }

    /**
     * 单例生产
     * @returns {Connection|*}
     */
    getConnection() {
        if (this.connection) return this.connection;
        this.connection = mysql.createConnection({
            host: env.getEnv('DB_HOST'),
            user: env.getEnv('DB_USER'),
            password: env.getEnv('DB_PASSWORD'),
            database: env.getEnv('DB_NAME'),
            port: env.getEnv('DB_PORT')
        });
        this.connection.connect(err => {
            if (err) {
                console.log(err.message);
            } else {
                return this.db = this.connection;
            }
        });
        return this.connection;
    }

    /**
     *
     * @param tableName
     * @returns {module.Table}
     */
    getTable(tableName) {
        return this.table[tableName] ? this.table[tableName] : this.table[tableName] = new Table(tableName, this);
    }

    /**
     *
     * @param table
     * @returns {module.Select}
     */
    select(table) {
        return new Select(table, this.getConnection());
    }
};

