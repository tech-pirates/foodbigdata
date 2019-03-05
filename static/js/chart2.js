var dom = document.getElementById("container2");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            return params.data;
        },
        axisPointer: {
            animation: false
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}