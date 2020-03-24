import Vue from 'vue'
import VueRouter from 'vue-router'

//必须要加的东西。
Vue.use(VueRouter)

const routes = [
 {
   path: "/login",
   component: ()=>import("@/views/Login")
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
