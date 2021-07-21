import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//全局组件
import "./icons/index";

// 全局方法 
import global from '@/utils/global.js';




Vue.use(ElementUI);
Vue.use(global);

//vue 3.0  试用版
import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

//引入路由守卫
import './router/protect/index';





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
