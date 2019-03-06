
search = function () {
    var goods = document.getElementById("goods").value;
    $.ajax({
        url:"/getRank",
        type:'POST',
        data:{goods:goods},
        dataType: 'json',
        success: function (data) {
            var HTMLstrHead = '<table>\n' +
                '                <thead>\n' +
                '                <tr>\n' +
                '                    <th>Product Name</th>\n' +
                '                    <th>url</th>\n' +
                '                    <th>Content</th>\n' +
                '                </tr>\n' +
                '                </thead>\n' +
                '                <tbody>\n' ;
            var HTMLstrInn =
                '                <tr>\n' +
                '                    <td>Item 1</td>\n' +
                '                    <td>123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</td>\n' +
                '                    <td>29.99</td>\n' +
                '                </tr>\n' ;
            var HTMLstrEnd =
                '                </tbody>\n' +
                '            </table>';
            document.getElementById("rank").innerHTML = HTMLstrHead + HTMLstrInn + HTMLstrEnd;
        },
        error: function () {
            alert("error")
        }
    })

};