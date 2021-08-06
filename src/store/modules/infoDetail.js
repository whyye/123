
const state = {
   id:"" || sessionStorage.getItem('infoId'),
   title:"" || sessionStorage.getItem('infoTitle'),
};

const getters = {
      infoId:state =>state.id,
      infoTitle:state =>state.title,
};
const  mutations = {

    //  SET_ID(state,value){
    //    state.id=value
    //   //  本地存储
    //   sessionStorage.setItem('infoId',value)
      

    //  },
    //  SET_TITLE(state,value){
    //    state.title=value
    //    //  本地存储
    //   sessionStorage.setItem('infoTitle',value)
      
    //  },
    //  改成一个方法  循环存储
    // 
    SET_INFO(state,params){
      for(let key in params){
        state[key] =params[key].value
        if(params[key].session){
          sessionStorage.setItem(params[key].sessionKey, params[key].value)
        }
      }
    }

  
    
};

const actions = {
 
};





export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions

};
