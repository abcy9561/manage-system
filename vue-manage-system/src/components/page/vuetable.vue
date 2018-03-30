<template>
  <div id="table">
  <!--面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>表格</el-breadcrumb-item>
  </el-breadcrumb>
    <!--表格-->
    <!--表格的增删改查，使用本地json文件，vue-resource请求数据-->
    <div class="vuetable">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
    <el-button type="danger" icon="el-icon-delete" @click.native="handleSelect()" :disabled="this.select.length === 0">批量删除</el-button>
      <el-select v-model="value" placeholder="请选择">
        <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
      <el-input placeholder="关键词查找" style="width: 150px" v-model="keyWord"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <!-- 表格主要内容 -->
      <el-table :data="data" border style="width: 100%;margin-top: 15px;" @selection-change="selsChange" :default-sort = "{prop: 'price', order: 'descending'}" :highlight-current-row="true">
        <el-table-column type="selection" label="" width="40" align="center"></el-table-column>
        <el-table-column prop="num" label="编号" width="180" align="center"></el-table-column>
        <el-table-column prop="course" label="项目名称" width="180" align="center"></el-table-column>
        <el-table-column prop="starttime" label="开始时间" sortable align="center"></el-table-column>
        <el-table-column prop="endtime" label="结束时间" sortable align="center"></el-table-column>
        <el-table-column prop="price" label="价格" sortable align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template  slot-scope="props">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger" @click.native="delesingle(props.$index,tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
      <!--添加信息的对话框-->
      <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="编号" :label-width="formLabelWidth" prop="num1">
            <el-input v-model="form.num1" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="course1">
            <el-select v-model="form.course1" placeholder="请选择项目">
              <el-option label="雅思" value="雅思"></el-option>
              <el-option label="托福" value="托福"></el-option>
              <el-option label="留学" value="留学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="8">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" style="width: 80%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" style="width: 80%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="price1">
            <el-input v-model="form.price1"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
  </div>
  </div>
</template>

<script>
export default{
    data(){
        return{
          options: [{
          value: '留学课程',
          label: '留学课程'
        }, {
          value: '雅思',
          label: '雅思'
        }, {
          value: '托福',
          label: '托福'
        }],
          value: '',
          keyWord:'',
          del_list:[],
          tableData:[],
          dialogFormVisible: false,
          select:[],//显示选中的值
          form: {
            num1: '',
            course1: '',
            date1:'',
            date2:'',
            delivery: false,
            type: [],
            resource: '',
            desc:'',
            price1:''
          },
          rules:{
              num1:[{required:true,message:'请输入编号',trigger:'blur'}],
            course1:[{required:true,message:'请输入项目名称',trigger:'blur'}],
            date1:[{type:'date',required:true,message:'请选择开始日期',trigger:'blur'}],
            date2:[{type:'date',required:true,message:'请选择结束日期',trigger:'blur'}],
            price1:[{required:true,message:'请填写价格',trigger:'blur'}]
          },
          formLabelWidth: '120px'
        }
    },
    computed:{
        data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = true;
                    if(is_del){
                        if(d.course.indexOf(self.value) > -1 && (d.num.indexOf(self.keyWord) > -1 || d.course.indexOf(self.keyWord) > -1)){
                            return d;
                        }
                    }
                })
            }
    },
    mounted(){
       this.get()
    },
    methods:{
      // 请求数据
        get(){
          this.$http.get('./static/vuetable.json').then((res)=>{
             
              this.tableData=res.data.list
         
          })
        },
//      显示选中的值
      selsChange(val){
        this.select=val
      },
      // 批量删除，在原数组中删除选中的值
      // 从原数组中删除与this.select数组中重复的值
      handleSelect(){
        this.$confirm('批量删除吗？','提示',{
           confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
            for(let i=0;i<this.tableData.length;i++){
              for(let j=0;j<this.select.length;j++){
                if(this.select[j]==this.tableData[i]){
                  this.tableData.splice(i,1)
                   i=i-1
                }
              }
        }
         this.$message({
              type: 'success',
            message: '删除成功!'
          });
          return this.tableData

        }).catch(()=>{
          this.$message({
              type: 'info',
            message: '已取消删除'
          })
        })
    },
        // 删除单个表单,index表示当前要删除的项，rows表示整个数据
        // 还有一种解决办法是：获取当前选择项的ID值，然后将ID值传入数据，重新请求整个数据文件
        delesingle(index, rows){
        this.$confirm('此操作将删除此数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          rows.splice(index, 1);
          console.log(index,rows)
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
//      新增信息 确定和重置功能
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//              修改时间格式
            function dateTimeAll(datetime) {
              let month=datetime.getMonth()+1;
              let date=datetime.getDate();
              let time1=month+'月'+date+'日';
              return time1
            }
            let time2=dateTimeAll(this.form.date1);
            let time3=dateTimeAll(this.form.date2);
              this.tableData.push({
                num:this.form.num1,
                course:this.form.course1,
                starttime:time2,
                endtime:time3,
                price:this.form.price1
              });
            this.form.num1='';
            this.form.course1='';
            this.form.date1='';
            this.form.date1='';
            this.form.price1='';
            this.dialogFormVisible=false;
          } else {
            this.$message({
              type:'warning',
              message:'请填写详细'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
//        // 下拉框选中，值改变
//   // 选中哪个课程，然后将tableData里面对应课程的数组展现即可
//       changeValue(value){
//         let obj={};
// //        获取select的值
//         obj=this.options.find((item)=>{
//           return item.value===value;
//         });
// //      同原数组的属性值与下拉框中的值对应，重新生成新的数组
//         let arr=this.tableData.filter(function (item) {
//           return  item.course===obj.label
//         });
//         this.tableData=arr;
//       }
     
      }
}
</script>

<style>
  .vuetable{
    margin-top:20px;
  }
  #table{
    width: 90%;
  }
  .fromdialog input{
    width: 450px;
  }
</style>
