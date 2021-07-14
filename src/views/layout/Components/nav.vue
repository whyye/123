<template>
  <div id="nav-wrap">
    <!-- 侧边栏 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
     
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
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';

export default {
  name:'Nav',
   setup( props, { refs, root }){

     
  

  

    

    //声明data数据
 const routers = reactive(root.$router.options.routes);
    
 

   




    //方法声明
    
  
   
    

   
   

  

    //nav 的方法
    const  handleOpen = (key, keyPath)=>{
         console.log(key, keyPath);
    };
    const  handleClose = (key, keyPath)=>{
         console.log(key, keyPath);
    };

    
  

     

    //  暴露数据
     return {
       routers,
       handleOpen,
       handleClose
     

     }

   }
  


}
</script>

<style <style lang="scss" scoped>
@import "../../../styles/config.scss";
  #nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #333366;
    svg {
    font-size: 20px;
    margin-right: 10px;
  }
  }
  

</style>>

