<template>
  <div class="userIndex-wrap">
     <div userIndex-header>
         <el-row :gutter="16">
        <el-col :span="20">
            <div class="label-wrap keyword">
              <!-- 特别注意 <div class="group-content"> 下包含的标签 一定要写style="width: 100%;" 不然适应不了父元素-->
              <label for="">关键字:</label>
              <div class="group-content">
                 <el-row :gutter="20">
                     <el-col :span="5">
                        <!-- 下拉选项组件 -->

                        <selectOption  :config="configOption"/>

                     </el-col>
                     <el-col :span="5">
                       <el-input v-model="inputValue" placeholder="请输入内容" style="width: 100%"></el-input>
                     </el-col>
                     <el-col :span="3">
                       <el-button type="danger" class="pull-right" style="width: 100%">搜索</el-button>
                     </el-col>
                 </el-row>
              </div>
            </div>
        </el-col>
        <el-col :span="4">
             <el-button type="danger" class="pull-right">新增</el-button>
        </el-col>
       

       

       
        
       
      </el-row>
     </div>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';

import selectOption from '@c/SelectOption/index.vue'

export default {
  name:'UserIndex',
  components: { selectOption },
   setup( props, { refs, root }){

    //  console.log(root.$router.options.routes)

  // 声明变量
   const inputValue =ref('');

  //  传入 selectOption 组件初始化内容
   const configOption = reactive({
      init:["name","email"]
   })
    
  
   
    

   
   

  

    //nav 的方法
    // const  handleOpen = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };
    // const  handleClose = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };

    
  

     

    //  暴露数据
     return {
     
       inputValue,
       configOption

     }

   }
  


}
</script>

<style <style lang="scss" scoped>
 @import "../../styles/config.scss";
  .userIndex-wrap {
    height: 100vh;
    padding: 30px;
  }
 


.label-wrap {

  &.keyword {
    @include layout(60, right);
  }
}


</style>>

