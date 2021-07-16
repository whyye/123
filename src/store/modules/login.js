
import Cookies from "js-cookie";
import {login} from '@/api/login';
import {getToken,setToken} from '@/utils/getToken';
import {getUser,setUser} from '@/utils/getUser';
const state = {
   // 优先读取本地存储的值
  //  isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    
  //  isCollapse:  JSON.parse (Cookies.get('isCollapse')) || false ,
   
  //  token: '',
  //  username:getUser() || ''

  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUser() || ''
};

const getters = {
 
};
const  mutations = {
      
      SET_COLLAPSE (state,value) {
        console.log('login');
        state.isCollapse=!state.isCollapse
        // 存储状态
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))

        // cookies
        // Cookies.set("isCollapse", JSON.stringify(state.isCollapse))

        
    } ,

      SET_TOKEN (state,value){
         state.token = value
      },
      SET_USERNAME (state,value){
         state.username = value
      },
};

const actions = {
    login({commit},resquestData){
      return  new Promise((resolve,reject)=>{
        login(resquestData).then(res =>{
          let data =res.data.data;
          // 存到store里
          commit('SET_TOKEN',data.token);
          commit('SET_USERNAME',data.username);

          // 存到cookies
          setToken(data.token);
          setUser(data.username);
          

          resolve(res)
        }).catch(error=>{
           reject(error)
        })
      })   
    },
  //   login({ commit }, repuestData) {
  //     return new Promise((resolve, reject) => {
  //         Login(repuestData).then((response) => {
  //             let data = response.data.data
  //             // 普通的
  //             // content.commit('SET_TOKEN', data.toKen);
  //             // content.commit('SET_USERNAME', data.username);
  //             // 解构的
  //             commit('SET_TOKEN', data.token);
  //             commit('SET_USERNAME', data.username);
  //             setToKen(data.token);
  //             setUserName(data.username);
  //             resolve(response)
  //         }).catch(error => {
  //             reject(error)
  //         })
  //     })
  // },







  
};





export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions

};
