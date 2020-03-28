import Vue from 'vue'
import VueRouter from 'vue-router'

//必须要加的东西。
Vue.use(VueRouter)

const routes = [
 {
   path: "/login",
   component: ()=>import("@/views/Login")
 },
 {
   path: '/register',
   component: ()=>import("@/views/Register")
 },
 {
  //  导入个人中心路由
   path: '/personal',
   component: ()=>import("@/views/Personal")
 },
 {
  //  导入编辑页
  path: '/edit-profile',
  component: ()=>import("@/views/EditProfile")
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
