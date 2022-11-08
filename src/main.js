import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 element-ui
import './plugins/element.js'

// 导入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true // 让axios请求携带cookie
Vue.prototype.$http = axios
Vue.use(VueAxios, axios)

// 导入 VueClipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 动画库
import animate from "animate.css";
Vue.use(animate);
// lottie动画库
 import lottie from "vue-lottie";
 Vue.component("lottie", lottie);
//数据可视化
import * as d3 from "d3";
Vue.prototype.$d3 = d3;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
