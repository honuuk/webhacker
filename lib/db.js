const mysql = require('mysql');

let db;
const createConn = () => {
    db = mysql.createConnection({
        host: 'us-cdbr-iron-east-02.cleardb.net',
        user: 'b12dd5b02848c6',
        password: 'aa02943d',
        database: 'heroku_bbbbad86f15a6f6'
    });
    db.connect((error) => {
        if (error) { setTimeout(createConn, 2000); }
    });
    db.on('error', (error) => {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            return createConn();
        }

        throw error;
    });
}

db.connect();
module.exports = db;