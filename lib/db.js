var mysql = require('mysql');
var dbConfig = {
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'wp486684',
    database: 'webhacker'
};


var db = mysql.createPool(dbConfig);

module.exports = db;