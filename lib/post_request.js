var express = require('express')
var app = express()
var db = require('./db');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));

exports.create_process = function(request, response) {
    var post = request.body;
    db.query(`SELECT * FROM board`, function(error, cnt) {
        db.query(`
            INSERT INTO board VALUES(?, ?, ?)`, [post.title, post.content, cnt.length + 1],
            function(error, result) {
                if (error) {
                    throw error;
                }
                response.redirect('/page/4');
            });
    })


}
exports.page1 = function(request, response) {
    var post = request.body;
    db.query(`SELECT * FROM member WHERE id='${post.id}' and pw='${post.password}'`, function(error, cnt) {
        if (error) { response.send({ result: false }); } else {
            if (cnt.length > 0) {
                response.send({ result: true });
            } else {
                response.send({ result: false });
            }
        }
    });
}
exports.page2 = function(request, response) {
    var post = request.body;
    db.query(`SELECT * FROM student_info WHERE name='${post.name}' and s_id='${post.s_id}'`, function(error, cnt) {

        if (error) {
            response.send({ result: false, list: error.sqlMessage });
        } else {
            if (cnt.length > 0) {
                var i = 0;
                var list1 = '';
                while (i < cnt.length) {
                    list1 += `
                      <ul>
                        <li>name : <strong>${cnt[i].name}</strong></li>
                        <li>s_id : <strong>${cnt[i].s_id}</strong></li>
                        <li>grade : <strong>${cnt[i].grade}</strong></li>
                        <li>class : <strong>${cnt[i].class}</strong></li>
                      </ul>
                      `;
                    i++;
                }
                list1 += `<style >
                .bottom-line{
                  width:300px;
                  text-align:center;
                  border-bottom:1px solid #aaaaaa;
                  margin-top:10px;
                }
                .modal .container ul {
                    list - style: none;
                    width:300px;
                    margin-top:10px;
                }
                .modal .container li {
                display: inline - block;
                color:black;
            }

            </style> `;
                response.send({ result: true, list: list1 });
            } else {
                response.send({ result: false, list: '' });
            }
        }
    });


}
exports.page3 = function(request, response) {
    var post = request.body;
    db.query(`SELECT * FROM account_info WHERE account='${post.account}'`, function(error, cnt) {
        if (error) {
            response.send({ result: false });
        } else {
            if (cnt.length > 0) {
                response.send({ result: true });
            } else {
                response.send({ result: false });
            }
        }
    });
}
exports.page4 = function(request, response) {
    var post = request.body;
    db.query(`SELECT * FROM board WHERE numbers='${post.id}' `, function(error, cnt) {

        if (error) {
            response.send({ result: false, title: '', content: '' });
        } else {
            if (cnt.length > 0) {
                response.send({ result: true, title: cnt[0].title, content: cnt[0].content });
            } else {
                response.send({ result: false });
            }
        }
    });


}