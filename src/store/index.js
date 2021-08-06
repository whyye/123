import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

import app from './modules/app';
import login from './modules/login';
import infoDetail from './modules/infoDetail';


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    app,
    login,
    infoDetail
  }
});
