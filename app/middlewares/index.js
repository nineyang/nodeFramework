/**
 * created by Nine on 2017/8/14.
 */

'use strict';

const helper = require('../../lib/Helper');
const path = require('path');

/**
 *
 * @type {{init: (*|module.Base.handle|handle|module.Init.handle)}}
 */
module.exports = {
    init: helper.withObj(path.join(__dirname , '/Init')).handle,
};


