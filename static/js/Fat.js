var dom1 = document.getElementById("container1");
var myChart1 = echarts.init(dom1);
var app = {};
var data = genData();

option = null;
myChart1.setOption({
	title: {
		text: 'Fat(Joule) in 100g Food',
		x:'center',
		textStyle: {
			color:'black',
			fontStyle: 'italic',		//文字字体的风格
			fontWeight:'bold',
			fontFamily:'serif',			//文字的字体
			fontSize:'20',
		},					
		
	},
	
    xAxis: {
        type: 'category',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,76, 77, 78, 79, 80, 81,
            82, 83, 84, 85, 86, 88, 89, 91, 92, 93, 94, 95, 96, 99, 100]
    },
    yAxis: {
        type: 'value',
		data: []
    },

    tooltip: {
	    trigger: 'axis',
	    axisPointer:{
	        type:'line',
        }
    },

    dataZoom:[
        {
            type: 'slider',
            xAxisIndex: 0,
            start:10,
            end: 60
        },
        {
            type:'inside',
            xAxisIndex: 0,
            start:10,
            end:60,
        },
        {
            type:'slider',
            yAxisIndex: 0,
            start: 10,
            end: 40
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 10,
            end: 40
        }
    ],
    series: [{
        name: 'Joule',
        type: 'line',
        smooth: true
    }]
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
        url: "/line",
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            legendData = data["legendData"];
            seriesDataTmp = data["seriesData"];
            var cell = {};
            for (var i = 0, len = seriesDataTmp.length; i < len; i++) {
                cell = {
                    name: seriesDataTmp[i][0],
                    value: seriesDataTmp[i][1]
                };
                seriesData.push(cell);
            }
            selected = data["selected"];
            myChart1.setOption({
                series: {
                    data: seriesData,
                },
            });
        },
        error: function () {
            alert("line error")
        }
    });
}

    
