import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, {Toast} from 'vant'
import axios from 'axios'
//绑定到原型上边，可以使用this.$axios来调用。
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant);

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
  console.log(response)
  return response;
},error=>{
  console.log(error.response)
  const {statusCode,message} = error.response.data;
  if(statusCode !== 400) return;
  Toast.fail(message)

  return Promise.reject(error.response.data)
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
