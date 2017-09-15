/**
 * created by Nine on 2017/8/16.
 */

'use strict';

const env = require('../lib/Env');

let mysql = {
    // module: 'sails-mysql',
    host: env.getEnv('DB_HOST') || 'localhost',
    port: env.getEnv('DB_PORT') || 3308,
    user: env.getEnv('DB_USER') || 'username',
    password: env.getEnv('DB_PASSWORD') || 'password',
    database: env.getEnv('DB_NAME') || 'test',

    charset: 'utf8',
    collation: 'utf8_general_ci'
};

module.exports = mysql;
