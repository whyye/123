
import router from '../index'

//引入获取token的方法
import {getToken} from "@/utils/getToken.js";

const WhiteList = ['/login']   //用indexOf 是否不等于-1判断 数组中是否包含某个对象


router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);

  
 
   if(getToken()){
      //如果有token 干什么
      next();
      console.log('存在');

   }else{
      //没有token 又干什么
      if(WhiteList.indexOf(to.path)!=-1){
        console.log('经过了一次白名单验证');
        next();

      }else{
        console.log('不存在');
        next('/login');
      }
   }

  
})