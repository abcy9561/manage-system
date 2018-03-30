<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
     
            <el-select v-model="value" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="雅思" value="雅思"></el-option>
                <el-option key="2" label="托福" value="托福"></el-option>
            </el-select>
            <el-input v-model="keyWord" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="num" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="course" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                value: '',
                keyWord: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
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
        methods: {
            getData(){
                let self = this;
                self.$http.get('./static/vuetable.json').then((res) => {
                    self.tableData = res.data.list;
                })
            },
            // search(){
            //     this.is_search = true;
            // },
            // formatter(row, column) {
            //     return row.course;
            // },
            // filterTag(value, row) {
            //     return row.tag === value;
            // },
            // handleEdit(index, row) {
            //     this.$message('编辑第'+(index+1)+'行');
            // },
            // handleDelete(index, row) {
            //     this.$message.error('删除第'+(index+1)+'行');
            // },
            // delAll(){
            //     const self = this,
            //         length = self.multipleSelection.length;
            //     let str = '';

            //     for (let i = 0; i < length; i++) {
            //         str += self.multipleSelection[i].num + ' ';
            //     }
            //     self.$message.error('删除了'+str);
            //     self.multipleSelection = [];
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
