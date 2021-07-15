import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

import app from './app.js';


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    app
  }
});
