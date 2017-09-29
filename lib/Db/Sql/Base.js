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
     * @param table
     * @param connection
     */
    constructor(table, connection) {
        this._table = table;
        this._connection = connection;
        this._query = {};
        //    绑定的参数
        this._bind = [];
    }

    /**
     *
     */
    where() {
        this.pushQuery('where', arguments[0]);
        this._bind.push(arguments[1]);
    }

    /**
     *
     * @param key
     * @param value
     */
    pushQuery(key, value) {
        if (!this._query[key]) {
            this._query[key] = [];
        }
        this._query[key].push(value);
    }

    /**
     * 解析where数组
     * @returns {string}
     */
    parseWhere() {
        if (!this.check('where')) return "";
        return " WHERE " + this._query['where'].reduce((prev, next) => {
            return prev + " AND " + next;
        });
    }

    /**
     * 解析字段
     * 形式:1.null 查询所有 2. 'id, name' 3. ['id' , 'name'] 4. {'id' : 'ids' , 'name' : 'firstName'}前者为字段 后者为as结果
     * @param fields
     */
    parseFields(fields) {
        let type = Object.prototype.toString.call(fields), returnStr = "";
        switch (type) {
            case '[object Null]':
                returnStr = "*";
                break;
            case '[object String]':
                returnStr = fields;
                break;
            case '[object Array]':
                returnStr = fields.reduce((prev, next) => {
                    return prev + "," + next;
                });
                break;
            case '[object Object]':
                returnStr = Object.keys(fields).map((key) => {
                    return key + " AS " + fields[key];
                }).join(" , ");
                break;
            default:
                returnStr = "*";
                break;
        }
        return " " + returnStr + " ";
    }

    /**
     *
     * @returns {*}
     */
    parseLimit() {
        if (!this.check('limit')) return "";

        return " LIMIT " + (this.check('offset') ? this._query['offset'] + " , " : "") + this._query['limit'];
    }

    /**
     *
     * @returns {*}
     */
    parseGroup() {
        if (!this.check('group')) return "";

        return " GROUP BY " + this._query['group'].join(",");
    }

    /**
     *
     * @returns {*}
     */
    parseOrder() {
        if (!this.check('order')) return "";
        return " ORDER BY " + this._query['order'].join(",");
    }

    /**
     *
     * @param key
     * @returns {boolean}
     */
    check(key) {
        if (this._query[key] && this._query[key].length > 0) {
            return true;
        }
        return false;
    }

    /**
     * 公共的执行sql方法
     * @param sql
     */
    async query(sql) {
        console.log(sql);
        return new Promise((resolve, reject) => {
            this._connection.query(sql, this._bind, async (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    }
};

