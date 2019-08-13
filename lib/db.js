var mysql = require('mysql');
var dbConfig = {
    connectionLimit: 20,
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b12dd5b02848c6',
    password: 'aa02943d',
    database: 'heroku_bbbbad86f15a6f6'
};

var db = mysql.createPool(dbConfig);

module.exports = db;