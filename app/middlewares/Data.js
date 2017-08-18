/**
 * created by Nine on 2017/8/18.
 */

'use strict';

const Base = require('./Base');
const helper = require('../../lib/helper');
const path = require('path');

/**
 *
 * @type {module.Init}
 */
module.exports = class Data extends Base {

    handle(ctx, next) {
        let method = helper.ucfirst(ctx.url.split('/').pop().split('?').shift());
        let params = ctx.params;
        let controller = 'User';
        method = 'Add';
        let checkFile = require(path.join('../forms' , controller , method));
        for (let param in params){
            checkFile['check' + helper.ucfirst(param)].call(this , params[param]);
        }


        ctx.body = 'this is init';
    }
};
