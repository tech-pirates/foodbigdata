from flask import Flask, render_template, request, jsonify, make_response
import SQLdatabase as sql

app = Flask(__name__)
app.config['SECRET_KEY'] = "dfdfdffdad"


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/index.html')
def index():
    return render_template('index.html')


@app.route('/vitamin.html')
def generic():
    return render_template('vitamin.html')


@app.route('/rankSearch.html')
def elements():
    return render_template('rankSearch.html')


@app.route('/radar.html')
def radarHTML():
    return render_template('radar.html')


@app.route('/line.html')
def line_chart():
    return render_template("line.html")


@app.route('/vitamin', methods=['GET', 'POST'])
def vitamin():
    if request.method == 'POST':
        legendData = []
        seriesData = []
        selected = {}
        try:
            sqlStr = "select vName from vitamin"
            resultsTupleList = sql.select(sqlStr, "HD")
            for element in resultsTupleList:
                legendData.append(element[0])
            i = 0
            for element in legendData:
                i = i + 1
                sqlStr = "select foodNumber from vitamin where vName = '" + element + "'"
                resultsTupleList = sql.select(sqlStr, "HD")
                value = int(resultsTupleList[0][0])
                cell = [element, value]
                seriesData.append(cell)
                selected[element] = i < 6
        except:
            print("error in SQL")
        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected": selected
               }
        return jsonify(dic)


@app.route('/place', methods=['GET', 'POST'])
def place():
    if request.method == 'POST':
        legendData = []
        seriesData = []
        selected = {}
        try:
            sqlStr = "select country from countryFoodNumber"
            resultsTupleList = sql.select(sqlStr, "HD")
            for element in resultsTupleList:
                legendData.append(element[0])
            i = 0
            for element in legendData:
                i = i + 1
                sqlStr = "select foodNumber from countryFoodNumber where country = '" + element + "'"
                resultsTupleList = sql.select(sqlStr, "HD")
                value = int(resultsTupleList[0][0])
                cell = [element, value]
                seriesData.append(cell)
                selected[element] = i < 6
        except:
            print("error in SQL")
        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected": selected
               }
        return jsonify(dic)


@app.route('/getRank', methods=['GET', 'POST'])
def selectRank():
    if request.method == 'POST':
        goods = request.form.get("goods")
        goodsTable = goods + "_100g_rank"
        sqlStr = "select * from " + goodsTable + " order by element_amount DESC"
        resultsTupleList = sql.select(sqlStr, "rank")
        dic = {}
        for tupleList in resultsTupleList:
            tempdic = {}
            tempdic["element_id"] = tupleList[0]
            tempdic["element_amount"] = tupleList[1]
            tempdic["product_name"] = tupleList[2]
            tempdic["url"] = tupleList[3]
            dic[str(tupleList[0])] = tempdic
        return jsonify(dic)


@app.route('/initData', methods=['GET', 'POST'])
def initData():
    if request.method == 'POST':
        sqlStr = "select * from foodAllergiesNum"
        resultsTupleList = sql.select(sqlStr, "HD")
        dataAll = int(resultsTupleList[0][0])
        allergy = int(resultsTupleList[0][1])
        no_allergy = int(resultsTupleList[0][2])
        dic = {
            "dataAll": dataAll,
            "allergy": allergy,
            "no_allergy": no_allergy
        }
        return jsonify(dic)


@app.route('/radar', methods=['GET', 'POST'])
def radar():
    if request.method == 'POST':
        sqlStr = "select countries_en,energy_100g,fat_100g,proteins_100g,fiber_100g,starch_100g,sugars_100g from radar"
        resultsTupleList = sql.select(sqlStr, "HD")
        dataChina = []
        dataRussia = []
        dataFrance = []
        dataSW = []
        averageData = []
        for elements in resultsTupleList:
            l = list(elements)
            if l[0] == "China":
                l.pop(0)
                dataChina.append(l)
            elif l[0] == "Russia":
                l.pop(0)
                dataRussia.append(l)
            elif l[0] == "France":
                l.pop(0)
                dataFrance.append(l)
            elif l[0] == 'Switzerland':
                l.pop(0)
                dataSW.append(l)
            elif l[0] == "avarage":
                l.pop(0)
                averageData.append(l)
        dic = {
            "dataChina": dataChina,
            "dataFrance": dataFrance,
            "dataRussia": dataRussia,
            "dataSW": dataSW,
            "averageData": averageData,
        }
        return jsonify(dic)


@app.route('/line', methods=['GET', 'POST'])
def line():
    if request.method == 'POST':
        legendData = []
        seriesData = []
        selected = {}
        try:
            sqlStr = "select fat_100g from curveOfFoodFat"
            resultsTupleList = sql.select(sqlStr, "HD")
            for element in resultsTupleList:
                legendData.append(element[0])

            legendData1 = legendData.sort()
            i = 0
            for element in legendData:
                i = i + 1
                sqlStr = "select numberOfFood from curveOfFoodFat where fat_100g = '" + str(element) + "'"
                resultsTupleList = sql.select(sqlStr, "HD")
                value = int(resultsTupleList[0][0])
                cell = [element, value]
                seriesData.append(cell)
                selected[element] = i < 6
        except:
            print("error in SQL_Line")

        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected": selected
               }
        return jsonify(dic)


@app.route('/micro', methods=['GET', 'POST'])
def micro():
    if request.method == 'POST':
        legendData1 = []
        seriesData1 = []
        selected1 = {}

        legendData1_P = []
        seriesData1_P = []

        legendData1_C = []
        seriesData1_C = []

        try:
            # bicarbonate的数据
            sqlStr1 = "select bicarbonate_100g from curveOfBicarbonate"
            resultsTupleList1 = sql.select(sqlStr1, "HD")
            for element1 in resultsTupleList1:
                legendData1.append(element1[0])

            sqlStr2 = "select numberOfItem from curveOfBicarbonate"
            resultsTupleList2 = sql.select(sqlStr2, "HD")
            for element1 in resultsTupleList2:
                seriesData1.append(element1[0])

            legendData2 = legendData1.sort()
            seriesData2 = seriesData1.sort(reverse=True)

            seriesData1 = tuple(zip(legendData1, seriesData1))
            seriesData1 = list(seriesData1)
            seriesDataList = seriesData1
            for x in range(0, len(seriesData1)):
                seriesDataList[x] = list(seriesData1[x])

            seriesData1 = seriesDataList
            seriesData1.insert(6, [0.7, 0])
            seriesData1.insert(7, [0.8, 0])
            i = 0
            for element1 in legendData1:
                selected1[element1] = i < 6
            # bicarbonate的数据完

            # potassium的数据
            sqlStr1_P = "select potassium_100g from curveOfPotassium"
            resultsTupleList_P1 = sql.select(sqlStr1_P, "HD")
            for element_P in resultsTupleList_P1:
                legendData1_P.append(element_P[0])

            sqlStr2_P = "select numberOfItem from curveOfPotassium"
            resultsTupleList_P2 = sql.select(sqlStr2_P, "HD")
            for element_P in resultsTupleList_P2:
                seriesData1_P.append(element_P[0])

            seriesData1_P = tuple(zip(legendData1_P, seriesData1_P))
            seriesData1_P = list(seriesData1_P)
            seriesDataList_P = seriesData1_P
            for x in range(0, len(seriesData1_P)):
                seriesDataList_P[x] = list(seriesData1_P[x])

            seriesData1_P = seriesDataList_P
            seriesData2_P = seriesData1_P.sort()
            # potassium的数据完

            # calcium的数据
            sqlStr1_C = "select calcium_100g from curveOfCalcium"
            resultsTupleList_C1 = sql.select(sqlStr1_C, "HD")
            for element_C in resultsTupleList_C1:
                legendData1_C.append(element_C[0])

            sqlStr2_C = "select numberOfItem from curveOfCalcium"
            resultsTupleList_C2 = sql.select(sqlStr2_C, "HD")
            for element_C in resultsTupleList_C2:
                seriesData1_C.append(element_C[0])

            seriesData1_C = tuple(zip(legendData1_C, seriesData1_C))
            seriesData1_C = list(seriesData1_C)
            seriesDataList_C = seriesData1_C
            for x in range(0, len(seriesData1_C)):
                seriesDataList_C[x] = list(seriesData1_C[x])

            seriesData1_C = seriesDataList_C
            seriesData2_C = seriesData1_C.sort()
            # calcium的数据完



        except:
            print("error in micro_Line")

        dic = {"legendData": legendData1,
               "seriesData": seriesData1,
               "selected": selected1,
               "legendData1": legendData1_P,
               "seriesData1": seriesData1_P,
               "legendData2": legendData1_C,
               "seriesData2": seriesData1_C,
               }

        return jsonify(dic)


@app.route('/getCurve', methods=['GET', 'POST'])
def getCurve():
    sqlStr = "select vitamin_100g,vitamin_a,vitamin_c,vitamin_d,vitamin_e from curveOfVitamin"
    resultsTupleList = sql.select(sqlStr, "HD")
    data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    data3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    data4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for tupleList in resultsTupleList :
        index = int(tupleList[0]*100-1)
        data1[index] = tupleList[1]
        data2[index] = tupleList[2]
        data3[index] = tupleList[3]
        data4[index] = tupleList[4]
    dic = {"data1": data1,
           "data2": data2,
           "data3": data3,
           "data4": data4,
           }
    return jsonify(dic)


@app.route('/trace', methods=['GET', 'POST'])
def trace():
    if request.method == 'POST':
        cookie = request.form.get("cookie")
        productName = request.form.get("name")
        sqlStr = "insert into clinkProduct(cookie,foodCode) values ('"+cookie+"','"+str(productName)+"')"
        sql.insert(sqlStr, "HD")
        dict ={}
        return jsonify(dict)


@app.route('/getRecommed', methods=['GET', 'POST'])
def getRecommed():
    if request.method == 'POST':
        cookie = request.form.get("cookie")
        sqlStr = "select * from commendedFood where cookie = '"+ str(cookie)+"' order by FoodWeight DESC"
        resultsTupleList = sql.select(sqlStr, "HD")
        dic = {}
        for tupleList in resultsTupleList:
            tempdic = {}
            tempdic["element_id"] = tupleList[0]
            tempdic["product_name"] = tupleList[1]
            tempdic["url"] = tupleList[3]
            dic[str(tupleList[0])] = tempdic
        return jsonify(dic)


if __name__ == '__main__':
    app.run()
