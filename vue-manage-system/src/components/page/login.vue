<template>
    <div id="login">
      <h2 class="login-title">Vue后台管理系统</h2>
      <div class="login-box">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="请填写用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请填写密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
        <p>ps:用户名和密码随便填写</p>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        ruleForm2: {
          pass: '',
          name: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//              存储用户名，在后台使用
             localStorage.setItem('username',this.ruleForm2.name);
            this.$router.push('/home')
          } else {
//              这里要使用路由拦截，当填写错误时，是不能进入其他页面的。在进入页面之前，也要判断是否登录
            this.$router.push('/login')
            this.$message('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style>
  .login{
    position: relative;
    width: 100%;
    height:100%;
  }
  .login-title{text-align: center;}
  .login-box{
    width:300px;
    height:160px;
    margin: 0 auto;
    padding:40px;
    border-radius: 5px;
    background: #2c3e50;
  }
  .el-form{
    text-align: left;
  }
  body {
    background-color: #ccc;
  }
  .el-form-item__label{
    text-align: inherit;
  }
  .el-form-item__content{text-align: center}
  #login{
    width: 380px;
    height:300px;
    position: absolute;
    left:0;
    right:0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  #login p{
    color: #fff;
    font-size:12px;
    text-align: center;
    margin-top:-10px;
  }
</style>
