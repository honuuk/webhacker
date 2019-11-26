var express = require('express')
var app = express()
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var db = require('./lib/db');
var fs = require('fs');
var template = require('./lib/template.js');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.post('/create_process', function(request, response) {
    topic.create_process(request, response);
});
app.get('/show_4/:num', function(request, response) {
    topic.show_4(request, response);
    var exec = require('child_process').exec;
    var child = exec('mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');

});
app.post('/page1', function(request, response) {
    topic.page1(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page2', function(request, response) {
    topic.page2(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page3', function(request, response) {
    topic.page3(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.post('/page4', function(request, response) {
    topic.page4(request, response);
    var exec = require('child_process').exec;
    var child = exec(' mysql -u b12dd5b02848c6 -paa02943d -h us-cdbr-iron-east-02.cleardb.net heroku_bbbbad86f15a6f6 < sqli.sql');
});
app.get('/page/:id', function(request, response) {
    topic.page(request, response);
});

app.get('/', function(request, response) {
    topic.home(request, response);
});


app.listen(process.env.PORT || 3000);