import Vue from 'vue'
import VueRouter from 'vue-router'

//必须要加的东西。
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("@/views/Index")
  },
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: '/register',
    component: () => import("@/views/Register")
  },
  {
    //  导入个人中心路由
    path: '/personal',
    component: () => import("@/views/Personal"),
    meta: {
      Aguard: true
    }
  },
  {
    //  导入编辑页
    path: '/edit-profile',
    component: () => import("@/views/EditProfile"),
    meta: {
      Aguard: true
    }
  },
  {
    //  导入我的关注页
    path: '/follow',
    component: () => import("@/views/Follow"),
    meta: {
      Aguard: true
    }
  },
  {
    //  导入我的跟帖
    path: '/comments',
    component: () => import("@/views/Comments"),
    meta: {
      Aguard: true
    }
  },
  {
    //  导入我的收藏
    path: '/star',
    component: () => import("@/views/Star"),
    meta: {
      Aguard: true
    }
  },
  {
    //  导入栏目管理
    path: '/category',
    component: () => import("@/views/Category"),
  },
  {
    //  导入搜索页
    path: '/search',
    component: () => import("@/views/Search"),
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
