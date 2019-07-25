var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wp486684',
    database: 'sqli'
});
db.connect();
module.exports = db;