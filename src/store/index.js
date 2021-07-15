import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie"


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 优先读取本地存储的值
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) || false
    
    // isCollapse:  JSON.parse (Cookies.get('isCollapse')) || false
   
  },
  getters :{

  },
  mutations: {
    SET_COLLAPSE (state,value) {
      
        state.isCollapse=!state.isCollapse
        // 存储状态
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))

        // cookies
        // Cookies.set("isCollapse", JSON.stringify(state.isCollapse))
    } 
  },
  actions: {},
  modules: {},
});
