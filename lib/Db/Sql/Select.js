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

    limit(num) {
        this.pushQuery('limit', parseInt(num));
        return this;
    }

    fetchOne(fields) {
        this.fields = fields;
        let res = this.querySelect();
    }

    parse() {
        let columns = this.parseFields(this.fields);
        let where = this.parseWhere();
        //    todo limit , order
        return "SELECT " + columns + " FROM " + this._table + where;
    }

    querySelect() {
        let sql = this.parse();
        //    执行统一调用父类执行
        this.query(sql);
    }


};