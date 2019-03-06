var dom = document.getElementById("containerPlace");
var myChart = echarts.init(dom);
var app = {};
option = null;
var data = genData();

myChart.setOption({
    title: {
        text: 'Big Data Era of Food',
        subtext: 'the data of each county',
        x: 'center',
        textStyle:{
            fontSize:40
        },
        subtextStyle:{
            fontSize:24
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        fontSize: 20
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: [],
        selected: {},
        textStyle:{
            fontSize:30
        },
    },
    series: [
        {
            name: 'numbers of food',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    label:{
                        fontSize:20,
                    },
                }
            }
        }
    ]
});



function genData() {

    var legendData = [];
    //放置的是类名 name的值
    var seriesData = [];
    //数组元素放置的是{name:xxxx,
    //        value:xxxx}的键值对 表示对应物品的个数
    var selected = {};
    //放置的是{name:0/1,
    //        }的键值对
    //  1表示选中用于组成饼状图
    var seriesDataTmp = []

    $.ajax({
        url: "/place",
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            legendData = data["legendData"];
            seriesDataTmp = data["seriesData"];
            var cell = {};
            for(var i = 0,len = seriesDataTmp.length; i<len; i++){
                    cell = {name:seriesDataTmp[i][0],
                    value:seriesDataTmp[i][1]};
                    seriesData.push(cell);
            }
            selected = data["selected"];
          myChart.setOption({
              legend: {
                  data:legendData,
                  selected:selected,
              },
              series: {
                  data:seriesData,
              },
          });
        },
        error: function () {
            alert("ChartPlace error")
        }
    });

    ///最重要的几个数值
}