/**
 * created by Nine on 2017/8/13.
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {

    _env: {},

    _defaultEnvFile: '.env',

    _content: '',

    /**
     *
     * @param value
     */
    set env(value) {
        this._defaultEnvFile += '.' + value;
    },

    /**
     *
     * @returns {string}
     */
    get env() {
        return this._defaultEnvFile;
    },

    /**
     *
     * @param key
     * @param def
     */
    getEnv(key, def = null) {
        return this._env[key] ? this._env[key] : def;
    },

    /**
     *
     * @param key
     * @param value
     */
    setEnv(key, value = null) {
        this._env[key] = value;
    },

    /**
     *
     * @param environment
     * @returns {exports}
     */
    getContent(environment = null) {
        if (environment != null) {
            this.env = environment;
        }
        try {
            this._content = fs.readFileSync(path.join(__dirname, '..', this.env), 'utf8');
        } catch (err) {
            console.error(err.path + ' not found');
        }
        return this;
    },

    /**
     *
     * @returns {exports}
     */
    parse() {
        this._content.split(/\r?\n/).map((value) => {
            if (value.length == 0) {
                return true;
            }
            //前面是#代表隐藏
            if (value.indexOf('#') > -1) {
                return true;
            }
            let parts = value.split('=');
            this.setEnv(parts.shift().trim(), parts.pop().trim());
        });
        return this;
    }
};
