<template>
    <div id="intro">
      <el-breadcrumb separator="/" style="margin-bottom: 20px;">
        <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>说明</el-breadcrumb-item>
      </el-breadcrumb>
      <!--主体-->
      <div class="readme">
        <h2><i class="el-icon-star-on"></i>README.md</h2>
        <div class="readme-wrap">
          <h2>Vue后台管理系统</h2>
          <p>Vue+ElementUI后台管理系统</p>
          <el-checkbox checked>登录界面</el-checkbox>
          <ul>
            <li>后台管理系统首屏，登录界面，本项目使用localStorage存储数据处理</li>
          </ul>
          <el-checkbox checked>用户名设置</el-checkbox>
          <ul>
            <li>用户名可设置可注销。设置跳转到设置界面；注销就返回到登录界面</li>
          </ul>
          <el-checkbox checked>表单</el-checkbox>
          <ul>
            <li>表单实现Todolist以及ElementUI的表单</li>
          </ul>
          <el-checkbox checked>echarts图表</el-checkbox>
          <ul>
            <li>echarts常用图表形式</li>
          </ul>
          <el-checkbox checked>表格</el-checkbox>
          <ul>
            <li>表格数据的增删改查</li>
          </ul>
          <el-checkbox checked>购物车效果</el-checkbox>
          <ul>
            <li>jsonp请求数据的展现，从商品展现，选购，购物车系统呈现</li>
          </ul>
          <h3>项目详细搭建步骤可见：<a href="http://www.webforend.com/example-2/881.html" target="_blank">从零开始使用Vue+ElementUI搭建后台管理系统</a></h3>
        </div>
      </div>
    </div>

</template>
<style>
  #intro{
    padding-bottom:60px;
  }
  .readme ul{
    margin-top:20px;
    margin-bottom:20px;
  }
.readme li{
  margin-left:50px;
}
  .readme-wrap h2{
    margin-top:20px;
  }
  .readme-wrap p{
    margin-top:20px;
    margin-bottom:20px;
  }
</style>
<script>
export default{
    data(){
        return{

        }
    }
}
</script>
