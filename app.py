from flask import Flask, render_template, request, jsonify
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


# @app.route('/T123', methods=['GET', 'POST'])
# def T123():
#     if request.method == 'POST':
#         dic = {"data": "123"}
#         return jsonify(dic)
#

@app.route('/vitamin', methods=['GET', 'POST'])
def vitamin():
    if request.method == 'POST':
        legendData = []
        seriesData =[]
        selected = {}
        try :
            sqlStr = "select vName from vitamin"
            resultsTupleList = sql.select(sqlStr , "HD")
            for element in resultsTupleList:
                legendData.append(element[0])
            i = 0
            for element in legendData:
                i = i+1
                sqlStr = "select foodNumber from vitamin where vName = '" + element +"'"
                resultsTupleList = sql.select(sqlStr)
                value = int(resultsTupleList[0][0])
                cell = [element, value]
                seriesData.append(cell)
                selected[element] = i < 6
        except :
            print("error in SQL")
        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected" : selected
               }
        return jsonify(dic)

@app.route('/place', methods=['GET', 'POST'])
def place():
    if request.method == 'POST':
        legendData = []
        seriesData =[]
        selected = {}
        try :
            sqlStr = "select country from countryFoodNumber"
            resultsTupleList = sql.select(sqlStr , "HD")
            for element in resultsTupleList:
                legendData.append(element[0])
            i = 0
            for element in legendData:
                i = i+1
                sqlStr = "select foodNumber from countryFoodNumber where country = '" + element +"'"
                resultsTupleList = sql.select(sqlStr , "HD")
                value = int(resultsTupleList[0][0])
                cell = [element, value]
                seriesData.append(cell)
                selected[element] = i < 6
        except :
            print("error in SQL")
        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected" : selected
               }
        return jsonify(dic)


@app.route('/getRank', methods=['GET', 'POST'])
def getRank():
    if request.method == 'POST':
        goods = request.form.get("goods")
        goodsTable = ''
        sqlStr = "select * from " + goodsTable
        # sqlStr需要修改
        resultsTupleList = sql.select(sqlStr , "rank")
        return jsonify(goods)

    #
@app.route('/initData', methods=['GET', 'POST'])
def initData():
    if request.method == 'POST':
        sqlStr = "select * from foodAllergiesNum"
        # //需要修改
        resultsTupleList = sql.select(sqlStr , "HD")
        dataAll = int(resultsTupleList[0][0])
        allergy = int(resultsTupleList[0][1])
        no_allergy = int(resultsTupleList[0][2])
        dic = {
            "dataAll":dataAll,
            "allergy":allergy,
            "no_allergy":no_allergy
        }
        return jsonify(dic)




if __name__ == '__main__':
    app.run()
