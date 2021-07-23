<template>
  <div  class="category">
      <el-button type="danger" class="btn" @click="firstCategory" >添加一级分类</el-button>
      <div class="hr-line"> </div>
      <div class="category-menu">
          <el-row :gutter="50">
              
                <el-col :span="10">
                  <div class="menu-up">

                    
                  <div class="menu-wrap" v-for="(item,index) in infoList.list" :key="index">
                   
                    <h4>
                       <svg-icon iconClass="minus"  class="icon-minus"/>
                        {{item.category_name}}
                      <div class="btn-group">
                        <el-button type="danger" round size="mini">编辑</el-button>
                        <el-button type="success" round size="mini">添加子级</el-button>
                        <el-button type="primary" round size="mini">删除</el-button>
                      </div>
                      
                    </h4>
                    
                    <ul v-if="item.children" >
                      <li v-for="(subItem,subIndex) in item.children ">
                        {{subItem.category_name}}
                        <div class="btn-group">
                          <el-button type="danger" round size="mini">编辑</el-button>
                          <el-button type="primary" round size="mini">删除</el-button>
                        </div>
                      </li>
                      
                     </ul>
                  </div>
                  
                  
                  </div>
                  
                </el-col>
                <el-col :span="14">
                  <div class="categoryEdit">
                      <div class="editHeader">
                        一级分类编辑
                      </div>
                      <div class="editContent">
                        <el-form :model="ruleForm" status-icon  ref="ruleForm"  label-width="130px" class="demo-ruleForm">
                          <el-form-item label="一级分类名称：" prop="categoryOne" class="categoryName" v-if="categoryOneStatus">
                            <el-input type="text" v-model="ruleForm.categoryOne" ></el-input>
                          </el-form-item>
                          <el-form-item label="二级分类名称：" prop="categoryTwo" class="categoryName" v-if="categoryTwoStatus">
                            <el-input type="text" v-model="ruleForm.categoryTwo" ></el-input>
                          </el-form-item>
                          
                          <el-form-item>
                            <el-button type="danger"  @click="addFirst('ruleForm')">提交</el-button>
                         
                          </el-form-item>
                      </el-form>

                      </div>
                  </div>
                </el-col>
             
          </el-row>

      </div>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted,refs } from '@vue/composition-api'

import {getCategoryList,addFirstCategory} from '@/api/info';

export default {
  name:'Category',
   setup( props, { refs, root }){

    //  console.log(root.$router.options.routes)


  

  

    

    //声明data数据
    const  ruleForm = reactive( {
          categoryOne: '',
          categoryTwo: '',
          age: ''
        })

    //信息分类列表数据

    const infoList = reactive ({
      list:[]
    })

    const categoryOneStatus =ref (true);
    const categoryTwoStatus =ref (true);
    
 

   




    //方法声明
 
    // 获取信息分类列表的方法
     const getCategory = ()=>{

        getCategoryList({}).then(res=>{
         
          if (res.data.resCode==0){
                 let req =res.data.data.data
                  console.log(res.data.data.data);
                  infoList.list =req
          }

        }).catch(err=>{
          console.log('获取信息列表有误');
        })

     }


    //  按钮触发一级分类,二级分类不显示
    const firstCategory = ()=>{
         categoryOneStatus.value=true;
        categoryTwoStatus.value=false;
    }
    // 添加一级分类方法
     const  addFirst = (formName)=>{

          if(ruleForm.categoryOne==''){
             root.$message.error('请输入一级分类内容');

            return false
          }

       let data = { "categoryName":ruleForm.categoryOne }

        addFirstCategory(data).then(res=>{
         
           if (res.data.resCode==0){
                 root.$message.success(res.data.message);
                 let data = res.data.data.category_name
                 infoList.list.push(data)
               refs[formName].resetFields();
                // getCategory();
          }
         

        }).catch(err=>{
          console.log('添加一级分类有误');
        })

     }


    

   
   

  

    //nav 的方法
    // const  handleOpen = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };
    // const  handleClose = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };

    
  

    //  生命周期
    onMounted(()=>{
        getCategory()
    })

    //  暴露数据
     return {
      ruleForm,
      infoList,
      categoryOneStatus,
      categoryTwoStatus,
      getCategory,
      addFirst,
      firstCategory
     

     }

   }
  


}
</script>

<style <style lang="scss" scoped>
@import "../../styles/config.scss";
.category{
  // padding: 30px;
  .btn {
     margin: 30px 0 0 30px;
  }
  .hr-line {
    border:none;
    border-bottom: 1px solid #e9e9e9 ;
    margin: 30px 0;
    padding: 0 -30px;
  }

  .category-menu {
     padding: 0 30px;
   .menu-wrap {
     position: relative;
     line-height: 44px;
     &:before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;

        // 特别注意  左边的边框  定位  要写三边 left: 20px; top: 0; bottom: 0;  写少 bottom 出不来
    }
    .icon-minus{
      position: absolute;
        left: 12px;
        top: 12px;
        background-color: #fff;
        font-size: 17px;
    } 
      
     h4 {
       padding-left: 38px;
     }
    
       li {
        position: relative;
        padding-left: 40px;
        margin-left: 20px;
        &:before {
            content: '';
            position: absolute;
            width: 32px;
            border-bottom: 1px dotted #000;
            left: 0;
            top: 22px;
        };
        

    }
     
    
   }
  }
 
}



.menu-wrap {
   cursor: pointer;
   .btn-group {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      display: none;
    }
  li ,h4 {
    @include webkit(transition, all .5s ease 0s);
   &:hover {
       background-color: #f3f3f3;
       .btn-group { display: block ; }
      
   }
}

}

.menu-up {

  // first-child 前面要加是谁的第一个  不然也出不来
   .menu-wrap:first-child {
        &:before { top: 20px; }
    }
     .menu-wrap:last-child {
        &:before { bottom: 21px; }
    }
}

.categoryEdit {

  .editHeader {
    line-height: 44px;
    background-color:#f3f3f3;
    padding-left: 22px;
    
  }
  .editContent {
    
    width: 385px;
    margin-top: 28px;
    .el-form-item {
      margin-bottom: 22px;
    }
     
    
  }
}




</style>

