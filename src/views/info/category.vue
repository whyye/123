<template>
  <div  class="category">
      <el-button type="danger" class="btn" >添加一级分类</el-button>
      <div class="hr-line"> </div>
      <div class="category-menu">
          <el-row :gutter="50">
              
                <el-col :span="10">
                  <div class="menu-up">

                  
                  <div class="menu-wrap">
                   
                    <h4>
                       <svg-icon iconClass="minus" :className="minus" class="icon-minus"/>
                        新闻
                      <div class="btn-group">
                        <el-button type="danger" round size="mini">编辑</el-button>
                        <el-button type="success" round size="mini">添加子级</el-button>
                        <el-button type="primary" round size="mini">删除</el-button>
                      </div>
                      
                    </h4>
                    
                    <ul>
                      <li>
                        国内
                        <div class="btn-group">
                          <el-button type="danger" round size="mini">编辑</el-button>
                          <el-button type="primary" round size="mini">删除</el-button>
                        </div>
                      </li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                     </ul>
                  </div>
                  <div class="menu-wrap">
                   
                    <h4>
                       <svg-icon :iconClass="minus" :className="minus" class="icon-minus"/>
                        新闻
                      <div class="btn-group">
                        <el-button type="danger" round size="mini">编辑</el-button>
                        <el-button type="success" round size="mini">添加子级</el-button>
                        <el-button type="primary" round size="mini">删除</el-button>
                      </div>
                      
                    </h4>
                    
                    <ul>
                      <li>
                        国内
                        <div class="btn-group">
                          <el-button type="danger" round size="mini">编辑</el-button>
                          <el-button type="primary" round size="mini">删除</el-button>
                        </div>
                      </li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
                      <li>国内</li>
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
                        <el-form :model="ruleForm" status-icon   label-width="130px" class="demo-ruleForm">
                          <el-form-item label="一级分类名称：" prop="categoryOne" class="categoryName">
                            <el-input type="password" v-model="ruleForm.categoryOne" ></el-input>
                          </el-form-item>
                          <el-form-item label="二级分类名称：" prop="categoryTwo" class="categoryName">
                            <el-input type="password" v-model="ruleForm.categoryTwo" ></el-input>
                          </el-form-item>
                          
                          <el-form-item>
                            <el-button type="danger" >提交</el-button>
                         
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
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';

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
    
 

   




    //方法声明
 
   
    

   
   

  

    //nav 的方法
    // const  handleOpen = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };
    // const  handleClose = (key, keyPath)=>{
    //      console.log(key, keyPath);
    // };

    
  

     

    //  暴露数据
     return {
      ruleForm,
     

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

