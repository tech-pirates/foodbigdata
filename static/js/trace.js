function trace(trace) {
    var cookie = getCookie("username");
    $.ajax({
        url: "/trace",
        type: 'POST',
        data: {"cookie":cookie,
                "name":trace
        },
        dataType: 'json',
        success: function (data) {

        },
        error: function () {
            alert("error")
        }
    })
}