//此处要对取出的goods元素进行判断是否为可传入数据库的字符
checkGoods = function (goods) {
    var wordList = ["energy", "energy_from_fat", "fat", "saturated_fat", "_butyric_acid", "_caproic_acid", "_caprylic_acid",
        "_capric_acid", "_lauric_acid", "_myristic_acid", "_palmitic_acid", "_stearic_acid", "_arachidic_acid", "_behenic_acid",
        "_lignoceric_acid", "_cerotic_acid", "_montanic_acid", "_melissic_acid", "monounsaturated_fat", "polyunsaturated_fat",
        "omega_3_fat", "_alpha_linolenic_acid", "_eicosapentaenoic_acid", "_docosahexaenoic_acid", "omega_6_fat", "_linoleic_acid",
        "_arachidonic_acid", "_gamma_linolenic_acid", "_dihomo_gamma_linolenic_acid", "omega_9_fat", "_oleic_acid", "_elaidic_acid",
        "_gondoic_acid", "_mead_acid", "_erucic_acid", "_nervonic_acid", "trans_fat", "cholesterol", "carbohydrates", "sugars", "_sucrose",
        "_glucose", "_fructose", "_lactose", "_maltose", "_maltodextrins", "starch", "polyols", "fiber", "proteins", "casein", "serum_proteins",
        "nucleotides", "salt", "sodium", "alcohol", "vitamin_a", "beta_carotene", "vitamin_d", "vitamin_e", "vitamin_k", "vitamin_c",
        "vitamin_b1", "vitamin_b2", "vitamin_pp", "vitamin_b6", "vitamin_b9", "vitamin_b12", "biotin", "pantothenic_acid", "silica",
        "bicarbonate", "potassium", "chloride", "calcium", "phosphorus", "iron", "magnesium", "zinc", "copper", "manganese", "fluoride",
        "selenium", "chromium", "molybdenum", "iodine", "caffeine", "taurine", "ph", "fruits_vegetables_nuts", "collagen_meat_protein_ratio",
        "cocoa", "chlorophyl", "carbon_footprint", "nutrition_score_fr", "nutrition_score_uk", "glycemic_index", "water_hardness"];

    if (goods === '')
        goods = "energy";
    var len = wordList.length;
    var arr = [];
    var reg = new RegExp(goods);
    for (var i = 0; i < len; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (wordList[i].match(reg)) {
            arr.push(wordList[i]);
        }
    }
    if (arr.length < 1) {
                return ""
    }
    var tempLength = arr[0].length;
    var arrLength = arr.length;
    var resultIndex = 0;
    for (var i = 0; i < arrLength; i++) {
        if (arr[i].length < tempLength)
            resultIndex = i;
    }
    return arr[resultIndex]
};


search = function () {
    let goods = document.getElementById("goods").value;
    goods = checkGoods(goods);
    document.getElementById("goods").value = goods;
    if (goods == "") {
        alert("please reconfirm your key words")
    }
    $.ajax({
        url: "/getRank",
        type: 'POST',
        data: {goods: goods},
        dataType: 'json',
        success: function (data) {


            var HTMLstrHead = '<table>\n' +
                '                <thead>\n' +
                '                <tr>\n' +
                '                    <th>Food Code</th>\n' +
                '                    <th>Product Name</th>\n' +
                '                    <th>Content</th>\n' +
                '                </tr>\n' +
                '                </thead>\n' +
                '                <tbody>\n';

            var HTMLstrInn = "";
            for (var key in data) {
                var diction = data[key];
                var tempInn =
                    '                <tr>\n' +
                    '                    <td>' + diction["element_id"] + '</td>\n' +
                    '                    <td><a href="' + diction["url"] + '" onclick="trace(' + diction["element_id"]+ ')">' + diction["product_name"] + '</a></td>\n' +
                    '                    <td>' + diction["element_amount"] + '</td>\n' +
                    '                </tr>\n';
                HTMLstrInn = HTMLstrInn + tempInn;
            }

            var HTMLstrEnd =
                '                </tbody>\n' +
                '            </table>';
            document.getElementById("rank").innerHTML = HTMLstrHead + HTMLstrInn + HTMLstrEnd;
        },
        error: function () {
            alert("please reconfirm your key words")
        }
    })

};