var dom2 = document.getElementById("container2");
var myChart2 = echarts.init(dom2);
var app = {};
var data = genData();

option = null;
myChart2.setOption({
	title: {
		text: 'Microelement in 100g Food',
		x:'center',
		textStyle: {
			color:'black',
			fontStyle: 'italic',		//文字字体的风格
			fontWeight:'bold',
			fontFamily:'serif',			//文字的字体
			fontSize:'20',
		},					
		
	},

    legend:{
        data:['Bicarbonate','Potassium','Calcium'],
        x:'right',
    },

    xAxis: {
        type: 'category',
        data: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]
    },
    yAxis: {
        type: 'value',
		data: []
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
            end: 60
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 10,
            end: 60
        }
    ],

    tooltip: {
	    trigger: 'axis',
	    axisPointer:{
	        type:'shadow',
        }
    },

    series: []
});

function genData() {

    var legendData = [];    //放置的是类名 name的值
    var seriesData = [];    //数组元素放置的是{name:xxxx,value:xxxx}的键值对 表示对应物品的个数

    var legendData_P = [];
    var seriesData_P = [];

    var legendData_C = [];
    var seriesData_C = [];

    var seriesDataTmp = [];
    var seriesData_PTmp = [];
    var seriesData_CTmp = [];

    $.ajax({
        url: "/micro",
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            legendData = data["legendData"];
            legendData_P = data["legendData1"];
            legendData_C = data["legendData2"];
            seriesDataTmp = data["seriesData"];
            seriesData_PTmp = data["seriesData1"];
            seriesData_CTmp = data["seriesData2"];
            var cell = {};
            var cell_P = {};
            var cell_C = {};
            for (var i = 0, len = seriesDataTmp.length; i < len; i++) {
                cell = {
                    name: seriesDataTmp[i][0],
                    value: seriesDataTmp[i][1],
                };
                cell_P = {
                    name: seriesData_PTmp[i][0],
                    value: seriesData_PTmp[i][1],
                };
                cell_C = {
                    name: seriesData_CTmp[i][0],
                    value: seriesData_CTmp[i][1],
                };
                seriesData.push(cell);
                seriesData_P.push(cell_P);
                seriesData_C.push(cell_C);
            }
            myChart2.setOption({
                series: [
                    {
                        name: 'Bicarbonate',
                        type: 'bar',
                        data: seriesData,
                    },
                    {
                        name:'Potassium',
                        type:'bar',
                        data: seriesData_P,
                    },
                    {
                        name:'Calcium',
                        type:'bar',
                        data: seriesData_C,
                    }
                ]
            });
        },
        error: function () {
            alert("microelement error")
        }
    });
}

    
