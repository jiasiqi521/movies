import Vue from 'vue'
import App from './App.vue'
import MintUI, { Indicator, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'

import store from './store/store.js';
import routes from './routes.js';

//注册使用mint-ui
Vue.use(MintUI);
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$Toast = Toast;
//注册vue-router
Vue.use(VueRouter);
//3.创建router实例 然后 routes 配置
const router = new VueRouter({
  linkActiveClass: 'active',//全局配置<router-link>的默认激活class类名
  routes //缩写 相当于routes:routes   es6语法
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
