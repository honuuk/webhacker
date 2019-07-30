var db = require('./db');
module.exports = {
    HTML: function(list, content) {
        return `
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="utf-8">
            <title>WEB HACKER</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  <!--수정-->
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
            <link rel="shortcut icon" href="/img/favicon.ico">
        </head>
        <body>
            <div id="grid2">
            <div style="margin-top:100px;font-size:100px;font-weight:bold;">
              <p style="color:#148CFF; margin-bottom:0;">Web</p>
              <p>Hacker</p>
              <p class="ddos">서비스 거부 공격 또는 디오에스/도스(DoS)는 시스템을 악의적으로 공격해<br> 해당 시스템의 자원을 부족하게 하여 원래 의도된 용도로 사용하지 못하게 하는 공격이다.<br>특정 서버에게 수많은 접속 시도를 만들어 다른 이용자가 정상적으로 서비스 이용을 하지 못하게 하거나,<br> 서버의 TCP 연결을 바닥내는 등의 공격이 이 범위에 포함된다. 수단, 동기, 표적은 다양할 수 있지만</p>
            </div>
            <div>
                  <div class="main" style="margin-top:20px;">
                      <input id="tab1" type="radio" name="tabs" checked>
                      <label for="tab1">Step 1</label>

                      <input id="tab2" type="radio" name="tabs">
                      <label for="tab2">Step 2</label>

                      <input id="tab3" type="radio" name="tabs">
                      <label for="tab3">Step 3</label>
                      </div>
            </div>
            </div>
        <!-- 사이드 메뉴-->
        <div class="menubar">  <!--수정-->


<ul>
 <li><a href="#">Home</a></li>
 ${list}
 </ul>
            <script>
                //사이드메뉴 드롭다운
                var dropdown = document.getElementsByClassName("dropdown-btn");

                var i;

                for (i = 0; i < dropdown.length; i++) {
                    dropdown[i].addEventListener("click", function() {
                        this.classList.toggle("active");

                        var dropdownContent = this.nextElementSibling;
                        if (dropdownContent.style.display === "block") {
                            dropdownContent.style.display = "none";
                        } else {
                            dropdownContent.style.display = "block";
                        }
                    });
                }
            </script>
        </div>


        <!--content부분  -->
        <div style="border-left: 1px solid white;">
            <!--탭 부분  -->
            <div id="anna">//건드리지마
            <script>
                    function show(evt,num) {
                        var section=document.getElementsByClassName("cont");
                        for(var i=0;i<section.length;i++){
                            section[i].style.display='none';
                        }
                        section[num-1].style.display='block';
                        var tablinks = document.getElementsByClassName("tablinks");
                    for (var i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace(" active", "");
                    }

                    // Show the current tab, and add an "active" class to the button that opened the tab

                    evt.currentTarget.className += " active";
                    }


                </script>
                <ul id="elsa" style="padding-left:0px;">
                    <li class="tablinks active" onclick="show(event,1)">Tap1</li>
                    <li class="tablinks" onclick="show(event,2)">Tap2</li>
                    <li class="tablinks" onclick="show(event,3)">Tap3</li>
                </ul>
                <style>
                    #elsa li {
                        user-select: none;
                        display: block;
                        float: left;
                        cursor: pointer;
                        color: white;
                        text-align: center;
                        padding: 8px 16px 14px;
                        transition: 0.5s;
                    }

                    #elsa li:hover {
                        background-color: #2b2b2b;
                    }
                </style>

            </div>
            <br />


            <div class="content">

                ${content}//노건들

            </div>
        </div>
    </div>

    <div id="footer">
    <p> Copyright © 2019 webhacker Corporation. All Right Reserved</p>
    </div>

    </body>
    </html>
    `;
    },
    list: function(topics, result) {
        var list = '';
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href="#">${topics[i].topic}</a><ul>`;


            var j = 0;
            while (j < result.length) {
                if (result[j].topic === topics[i].topic) {
                    list = list + `<li><a href="/page/${result[j].id}">${result[j].minortopic}</a></li>`;
                }
                j++;
            }
            list = list + `</ul></li>`;
            i++;
        }
        return list;
    }
}
