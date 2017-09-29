/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Base = require('./Base');

/**
 *
 * @type {module.Select}
 */
module.exports = class Select extends Base {

    /**
     *
     * @param num
     * @returns {module.Select}
     */
    limit(num) {
        this.pushQuery('limit', parseInt(num));
        return this;
    }

    /**
     *
     * @param num
     * @returns {module.Select}
     */
    offset(num) {
        this.pushQuery('offset', parseInt(num));
        return this;
    }

    /**
     * 形式 1.a 2.'a,b' 3.['a' , 'b']
     * @param field
     * @returns {module.Select}
     */
    group(field) {
        if (!Array.isArray(field)) {
            field = field.split(',');
        }
        field.map((value) => {
            this.pushQuery('group', value);
        });
        return this;
    }

    /**
     * 形式 1.a 2.'a,b' 3.['a' , 'b']
     * @param field
     * @returns {module.Select}
     */
    order(field) {
        if (!Array.isArray(field)) {
            field = field.split(',');
        }
        field.map((value) => {
            this.pushQuery('order', value + " ASC ");
        });
        return this;
    }

    /**
     *
     * @param field
     * @returns {module.Select}
     */
    orderDesc(field) {
        if (!Array.isArray(field)) {
            field = field.split(',');
        }
        field.map((value) => {
            this.pushQuery('order', value + " DESC ");
        });
        return this;
    }


    /**
     * 分页
     * @param page
     * @param size
     * @returns {module.Select}
     */
    page(page, size) {
        this.offset((page - 1) * size).limit(size);
        return this;
    }

    /**
     * 获取单个字段
     * @param fields
     * @returns {Promise.<string>}
     */
    async fetchOne(fields) {
        this.fields = fields;
        this.limit(1);
        return await this.querySelect();
    }

    /**
     * 获取一行记录
     * @returns {Promise.<string>}
     */
    async fetchRow(fields) {
        this.fields = fields;
        this.limit(1);
        return await this.querySelect();
    }

    /**
     * 获取全部
     * @param fields
     * @returns {Promise.<string>}
     */
    async fetchAll(fields) {
        this.fields = fields;
        return await this.querySelect();
    }

    /**
     * 解析select
     * @returns {string}
     */
    parse() {
        let columns = this.parseFields(this.fields);
        let where = this.parseWhere();
        let page = this.parseLimit();
        let group = this.parseGroup();
        let order = this.parseOrder();
        return "SELECT " + columns + " FROM " + this._table + where + group + order + page;
    }

    /**
     * 执行sql
     * @returns {Promise.<string>}
     */
    async querySelect() {
        let sql = this.parse();
        //    执行统一调用父类执行
        let res = this.query(sql);
        let returnResult = '';
        await res.then((result) => {
            returnResult = result;
        }, (err) => {
            return false;
        });
        return returnResult;
    }


};