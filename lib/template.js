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
            <style>

            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
            @import url('https://fonts.googleapis.com/css?family=Nanum+Myeongjo&display=swap');
            body {
              margin: 0;
              font-family:'Roboto', sans-serif;
              box-sizing: border-box;
            }

            #navbar {
              overflow: hidden;
              background-color: white;
              padding: 25px 10px;
              transition: 0.4s;
              position: fixed;
              width: 100%;
              top: 0;
              z-index: 99;
            }

            #navbar a {
              float: left;
              color: black;
              text-align: center;
              padding: 12px;
              text-decoration: none;
              font-size: 18px;
              line-height: 25px;
              border-radius: 4px;
            }

            #navbar #logo {
              font-size: 40px;
              font-weight: bold;
              transition: 0.4s;
            }

            #navbar a:hover {
              background-color: white;
              color: black;
            }

            #navbar a.active {
              background-color: white;
              color: black;
            }

            #navbar-right {
              float: right;
            }

            @media screen and (max-width: 580px) {
              #navbar {
                padding: 20px 10px !important;
              }
              #navbar a {
                float: none;
                display: block;
                text-align: left;
              }
              #navbar-right {
                float: none;
              }
            }
            #footer{
              color:black;
              font-size: 13px;
              text-align: center;
              margin-top:100px;
              padding-top:70px;
              margin-bottom:100px;
            }
            #prefer{
              color:white;
              margin-top:100px;
              font-size:40px;
            }

            #grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin: 0 200px;
            }
            #grid2{
            display: grid;
            grid-template-rows: 600px 1fr;
            width:60%;
            text-align:left;
            margin:0 auto;
            }
            h1 {
              padding: 50px 0;
              font-weight: 400;
              text-align: center;
            }

              p {
                  margin: 0 0 20px;
                  line-height: 1.5;
                }
              .main {
                  min-width: 320px;
                  max-width: 800px;
                  margin: 0 0;
                  background: #ffffff;}

                section {
                    display: none;
                    padding: 20px 0 0;
                    border-top: 1px solid #ddd;}

                /*라디오버튼 숨김*/
                  input {
                      display: none;}

                label {
                    display: inline-block;
                    margin: 0 0 -1px;
                    padding: 15px 25px;
                    font-weight: 600;
                    text-align: center;
                    color: #bbb;
                    border: 1px solid transparent;}

                label:hover {
                    color: #2e9cdf;
                    cursor: pointer;}

                /*input 클릭시, label 스타일*/
                input:checked + label {
                      color: #555;
                      border: 1px solid #ddd;
                      border-top: 2px solid #2e9cdf;
                      border-bottom: 1px solid #ffffff;}

                #tab1:checked ~ #content1,
                #tab2:checked ~ #content2,
                #tab3:checked ~ #content3,
                #tab4:checked ~ #content4 {
                    display: block;}
                    }
                .menubar{
                border:none;
                border:0px;
                margin:0px;
                padding:0px;
                font: 67.5% "Lucida Sans Unicode", "Bitstream Vera Sans", "Trebuchet Unicode MS", "Lucida Grande", Verdana, Helvetica, sans-serif;
                font-size:14px;
                font-weight:bold;
                }

                .menubar ul{
                background: rgb(109,109,109);
                height:50px;
                list-style:none;
                margin:0;
                padding:0;
                }

                .menubar li{
                float:left;
                padding:0px;
                }

                .menubar li a{
                background: rgb(109,109,109);
                color:#cccccc;
                display:block;
                font-weight:normal;
                line-height:50px;
                margin:0px;
                padding:0px 25px;
                text-align:center;
                text-decoration:none;
                }

                .menubar li a:hover, .menubar ul li:hover a{
                background: rgb(71,71,71);
                color:#FFFFFF;
                text-decoration:none;
                }

                .menubar li ul{
                background: rgb(109,109,109);
                display:none; /* 평상시에는 드랍메뉴가 안보이게 하기 */
                height:auto;
                padding:0px;
                margin:0px;
                border:0px;
                position:absolute;
                width:200px;
                z-index:200;
                /*top:1em;
                /*left:0;*/
                }

                .menubar li:hover ul{
                display:block; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
                }

                .menubar li li {
                background: rgb(109,109,109);
                display:block;
                float:none;
                margin:0px;
                padding:0px;
                width:200px;
                }

                .menubar li:hover li a{
                background:none;
                }

                .menubar li ul a{
                display:block;
                height:50px;
                font-size:12px;
                font-style:normal;
                margin:0px;
                padding:0px 10px 0px 15px;
                text-align:left;
                }

                .menubar li ul a:hover, .menubar li ul li:hover a{
                background: rgb(71,71,71);
                border:0px;
                color:#ffffff;
                text-decoration:none;
                }

                .menubar p{
                clear:left;
                }
                .ddos{
                  font-size:11px;
                  color:rgb(109,109,109);
                  font-family:'Nanum Myeongjo',serif;
                }

            </style>
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
