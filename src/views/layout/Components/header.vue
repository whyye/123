<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuStatus">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right ">
      <div class="header-info pull-left">
        <img src="../../../assets/admin.png" alt="">
        <span>{{adminUser}}</span>
      </div>
      <div class="pull-left header-icon" @click="exitLogin">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted,computed } from '@vue/composition-api';

import {removeToken} from "@/utils/getToken.js";
import {removeUser} from "@/utils/getUser.js";


export default {
  name:'Header',
  setup(props, {root}){
    const navMenuStatus = ()=>{
      
      root.$store.commit('login/SET_COLLAPSE');
        console.log(root.$store.state.login.isCollapse)

    }
    //退出
    const exitLogin = ()=>{

      // 问题 一定要用store来调用吗? 然后promise出来,异步请求,  视频是异步请求的
      
      console.log('22222');
     root.$confirm('确定要退出登录吗', '退出?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           root.$store.commit('login/SET_TOKEN', '');
           root.$store.commit('login/SET_USERNAME', '');
           removeToken();
           removeUser();
          // 页面跳转
        root.$router.push({
          name: 'Login'
        })


        })
      
    }

          /**
       * computed 监听
       */
   const adminUser = computed(() => root.$store.state.login.username);

  

    return {
      navMenuStatus,
      adminUser,
      exitLogin
    }


  }

}
</script>

<style <style lang="scss" scoped>
@import "../../../styles/config.scss";
   #header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    
    height: 75px;
    background-color:#fff;
    box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    z-index: 10;
     @include webkit(transition,all .5s ease 0s );
    .header-icon {
      line-height: 75px;
      font-size: 20px;
      padding: 0 26px;
      cursor: pointer;
    }
    .header-info {
      cursor: pointer;
      line-height: 75px;
      font-size: 13px;
      padding: 0 26px;
      border-right: 1px solid #ddd;
      img {
         display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        vertical-align: middle;
        margin-right: 20px;
      }
    }
  }
  .open {
    #header-wrap{
      left: $navMenu;
    }
  }
  .close {
    #header-wrap{
      left: $navMenMin;
     
    }
  }
</style>>
