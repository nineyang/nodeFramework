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
    async findBy(condition, fields) {
        let collect = this.connection.select(this.name, fields);
        this.parseCondition(collect, condition);
        return await collect.fetchOne(fields);
    }

    /**
     *
     * @param condition
     * @param page
     * @param limit
     * @param fields
     * @param orders
     * @returns {Promise.<string>}
     */
    async listBy(condition, page = 0, limit = 0, fields = '*', orders) {
        let collect = this.connection.select(this.name, fields);
        this.parseCondition(collect, condition);
        if (orders) {
            if (typeof orders == 'string') {
                collect.order(orders);
            } else {
                for (let item in orders) {
                    console.log(orders);
                    if (orders[item].toLowerCase() == 'asc') {
                        collect.order(item);
                    } else {
                        collect.orderDesc(item);
                    }
                }
            }
        }
        if (page > 0 && limit > 0) {
            collect.page(page , limit);
        }

        return await collect.fetchAll(fields);
    }

    /**
     *
     * @param id
     */
    async get(id) {
        let collect = this.connection.select(this.name, fields);
        let condition = {
            id: id
        };
        this.parseCondition(collect, condition);
        return await collect.fetchOne('*');
    }

    /**
     *
     * @param sql
     * @param condition
     */
    parseCondition(sql, condition) {
        for (let item in condition) {
            sql.where(item + " = ?", condition[item]);
        }
    }
};