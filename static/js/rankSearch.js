
search = function () {
    var goods = document.getElementById("goods").value;
    $.ajax({
        url:"/getRank",
        type:'POST',
        data:{goods:goods},
        dataType: 'json',
        success: function (data) {

        },
        error: function () {
            alert("error")
        }
    })

};