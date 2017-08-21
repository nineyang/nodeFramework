/**
 * created by Nine on 2017/8/21.
 */

'use strict';

let validate = (value, type, cb) => {
    let defaultType = ['email', 'phone', 'url'];
    let needle = defaultType.indexOf(type);
    if (needle === -1) {
        let regular = '';
        switch (type) {
            case 'email':
                regular = '/\w+@\w+\.\w+/';
                break;
            case 'phone':
                regular = '/1[35789]\d{9}/';
                break;
            case 'url' :
                regular = '/http[s]:\/\/\w+/';
                break;
        }
        return value.test(regular);
    } else {

    }
};

module.exports = validate();