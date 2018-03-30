// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import  VueRouter  from 'vue-router'
//引入vue-resource
import  VueResource from  'vue-resource'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echarts
import echarts from 'echarts'
//引入子组件
import home from './components/base/home'
import login from  './components/page/login'
import intro from './components/page/introduce.vue'
import todolist from './components/page/todolist.vue'
import form from './components/page/form.vue'
import echart from './components/page/echarts.vue'
import vuetable from './components/page/vuetable.vue'
import shopcar from './components/page/shopcar.vue'
import frequently from './components/page/frequently.vue'
Vue.config.productionTip = false

//使用组件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(echarts)
/* eslint-disable no-new */
//配置路由
const routes=[
  //后台管理系统的第一个界面是login页面
  {
    path:'/',
    component:login
  },
  {
    path:'/home',
    component:home,
    beforeEnter:(to,form,next)=>{
        if(localStorage.getItem('username')){
            next()
        }else{
          next({path:'/login'})
        }
    },
    children:[
      //进入后台的第一个界面就是介绍页面
      {
        path:'/',
        component:intro
      },
      {
        path:'/userInstall',
        component:resolve=>require(['./components/page/userInstall.vue'],resolve)
      },
      {
        path:'/intro',
        component:intro
      },
      {
        path:'/todolist',
        component:todolist
      },
      {
        path:'/form',
        component:form
      },
      {
        path:'/echarts',
        component:echart
      },
      {
        path:'/vuetable',
        component:vuetable
      },
      {
        path:'/shopcar',
        component:shopcar
      },
      {
        path:'/frequently',
        component:frequently
      }
    ]
  },
  {
    path:"/login",
    component:login
  }
];

//使用路由规则
const router=new VueRouter({
  mode:'history',
  routes
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
