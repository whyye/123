<template>
  <div id="nav-wrap">
     <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <!-- 侧边栏 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
     
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
     
      router
     >
      <!-- 选换路由的地方 -->
      <template  v-for="(item,index) in routers">
        <el-submenu :index="index + '' "  :key="index" v-if="!item.hidden"  class="hh">
            <template slot="title">
             <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
              <span>{{item.meta.name}}</span>
            </template>
          <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children " :key="subIndex">{{subItem.meta.name}}</el-menu-item>
          
      </el-submenu>
      </template>
    
      
      
    </el-menu>
  
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted, computed } from '@vue/composition-api';

export default {
  name:'Nav',
   setup( props, { refs, root }){

      /**
       * computed 监听
       */
   const isCollapse = computed(() => root.$store.state.login.isCollapse);

    //声明data数据
 const routers = reactive(root.$router.options.routes);

    //方法声明

    //  暴露数据
     return {
       isCollapse,
       routers,
       

     }

   }
  


}
</script>

<style <style lang="scss" scoped>
@import "../../../styles/config.scss";
  #nav-wrap {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #333366;
    @include webkit(transition,all .5s ease 0s );
     
    svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    text-align: center;
    img {
         @include webkit(transition,all .5s ease 0s );
         margin: 28px auto 25px;
          width: 92px;
      }
    }
  }
  .open {
    #nav-wrap{
      width: $navMenu;
    }
  }
  .close {
    #nav-wrap{
      width: $navMenMin;
      img {
        width: 50px;

      }
    }
  }

</style>>

