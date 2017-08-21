/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Base = require('./Base');
const helper = require('../../lib/helper');
const path = require('path');
const base = require('../../config/base');

/**
 * 用于做form层分发的中间件
 * @type {module.Init}
 */
module.exports = class Data extends Base {

    /**
     *
     * @param ctx
     * @param next
     */
    handle(ctx, next) {
        //todo 暂时没有想到很好的办法去获取到当前执行的method，这里先获取第三个好了
        let method = helper.ucfirst(ctx.url.split('/')[3].split('?').shift());
        let params = ctx.params;
        let controller = this.name;

        new Promise((reslove, reject) => {
            let validateFile = helper.withObj(path.join(base.rootPath, 'app/forms', controller, method));
            try {
                for (let param in params) {
                    validateFile['check' + helper.ucfirst(param)](params[param]);
                }
            } catch (err) {
                reject(err.message);
            }
            reslove();
        }).then(() => {
            next();
        }, (err) => {
            ctx.response.status = 403;
            ctx.response.body = err;
        });
    }
};
