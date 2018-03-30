<template>
  <div id="shopcar">
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/intro' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车系统</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 全选 -->
        <div id="appbox">
          <el-checkbox label="全选" id="allId" v-model="allData.parCheck" @change="allSelect()"></el-checkbox>
        <!-- 列表 -->
        <ul class="box">
            <li v-for="(item,index) in dataList" :key="item.id">
              <el-checkbox  @change="singleSelect(index)" v-model="item.isCheck"></el-checkbox>  
                <span>
                    <img :src=item.img alt="">
                </span>
                <el-button type="primary"  @click="add(index)" size="small">+</el-button>
                <!-- <el-input >{{item.num}}</el-input> -->
                <a href="">{{item.num}}</a>
                <el-button type="primary"  @click="dele(index)" size="small">-</el-button>
              
                <span>单价：{{item.price}}</span>
                价格：
                <span class="price">{{item.num*item.price}}</span>
                <el-button  @click="del(index)" type="warning">删除</el-button>
            
            </li>
        </ul>
        <p v-show="this.dataList.length==0" class="shopcar">购物车什么都没有</p>
        <p>总价：{{allprice}}</p>
    </div>
    </div>
</template>

<script>
export default{
        data(){
          return{
            dataList: [{
                    'img': '../../static/1.jpg',
                    'num': 2,
                    'price': '25',
                    'isCheck': false,
                    'id':1
                },
                {
                    'img': '../../static/2.jpg',
                    'num': 4,
                    'price': '20',
                    'isCheck': false,
                    'id':2
                },
                {
                    'img': '../../static/3.jpg',
                    'num': 6,
                    'price': '15',
                    'isCheck': false,
                    'id':3
                }
            ],
            allData: {
                parCheck: false,
                text: '全选'
            },
            allprice: 0,
        }
       },
        methods: {
            // 全选 事件是@change,切换true和false
            allSelect() {
                // 当全选的时候，this.allData.parCheck为true
                this.dataList.forEach(item => {
                    item.isCheck = this.allData.parCheck
                    this.allprice += item.num * item.price;
                })
                // 当全不选的时候，总价为0
                if (this.allData.parCheck == false) {
                    this.allprice = 0
                }
            },
            // 点击单个多选框 事件为@change,切换true和false
            singleSelect(n) {
                // selectData为被选中的对象
                var selectData = this.dataList.filter(item => {
                    return item.isCheck == true;
                })
                // 单个选框选中与否，总价变化
                if (this.dataList[n].isCheck == true) {
                    this.allprice += this.dataList[n].num * this.dataList[n].price
                } else {
                    this.allprice -= this.dataList[n].num * this.dataList[n].price
                }
                
                // 当所有单个选框都被选中时，全选框就被选中
                selectData.length == this.dataList.length ? this.allData.parCheck = true : this.allData.parCheck =false;
 
            },
            // 删除商品
            del(n) {
                // 删除当前的这个商品
              
                this.dataList.splice(n, 1);
                // console.log(this.dataList.length)
               
                // 当删除商品后，若其他商品都被选中了，那么全选按钮也被选中
                // selectData为选中的元素，是一个数组
                var selectData = this.dataList.filter(item => {
                    return item.isCheck == true;
                })
 
                selectData.length == this.dataList.length ? this.allData.parCheck = true : this.allData.parCheck =false;
                 // 商品全部删除时，全选按钮变为false,总价为0
                 if (this.dataList.length == 0) {
                    this.allData.parCheck = false;
                    this.allprice = 0
                }
                // 删除商品时，总价变化
                // 分为两种情况，如果商品被选中删除，总价变化，如果商品本来就没选中，总价不变
                // 被选中的情况删除
               if(selectData.length==0){
                   this.allprice=0
               }else{
                //    因为this.allpice会继承上面的数值，这里先清零，然后再计算
                    this.allprice=0;
 
                   for(var i=0;i<selectData.length;i++){
                   
                       this.allprice+=selectData[i].num*selectData[i].price;
                      
                   } 
               }
            },
            // 增加商品数量
            add(n) {
                this.dataList[n].num++;
                if (this.dataList[n].isCheck == false) {
                    return;
                } else {
                    // 每增加一次，是增加当前商品的价格一次，数量一个
                    this.allprice += 1*this.dataList[n].price
                }
            },
            // 减少商品数量
            dele(n) {
                if (this.dataList[n].num == 0) {
                    this.dataList[n].num = 0
                } else {
                    this.dataList[n].num--;
                    if (this.dataList[n].isCheck == false) {
                        return;
                    } else {
                        this.allprice -= 1*this.dataList[n].price
                    }
                }
            }
        }
    }
  
</script>

<style>
 #appbox {
            width: 500px;
            margin: 30px auto;
        }
 
        .box li img {
            width: 100px;
            height: 100px;
            vertical-align: middle;
        }
 
        .box li {
            margin-bottom: 10px;
            list-style: none;
        }
 
        .box-f {
            width: 20px;
            height: 20px;
            border: 1px solid #000;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            cursor: pointer;
        }
 
        li a {
            text-decoration: none;
        }
 
        .price {
            color: red;
        }
 
        .shopcar {
            height: 300px;
            width: 500px;
            text-align: center;
            line-height: 300px;
            font-size: 24px;
        }
</style>
