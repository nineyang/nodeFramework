/**
 * created by Nine on 2017/8/21.
 */

'use strict';

/**
 *
 * @type {module.Form}
 */
module.exports = class Form {

    /**
     *
     * @param value
     * @param type
     * @param errmsg
     * @returns {boolean|*}
     */
    validate(value, type, errmsg) {
        let defaultType = ['email', 'phone', 'url'];
        let needle = defaultType.indexOf(type);
        if (needle > -1) {
            let regular = '';
            switch (type) {
                case 'email':
                    regular = /\w+@\w+\.\w+/;
                    break;
                case 'phone':
                    regular = /1[35789]\d{9}/;
                    break;
                case 'url' :
                    regular = /http[s]:\/\/\w+/;
                    break;
            }
            if (!regular.test(value)) {
                throw new Error(errmsg);
            }
        } else {

        }
        return this;
    }
};

