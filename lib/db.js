var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b12dd5b02848c6',
    password: 'aa02943d',
    database: 'heroku_bbbbad86f15a6f6'
});
db.connect(function(err) {
    if (err) {
        setTimeout(handleDisconnect, 2000);
    }
});


db.on('error', function(err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db;