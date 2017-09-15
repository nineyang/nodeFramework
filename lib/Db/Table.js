/**
 * created by Nine on 2017/8/22.
 */

'use strict';

/**
 *
 * @type {module.Table}
 */
module.exports = class Table {

    /**
     *
     * @param name
     * @param connection
     */
    constructor(name, connection) {
        this.name = name;
        this.connection = connection;
    }

    /**
     *
     * @param condition
     * @param fields
     */
    findBy(condition, fields) {
        let collect = this.connection.select(this.name, fields);
        this.parseCondition(collect, condition);
        collect.limit(1).fetchOne(fields);
    }

    /**
     *
     * @param id
     */
    get(id) {

    }

    /**
     *
     * @param sql
     * @param condition
     */
    parseCondition(sql, condition) {
        for (let item in condition) {
            sql.where(item + " = ?" , condition[item]);
        }
    }
};