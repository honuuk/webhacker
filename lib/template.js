var db = require('./db');
module.exports = {
    HTML: function(list, content) {
        return `
        <!DOCTYPE html>
        <html>

        <head>
            <meta charset="utf-8">
            <title>WEB HACKER</title>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/css/main.css">
            <link rel="stylesheet" type="text/css" href="/css/popup.css">
            <link rel="shortcut icon" href="/img/favicon.ico">
        </head>
        <body>
            <div class="header">
                <h1><a href="/">WEB HACKER</a></h1>
            </div>
            <div id="grid">
        <!-- 사이드 메뉴-->
        <div class="nav">


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
