<template>
  <div id="echarts">
    <!--面包屑导航-->
  <el-breadcrumb separator="/" style="margin-bottom: 20px;">
    <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>echarts</el-breadcrumb-item>
  </el-breadcrumb>
    <!--引入echarts图表-->
    <div id="box1"></div>
    <div id="box2"></div>
    <div id="box3"></div>
    <div id="box4"></div>
  </div>
</template>

<script>
  var echarts = require('echarts');
export default{
  data(){
    return{
    }
  },
  mounted(){
      this.draw();
      this.drawbar();
      this.echartline();
      this.funnel()
  },
  methods:{
      draw(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('box1'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
    drawbar(){
      var myChart = echarts.init(document.getElementById('box2'));
      myChart.setOption({
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[
              {value:235, name:'视频广告'},
              {value:274, name:'联盟广告'},
              {value:310, name:'邮件营销'},
              {value:335, name:'直接访问'},
              {value:400, name:'搜索引擎'}
            ]
          }
        ]
      })
    },
    echartline(){
      var myChart = echarts.init(document.getElementById('box3'));
      var data = [];

      for (var i = 0; i <= 360; i++) {
        var t = i / 180 * Math.PI;
        var r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }
      myChart.setOption({
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: data
        }],
        animationDuration: 2000
      });

    },
    funnel(){
      var myChart = echarts.init(document.getElementById('box4'));
      myChart.setOption({
        title: {
          text: '漏斗图',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['展现','点击','访问','咨询','订单']
        },
        calculable: true,
        series: [
          {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: [
              {value: 60, name: '访问'},
              {value: 40, name: '咨询'},
              {value: 20, name: '订单'},
              {value: 80, name: '点击'},
              {value: 100, name: '展现'}
            ]
          }
        ]
      })
    }
  }
  }
</script>

<style>
  #box1,#box2,#box4{
    width: 500px;
    height:300px;
  }
#box3{
  width: 600px;
  height:300px;
}
</style>
