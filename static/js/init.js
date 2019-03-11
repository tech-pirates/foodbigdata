window.onload = function () {

    //定时器每秒调用一次fnDate()
    setInterval(function () {
        fnDate();
    }, 1000);

    initData();
    recommend();
    checkCookie();

    //在这里添加所有页面加载时进行的页面
};

function recommend() {
    var cookie  = getCookie("username");
    $.ajax({
        url: "/getRecommed",
        type: 'POST',
        data:{"cookie":cookie},
        dataType: 'json',
        success: function (data) {


            var HTMLstrHead = '<table>\n' +
                '                <thead>\n' +
                '                <tr>\n' +
                '                    <th style="align-content: center">Food Code</th>\n' +
                '                    <th style="align-content: center">Product Name</th>\n' +
                '                </tr>\n' +
                '                </thead>\n' +
                '                <tbody>\n';

            var HTMLstrInn = "";
            for (var key in data) {
                var diction = data[key];
                var tempInn =
                    '                <tr>\n' +
                    '                    <td align = "left">' + diction["element_id"] + '</td>\n' +
                    '                    <td align = "left"><a href="' + diction["url"] + '" onclick="trace(' + diction["element_id"]+ ')">' + diction["product_name"] + '</a></td>\n' +
                    '                </tr>\n';
                HTMLstrInn = HTMLstrInn + tempInn;
            }

            var HTMLstrEnd =
                '                </tbody>\n' +
                '            </table>';
            document.getElementById("recommend").innerHTML = HTMLstrHead + HTMLstrInn + HTMLstrEnd;
        },
        error: function () {
            alert("please reconfirm your key words")
        }
    })
}
//js 获取当前时间
function fnDate() {
    var oDiv = document.getElementById("time");
    var date = new Date();
    var year = date.getFullYear();//当前年份
    var month = date.getMonth();//当前月份
    var data = date.getDate();//天
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var second = date.getSeconds();//秒
    var time = year + "-" + fnW((month + 1)) + "-" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    oDiv.innerHTML = time;
}

//补位 当某个字段不是两位数时补0
function fnW(str) {
    var num;
    str > 9 ? num = str : num = "0" + str;
    return num;
}

function initData() {
    $.ajax({
        url: "/initData",
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            var dataAll = data["dataAll"];
            var allergy = data["allergy"];
            var no_allergy = data["no_allergy"];
            document.getElementById("dataAll").innerHTML = dataAll;
            document.getElementById("allergy").innerHTML = allergy;
            document.getElementById("no_allergy").innerHTML = no_allergy;
        },
        error: function () {
            alert("error")
        }
    })

}