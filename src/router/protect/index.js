
import router from '../index';

import store from '../../store/index';




//引入获取token的方法
import {getToken,removeToken} from "@/utils/getToken.js";
import {removeUser} from "@/utils/getUser.js";

const WhiteList = ['/login']   //用indexOf 是否不等于-1判断 数组中是否包含某个对象


router.beforeEach((to,from,next)=>{

   if(getToken()){
      //如果有token 干什么
      if(to.path=='/login'){

        removeToken();
        removeUser();
        // store.commit('login/SET_TOKEN','');
        // store.commit('login/SET_USERNAME','');
        // console.log(store.state.login);

        // 循环一次性存两个 
        store.commit('login/SET_LOGIN',{
          token:'',
          username:'',
        })
      }
      next();
      // console.log('存在');

   }else{
      //没有token 又干什么
      if(WhiteList.indexOf(to.path)!=-1){
        // console.log('经过了一次白名单验证');
        next();

      }else{
        // console.log('不存在');
        next('/login');
      }
   }

  
})