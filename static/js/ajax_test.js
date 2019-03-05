
submit = function () {
    $.ajax({
        url:"/T123",
        type:'POST',
        data:{},
        dataType: 'json',
        success: function (data) {
            alert(data["data"])
        },
        error: function () {
            alert("error")
        }
    });
};

