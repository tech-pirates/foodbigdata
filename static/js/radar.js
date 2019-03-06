var dom = document.getElementById("radar");
var myChart = echarts.init(dom);
var app = {};
option = null;


var lineStyle = {
    normal: {
        width: 1,
        opacity: 0.5
    }
};
myChart.setOption({
    backgroundColor: '#fff',
    title: {
        text: 'The average content of food ingredients in each country',
        left: 'center',
        textStyle: {
            color: '#000'
        }
    },
    legend: {
        bottom: 5,
        data: ['China',"Russia",'France'],
        itemGap: 20,
        textStyle: {
            color: '#000',
            fontSize: 14
        },
        selectedMode: 'single'
    },
    radar: {
        indicator: [
            {name: 'energy J/100g', max: 4000},
            {name: 'fat g/100g', max: 100},
            {name: 'proteins g/100g', max: 100},
            {name: 'fiber g/100g', max: 100},
            {name: 'starch g/100g', max: 100},
            {name: 'sugars g/100g', max: 50}
        ],
        shape: 'circle',
        splitNumber: 5,
        name: {
            textStyle: {
                color: 'rgb(0, 0, 0)'
            }
        },
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
            }
        },
        splitArea: {
            show: 1
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },

});
var dataChina = [
    // [55,9,56,0.46,18,6,1],
];
var dataRussia = [

];

var dataFrance = [

];
$.ajax({
    url: "/radar",
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            dataFrance = data["dataFrance"];
            dataRussia = data["dataRussia"];
            dataChina = data["dataChina"];
            myChart.setOption({
                series: [
            {
                name: 'China',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataChina,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            },
            {
                name: 'France',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataFrance,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#71AFF7'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            },
            {
                name: 'Russia',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataRussia,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#B14CDF'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.05
                    }
                }
            }
        ]
              });
            },
        error: function () {
            alert("ChartRadar error")
        }
});