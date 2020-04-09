import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, {Toast} from 'vant'
import axios from 'axios'
//绑定到原型上边，可以使用this.$axios来调用。
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant);
// 保存根实例
let app;

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.Aguard) {
    const userJson = JSON.parse(localStorage.getItem('userInfo')) || {};
    if (userJson.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
})
// 路由拦截器
axios.interceptors.response.use(response=>{
  return response;
},error=>{
  const {statusCode,message} = error.response.data;
  if(statusCode === 400){
    Toast.fail(message)
  }

  // 这个拦截器就是防止未登录就去收藏或关注。
  if(statusCode === 403){
    Toast.fail(message)
    // app.$router.push('/login')
    app.$router.push({
      path: "/login",
      query: {
        return_url: app.$router.path
      }
    })
  }
  return Promise.reject(error.response.data)
})


app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
