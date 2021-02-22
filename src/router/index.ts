import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from '../views/details/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    children: [{
      path: "",
      name: "Home",
      component: Home,
      meta: {
        title: '首页'
    }
    },{
      path: "login",
      name: "Login",
      component:()=>import('../views/details/login/Login.vue'),
      meta:{
        title: '登录'
      }
    },{
      path: "strategy",
      name: "strategy",
      component:()=>import('../views/details/strategy/Strategy.vue'),
      meta:{
        title: '旅游攻略'
      }
    },{
      path: "hotel",
      name: "hotel",
      component:()=>import('../views/details/hotel/Hotel.vue'),
      meta:{
        title: '酒店'
      }
    },{
      path: "ticket",
      name: "ticket",
      component:()=>import('../views/details/ticket/Ticket.vue'),
      meta:{
        title: '国内机票'
      }
    },{
      path: "person",
      name: "person",
      component:()=>import('../views/details/person/Person.vue'),
      meta:{
        title: '个人中心'
      }
    }]
  }
];

const router = createRouter({
  //等同于vue2中的mode路由模式
  //createWebHistory history模式的路由
  //hash模式路由createWebHashHistory在第一行导入，将下面的createWebHistory换成createWebHashHistory即可，hash与history的区别hash路由后面有一个#号+
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, _, next) => {
  document.title = to.meta.title
  next()
})

export default router;
