/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const route = require('koa-router')();
const pathObj = require('path');
const base = require('../config/base');
const fs = require('fs');
const helper = require('../lib/helper');

module.exports = {

    /**
     * 遍历路由文件 web用'/' 其他用对应文件名
     * @returns {*}
     */
    serve() {
        helper.walkDir('../routes').map((item) => {
            let root = item.split('/').pop().split('.').shift();
            route.use(root === 'web' ? '/' : '/' + root, require(item).routes());
        });
        return route;
    },

    /**
     * 给路由包裹上方法
     * @param router
     * @returns {*}
     */
    wrapRoute(router) {
        let that = this;
        router.methods.map((method) => {
            router[method.toLowerCase()] = function (name, path, middleware) {
                let args = Object.values(arguments).map((value) => {
                    return that.parseMiddleware(value);
                });

                if (typeof path === 'string' || path instanceof RegExp) {
                    if (path.indexOf('@') > -1) {
                        middleware = args.pop();
                        path = name;
                        name = null;
                    } else {
                        middleware = args.splice(2);
                    }
                } else {
                    middleware = args.splice(1);
                    path = name;
                    name = null;
                }

                this.register(path, [method], middleware, {
                    name: name
                });

                return this;
            };
        });
        return router;
    },

    /**
     *
     * @param middleware
     * @returns {*}
     */
    parseMiddleware(middleware) {
        if (typeof middleware === 'string' && middleware.indexOf('@') > -1) {
            let parts = middleware.split('@'), root = pathObj.join(base.rootPath, 'app'),
                controllerPath = pathObj.join(root, 'controllers'), controller = parts.shift(), method = parts.pop(),
                middlewarePath = null;
            if (middleware.indexOf('#') > -1) {
                let middlewareParts = middleware.split('#');
                controller = middlewareParts.pop().split('@').shift();
                // 中间件
                middlewarePath = require(pathObj.join(root, 'middlewares', middlewareParts.shift()));
                middleware = [];
            }

            let currController = helper.withObj(pathObj.join(controllerPath, controller));

            Array.isArray(middleware) ? middleware = [new middlewarePath().handle.bind(currController), currController[method].bind(currController)] : middleware = currController[method].bind(currController);

        }
        return middleware;
    }

};

