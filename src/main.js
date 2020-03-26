import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
//绑定到原型上边，可以使用this.$axios来调用。
Vue.prototype.$axios = axios;

Vue.use(Vant);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
