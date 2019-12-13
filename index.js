var express = require('express')
var app = express()
var post_request = require('./lib/post_request');
var db = require('./lib/db');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.static('public'));

//post request
app.post('/create_process', function(request, response) {
    post_request.create_process(request, response);
});
app.post('/page1', function(request, response) {
    post_request.page1(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page2', function(request, response) {
    post_request.page2(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page3', function(request, response) {
    post_request.page3(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page4', function(request, response) {
    post_request.page4(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});

//get request
app.get('/page/:id', function(request, response) {
    if (request.params.id == '4') {
        db.query(`SELECT * FROM board`, function(error3, boardlist) {
            response.render('4', { boardlist: boardlist });
        });
    } else response.render(request.params.id);
});

app.get('/', function(request, response) {
    response.render('main')
});


app.listen(process.env.PORT || 3000);