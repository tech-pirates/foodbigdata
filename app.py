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
        # //放置的是类名 name的值

        # /数组元素放置的是{name:xxxx,
        #     //        value:xxxx}的键值对 表示对应物品的个数


        # //放置的是{name:0/1,
        #     //        }的键值对
        #     //  1表示选中用于组成饼状图
        cell = {}
        # //用于存放键值对
        try :
            sqlStr = "select vName from vitamin"
            resultsTupleList = sql.select(sqlStr)
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

        print(legendData)
        print(seriesData)
        print(selected)
        dic = {"legendData": legendData,
               "seriesData": seriesData,
               "selected" : selected
               }

        return jsonify(dic)


if __name__ == '__main__':
    print(sql.getVersion())
    app.run()
