var express = require('express')
var app = express()
var db = require('./db');
var fs = require('fs');
var template = require('./template.js');
var qs = require('querystring');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));

exports.home = function(request, response) {

    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM minortopic`, function(error2, result) {
            var list = template.list(topics, result);
            var html = template.HTML(list, 'welcome');

            response.send(html);
        });



    });

}
exports.page = function(request, response) {
    var id = request.params.id;
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM minortopic`, function(error2, result) {
            if (id === '4') {
                db.query(`SELECT * FROM board`, function(error3, data) {
                    // the data is passed to the callback in the second argument


                    var i = 0;
                    var boardlist = '';
                    while (i < data.length) {
                        boardlist += '<tr style="height:10px;"> ';
                        boardlist = boardlist + `<td class="no" style="text-align:center;">${i+1}</td>
<td class="title" style="text-align:center;">
<a href="#" id="${i+1}" class="board_list" onclick="document.getElementById('id02').style.display='block'">
    ${data[i].title}
</a>
</td></tr>`;
                        i++;
                    }
                    var cont = `
                    <div class="cont">


                    <h3>Cross Site Scripting(XSS) 란?</h3>
                    <p>
                    사이트 간 스크립팅(또는 크로스 사이트 스크립팅, 영문 명칭 cross-site scripting, 영문 약어 XSS)은 웹 애플리케이션에서 많이 나타나는 공격기법의 하나로 공격자가 웹 페이지에 악성 스크립트를 삽입하는 공격기법이다. 주로 여러 사용자가 보게 되는 게시판에 악성 스크립트가 담긴 글을 올리는 형태로 이루어진다. 이 공격기법은 웹 애플리케이션이 사용자로부터 입력 받은 값을 제대로 검사하지 않고 서버로 전송하여 사용할 경우 심각한 피해를 줄 수 있다. 이 공격기법으로 해커가 사용자의 정보(쿠키, 세션 등)를 탈취하거나, 자동으로 비정상적인 기능을 수행하게 할 수 있다. 주로 다른 웹사이트와 정보를 교환하는 식으로 작동하므로 사이트 간 스크립팅이라고 한다.
                    </p>
                    <h3>Cross Site Scripting(XSS) 공격의 예</h3>
                    <p>
                    게시판에 글을 작성할 때 글 내용에 다음과 같은 스크립트를 삽입하면 어떤 일이 벌어지는지 살펴보자
                    </p>
                     &ltscript&gt alert('XSS 성공!'); &lt/script&gt</br>
                     <p> 위 스크립트를 삽입하면 다른 사용자가 그 글을 읽었을 때 사용자의 화면에 'XSS 성공!' 이라는 경고창이 뜬다. 공격자가 게시판에 글을 작성할 때는 악성 스크립트가 텍스트 형태로 게시판 데이터베이스에 저장된다. 하지만 누군가 그 글을 읽어 데이터베이스에 저장된 글을 불러왔을때는 스크립트가 다음과 같이 나타난다.
                    </p>
                    <img src="/img/xss1.jpg">
                    <p>
                    텍스트 형태로 데이터베이스에 저장되어 있던 악성 스크립트는 누군가가 그 글을 읽었을 때 &ltscript&gt, &lt/script&gt 부분이 문법적 의미를 가지며 HTML의 script태그로 처리된다. 따라서 script태그 사이에 공격자가 입력한 코드가 실행되게 된다. 자바스크립트에서 alert() 함수는 경고창을 화면에 띄워주는 함수이므로 사용자가 글을 읽었을 때 'XSS 성공!' 이라는 경고창을 뜨게 된다. 공격자가 script 태그 사이에 alert와 같은 단순한 함수가 아닌 정보를 탈취할 수 있는 코드가 삽입한다면 심각한 피해를 입힐 수 있다.
                    </p>
                    SQL injection과 함께 웹 상에서 가장 기초적인 취약점 공격 방법의 일종으로, 악의적인 사용자가 공격하려는 사이트에 스크립트를 넣는 기법을 말한다. 공격에 성공하면 사이트에 접속한 사용자는 삽입된 코드를 실행하게 되며, 보통 의도치 않은 행동을 수행시키거나 쿠키나 세션 토큰 등의 민감한 정보를 탈취한다.
                    크로스 사이트 스크립팅이란 이름 답게, 자바스크립트를 사용하여 공격하는 경우가 많다. 공격 방법이 단순하고 가장 기초적이지만, 많은 웹사이트들이 XSS에 대한 방어 조치를 해두지 않아 공격을 받는 경우가 많다. 여러 사용자가 접근 가능한 게시판 등에 코드를 삽입하는 경우도 많으며, 경우에 따라서는 메일과 같은 매체를 통해서도 전파된다.
                    </p>
                    <h3>XSS의 공격법</h3><h4>1) 스크립트 태그</h4>
                    <p>
                    방법 : 스크립트 태그로 자바스크립트를 실행한다.
                    예시 : &ltscript&gtalert('XSS');&lt/script&gt
                    설명 : 스크립트 태그의 스크립트를 실행시킨다. 안타깝게도, 매우 정직한 방법이라 대부분의 사이트에서 막는 경우가 많다. 브라우저단에서 필터링 해주는 경우도 있다. 물론 예외도 있다.하지만 만들어진지 몇십 년 이상 되었거나, 무작정 막지도 않는 경우도 있다.
                    </p>
                    <h4>2) 자바스크립트 태그</h4>
                    <p>
                    방법 : 링크 태그로 자바스크립트를 실행한다.
                    예시 : &lta href="javascript:alert('XSS')"&gtXSS&lt/a&gt
                    설명 : 브라우저에서 about: 링크와 같이, javascript: 로 시작하는 링크는 스크립트를 실행시킨다. 스크립트 태그와 같이, javascript: 를 필터링하는 경우가 많아 많은 사이트에서 막는다.
                    </p>
                    <h4>3) 이벤트 속성</h4>
                    <p>
                    방법 : 이벤트 속성을 사용한다.
                    예시 : &ltimg src="#" onerror="alert('XSS')"&gt
                    설명 : 이벤트 속성으로 스크립트를 실행할 수 있다. 주로 on 으로 시작하는 속성이 이벤트 속성이다. 자주 사용되는 이벤트 속성으로는 onload onerror onclick 등이 있다. 물론, 이 방법 역시 '자바스크립트 링크' 방법만큼 많이 막혔다.
                    </p>
                    <h4>4) 블랙리스트 우회</h4>
                    <p>
                    방법 : 알려지지 않은 태그와 속성들을 사용한다.
                    예시 : &ltruby oncopy="alert('XSS')"&gtXSS&lt/ruby&gt
                    설명 : 블랙 리스트 방식으로 막는 사이트에 사용할 수 있다. 이벤트 속성 목록을 참고하자. 위의 방법들보다는 적게 막혔으나, 여전히 최근 웹사이트들에선 화이트리스트 방식 차단이 대부분이라, 막혔을 가능성이 높다.
                    </p>
                    <h4>5) 내용 난독화</h4>
                    <p>
                    방법 : 따옴표로 감싸는 문자열 사이에 공백 문자들을 넣고, HTML 인코드를 하여 난독화한다.
                    예시 : &lta href="&#x6A;&#x61;&#x76;&#x61;&#x73;&#xA;&#x63;&#x72;&#x69;&#x70;&#x74;&#xA;&#x3A;&#xA;&#x61;&#x6C;&#x65;&#x72;&#x74;&#xA;&#x28;&#x27;&#x58;&#x53;&#x53;&#x27;&#x29;"&gtXSS&lt/a&gt
                    설명 : 일부 브라우저에서 javascript: 링크 사이에 공백 문자가 들어갈 수 있고, HTML 인코드를 해도 디코드된 내용이 출력된다는 점을 이용한다. 여기에서는 '자바스크립트 링크' 방법과 사용하였지만, 당연히 다른 방법과 함께 사용할 수 있다.
                    </p>
                    <h4>6) 스크립트 난독화<h4>
                    <p>
                    방법 : <a href="http://utf-8.jp/public/aaencode.html">http://utf-8.jp/public/aaencode.html</a> 에서 자바스크립트 난독화.
                    예제 : <a href="https://namu.wiki/w/XSS/aaaenocde">https://namu.wiki/w/XSS/aaaenocde</a> 참조.
                    설명 : 스크립트를 일본어를 사용한 이모티콘들로 난독화한다. 스크립트 실행은 가능하지만, document.cookie 와 같은 단어를 막을 경우 사용하면 된다.
                     </p>
                                    </div>

                                            <div class="cont" style="display:none;">
                                               <br />
                                               <p>게시판의 글쓰기를 이용하여 게시글에 script코드를 삽입해 게시글을 클릭하였을때 XSS라는 경고창이 뜨도록 하시오.</p>
                                            <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">글쓰기</button>



                                            <div class="section-body">
                                                <div class="table1" align="center">
                                                    <table style="width:100%">
                                                        <colgroup>
                                                            <col style="width:72px">
                                                            <col>
                                                            <col style="width:100px">
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" class="no">번호</th>
                                                                <th scope="col" class="title">제목</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${boardlist}


                                                            <style>
                                                            th {
                                                                border-bottom: 0.1px solid white;
                                                            }

                                                            .section-body {
                                                                margin: 0 200px;
                                                            }
                                                        </style>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>






                                        <div id="id01" class="modal">

                                            <form class="modal-content animate" action="/create_process" method="post" autocomplete=off>
                                                <div class="imgcontainer">
                                                    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>

                                                </div>

                                                <div class="container">
                                                    <label for="title"><b>TITLE</b></label>
                                                    <input type="text" name="title" required>

                                                    <label for="content"><b>CONTENT</b></label><br />
                                                    <input type="textarea" name="content" required>

                                                    <button type="submit">WRITE</button>

                                                </div>


                                            </form>
                                        </div>
                                        <div id="id02" class="modal" >

                                            <div class="modal-content animate" style="min-height:400px; color:black;" >
                                                <div class="imgcontainer">
                                                    <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>

                                                </div>

                                                <div class="container">
                                                    <label for="title"><b>TITLE</b></label></br>
                                                    <div id="board_title"></div>

                                                    <label for="content"><b>CONTENT</b></label><br />
                                                    <div id="board_content"></div>


                                                </div>


                                            </div>
                                        </div>



                                        <script>
                                        $('.board_list').click( function(evt) {
                                            console.log('a');
                                            $('#board_title').html('');
                                            $('#board_content').html('');
                                                 $.ajax({
                                                     url: '/page4',
                                                     dataType: 'json',
                                                     type: 'POST',
                                                     data: {'id':evt.target.id},
                                                     success: function(result) {
                                                         if ( result['result'] == true ) {
                                                            $('#board_title').html(result['title']);
                                                            $('#board_content').html(result['content']);
                                                         }
                                                         else{
                                                              $('#board_content').html('조회결과 없음');
                                                         }
                                                     }
                                                 });
                                             })
                                            // Get the modal
                                            var modal = document.getElementById('id01');

                                            // When the user clicks anywhere outside of the modal, close it
                                            window.onclick = function(event) {
                                                if (event.target == modal) {
                                                    modal.style.display = "none";
                                                }
                                            }
                                            // Get the modal
                                            var modal1 = document.getElementById('id02');

                                            // When the user clicks anywhere outside of the modal, close it
                                            window.onclick = function(event) {
                                                if (event.target == modal1) {
                                                    modal1.style.display = "none";
                                                }
                                            }

                                        </script>

                                    </div>
                                    <div class="cont" style="display:none;">
                                        <h3>Cross Site Scripting(XSS) 방지기법</h3>

                    <p>
                    Cross Site Scripting(XSS)의 방지기법은 크게 입력값 검증 및 무효화와 출력값 검증 및 무효화 두 가지로 나뉜다. 입력값 검증 및 무효화는 공격자가 script 태그가 포함된 글을 작성하는지 확인하고 작성 글에 script 태그가 있다면 글 작성을 불가능하게 한다. 반면, 출력값 검증 및 무효화는 script 태그가 포함된 글이 작성되어 서버의 데이터베이스에 저장이 되었다 하더라도 누군가가 그 글을 읽어 데이터베이스에서 악성 스크립트를 불러올 때 script 태그가 문법적 의미를 잃고 텍스트로 출력이 된다.
                    </p>

                    <h4>입력값 검증 및 무효화</h4>
                    <p>
                    사용자의 입력에 &ltscript&gt와 같은 Cross Site Scripting(XSS) 공격에 사용될 수 있는 태그가 입력될 수 없게 블랙리스트를 생성하고 블랙리스트에 포함된 문자가 입력으로 들어오면 막아준다. 하지만 &ltScript&gt 처럼 s만 대문자로 바꿔줘도 블랙리스트를 우회할 수 있다. 따라서 Cross Site Scripting(XSS) 공격이 시도될 수 있는 다양한 상황에 대비해야 한다. Cross Site Scripting(XSS) 공격이 시도될 수 있는 상황들은 다음과 같다.
                    </p>
                    &ltscript&gtalert('XSS');&lt/script&gt</br>
                    &lta href="javascript:alert('XSS')"&gtXSS&lt/a&gt</br>
                    &ltimg src="#" onerror="alert('XSS')"&gt</br>
                    <p>
                    이 외에도 다양한 방법으로 공격자가 Cross Site Scripting(XSS) 공격을 시도할 수 있기 때문에 모든 경우를 방어하는것은 사실상 불가능하다고 할 수 있다.
                    </p>
                    <h4>출력값 검증 및 무효화</h4>
                    <p>
                    입력값 검증에서 사용된 필터를 우회할 수 있기 때문에 출력시에도 출력값을 검증한다. Cross Site Scripting(XSS) 공격은 기본적으로 &ltscript&gt 태그를 사용하기 때문에 공격을 차단하기 위해 태그 문자 &lt, &gt 등이 서버에서 브라우저로 전송될 때 참조문자로 변형되어 전송된다. 위험문자에 대한 참조문자는 다음과 같다.
                    </p>
                    <img src="/img/xss2.jpg">
                    <p>
                    이렇게 참조문자로 변환하면 사용자는 &ltscript&gt가 &ltscript&gt로 보이지만 HTML 문서에서는 &amplt;script&ampgt;로 나타나 script 태그가 문법적 의미를 잃고 브라우저에서 일반 문자로 인식한다. 하지만, 이 경우는 모든 HTML 태그를 막아버리기 때문에 각종 스타일을 적용시켜야하는 사이트에서는 맞지 않을 수도 있다.
                    </p>

                    </div>
                                     `;
                    var list = template.list(topics, result);
                    var html = template.HTML(list, cont);
                    response.send(html);

                });
            } else {
                fs.readFile(`./data/${id}`, 'utf8', function(err, data) {
                    // the data is passed to the callback in the second argument

                    var cont = data;
                    var list = template.list(topics, result);
                    var html = template.HTML(list, cont);
                    response.send(html);
                });

            }
        });



    });
}
exports.show_4 = function(request, response) {
    var num = request.params.num;
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM minortopic`, function(error2, result) {

            db.query(`SELECT * FROM board `, function(error, row) {
                var i = 0;
                var list = template.list(topics, result);
                while (i < row.length) {
                    if (i === num - 1) {
                        var content = `<h2>TITLE</h2>
                <h2>${row[i].title}</h2>
                                <h2>CONTENTS</h2>
                                <p>${row[i].content}</p>
                                `;
                    }
                    i++;
                }
                var html = template.HTML(list, content);
                response.send(html);
            });



        });
    });

}
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
                        <li style="width:120px">name : <strong>${cnt[i].name}</strong></li>
                        <li style="width:150px">s_id : <strong>${cnt[i].s_id}</strong></li>
                        <li style="width:80px">grade : <strong>${cnt[i].grade}</strong></li>
                        <li style="width:230px">class : <strong>${cnt[i].class}</strong></li>
                      </ul>
                      `;
                    i++;
                }
                list1 += `<style >
                .modal .container ul {
                    list - style: none;
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
