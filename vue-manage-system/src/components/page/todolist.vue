<template>
  <div id="todolist">
    <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>demo</el-breadcrumb-item>
      <el-breadcrumb-item>todolist</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm" style="margin-bottom: 20px;">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="numberValidateForm.name" placeholder="请填写名字"></el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
        { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
        <el-input type="age" v-model.number="numberValidateForm.age" auto-complete="off" placeholder="请填写年龄"></el-input>

      </el-form-item>
      <div style="overflow:hidden;width: 100%;text-align: center">
        <el-button type="primary" @click="add()">添加</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </div>
    </el-form>

    <!--表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      center>
      <el-table-column prop="date" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button @click.native="showDetail(props.$index,tableData)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="warning" @click="dele()" v-show="this.tableData.length!=0">全部删除</el-button>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        numberValidateForm: {
          age: '',
          name: ''
        },
        num: 0,
      }
    },
    methods: {
//        重置的方法
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
//      添加数据
      add(){
        if (this.numberValidateForm.name=='') {
              this.$message({
                type:'warning',
                message:'请填写用户名哦'
              })
        } else {
          this.tableData.push({
            date: this.num++,
            name: this.numberValidateForm.name,
            age: this.numberValidateForm.age,
          });
        }
        this.numberValidateForm.name = '';
        this.numberValidateForm.age = '';
      },
//      删除全部数据
      dele(){
        this.$confirm('此操作将删除全部数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.tableData = [];
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
//      删除其中的某一项
      showDetail(index, rows){
        this.$confirm('此操作将删除此数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      }
    }
  }
</script>
<style>
  #todolist {
    width: 60%;
  }
#todolist .el-form-item{
  float: left;
}

</style>
