/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const helper = {};

const fs = require('fs');

/**
 *
 * @param name
 * @returns {*}
 */
helper.withObj = name => {
    let tmp = require(name);
    return new tmp;
};

helper.fileExists = file => {


};

/**
 * 遍历目录
 * @param dir
 * @returns {Array}
 */
helper.walkDir = dir => {
    let dirList = [];
    fs.readdirSync(dir).map((item) => {
        let currFile = dir + '/' + item;
        if (fs.statSync(currFile).isDirectory()) {
            dirList = dirList.concat(helper.walkDir(currFile));
        } else {
            dirList.push(currFile);
        }
    });
    return dirList;
};

module.exports = helper;