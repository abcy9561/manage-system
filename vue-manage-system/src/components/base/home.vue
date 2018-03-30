<template>
    <div id="home">
      <!--顶部-->
      <div class="header">
        <div class="logo">后台管理系统</div>
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src='img'/>{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInstall">设置</el-dropdown-item>
            <el-dropdown-item command="login">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="sider">
        <el-row>
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b" router>
              <el-menu-item index="/intro"><i class="el-icon-setting"></i><span slot="title">说明</span></el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>表单</span>
                </template>
                <el-menu-item index="/todolist">todolist</el-menu-item>
                <el-menu-item index="/form">Element表单</el-menu-item>
              </el-submenu>
              <el-menu-item index="/echarts">
                <i class="el-icon-setting"></i>
                <span slot="title">echarts</span>
              </el-menu-item>
              <el-menu-item index="/vuetable">
                <i class="el-icon-document"></i>
                <span slot="title">表格·增删改查</span>
              </el-menu-item>
              <el-menu-item index="/shopcar">
                <i class="el-icon-setting"></i>
                <span slot="title">购物车</span>
              </el-menu-item>
              <el-menu-item index="/frequently">
                <i class="el-icon-setting"></i>
                <span slot="title">常用功能</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!--主要内容-->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>
<style>
  @import "../../../static/home.css";
</style>
<script>
  export default {
    data() {
      return {
        img:'./static/logo.png',
        userName:''
      };
    },
    mounted(){
//       登录成功后，用户名显示为登录时的用户名
      this.userName=localStorage.getItem('username')
    },
    methods: {
//        点击下拉框的设置时，跳转到个人设置页面
//      点击退出时，跳转到登录界面，并且清除用户名
      handleCommand(command) {
          if(command==='userInstall'){
            this.$router.push(command)
          }else{
            this.$router.push(command)
            localStorage.clear()
          }
      }
    }
  }
</script>
