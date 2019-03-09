var dom1 = document.getElementById("vitamin1");
var CureChart1 = echarts.init(dom1);
var app = {};
CureChart1.setOption({
    title: {
        text: 'Vitamin-a'
    },
    xAxis: {
        type: 'category',
        data: ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
});

var dom2 = document.getElementById("vitamin2");
var CureChart2 = echarts.init(dom2);
var app = {};
CureChart2.setOption({
    title: {
        text: 'Vitamin-c'
    },
    xAxis: {
        type: 'category',
        data: ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
});

var dom3 = document.getElementById("vitamin3");
var CureChart3 = echarts.init(dom3);
var app = {};
CureChart3.setOption({
    title: {
        text: 'Vitamin-d'
    },
    xAxis: {
        type: 'category',
        data: ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
});

var dom4 = document.getElementById("vitamin4");
var CureChart4 = echarts.init(dom4);
var app = {};
CureChart4.setOption({
    title: {
        text: 'Vitamin-e'
    },
    xAxis: {
        type: 'category',
        data: ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
});

$.ajax({
    url: "/getCurve",
    type: 'POST',
    data: {},
    dataType: 'json',
    success: function (data) {
        var data1 = data["data1"];
        var data2 = data["data2"];
        var data3 = data["data3"];
        var data4 = data["data4"];
        CureChart1.setOption({
            series: [{
                data: data1,
                type: 'line',
                smooth: true
            }],
        });
        CureChart2.setOption({
            series: [{
                data: data2,
                type: 'line',
                smooth: true
            }],
        });
        CureChart3.setOption({
            series: [{
                data: data3,
                type: 'line',
                smooth: true
            }],
        });
        CureChart4.setOption({
            series: [{
                data: data4,
                type: 'line',
                smooth: true
            }],
        })
    },
    error: function () {
        alert("error")
    }
});