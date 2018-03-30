<template>
  <div id="user">
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>相片设置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

</script>

<style>
  #user p{
    color: red;
  }
</style>
