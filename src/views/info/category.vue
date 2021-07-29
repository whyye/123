<template>
  <div  class="category">
      <el-button type="danger" class="btn" @click="firstCategoryShow" >添加一级分类</el-button>
      <div class="hr-line"> </div>
      <div class="category-menu">
          <el-row :gutter="50">
              
                <el-col :span="10">
                  <div class="menu-up" >

                    
                  <div class="menu-wrap" v-for="(item,index) in infoList.list" :key="index">
                   
                    <h4>
                       <svg-icon iconClass="minus"  class="icon-minus"/>
                        {{item.category_name}}
                      <div class="btn-group">
                        <el-button type="danger" round size="mini" @click="edit_first_show(item)">编辑</el-button>
                        <el-button type="success" round size="mini"@click="add_childern_category(item)">添加子级</el-button>
                        <el-button type="primary" round size="mini" @click="del_first_category(item)">删除</el-button>
                      </div>
                      
                    </h4>
                    
                    <ul v-if="item.children" >
                      <li v-for="(subItem,subIndex) in item.children ">
                        {{subItem.category_name}}
                        <div class="btn-group">
                          <el-button type="danger" round size="mini"  @click="edit_first_show(subItem)">编辑</el-button>
                          <el-button type="primary" round size="mini"  @click="del_first_category(subItem)">删除</el-button>
                        </div>
                      </li>
                      
                     </ul>
                  </div>
                  
                  
                  </div>
                  
                </el-col>
                <el-col :span="14">
                  <div class="categoryEdit">
                      <div class="editHeader">
                        一级分类{{infoList.editCurrent?'编辑':'添加'}}
                      </div>
                      <div class="editContent">
                        <el-form :model="ruleForm" status-icon  ref="ruleForm"  label-width="130px" class="demo-ruleForm">
                          <el-form-item label="一级分类名称：" prop="categoryOne" class="categoryName" v-if="categoryOneStatus">
                            <el-input type="text" v-model="ruleForm.categoryOne" :disabled="category_one_status"></el-input>
                          </el-form-item>
                          <el-form-item label="二级分类名称：" prop="categoryTwo" class="categoryName" v-if="categoryTwoStatus">
                            <el-input type="text" v-model="ruleForm.categoryTwo" :disabled="category_two_status"></el-input>
                          </el-form-item>
                          
                          <el-form-item>
                            <el-button type="danger"  @click="addFirst('ruleForm')" :disabled="category_add_status" >提交</el-button>
                         
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

import {getCategoryList,addFirstCategory,deleteFirstCategory,editFirstCategory,addChildrenCategory} from '@/api/info';

import { getCategoryGlobal } from "@/utils/common.js";




export default {
  name:'Category',
   setup( props, { refs, root }){

    //  全局获取分类类别的方法 
     const { categoryGlobal, categoryGlobalData } = getCategoryGlobal();

    //  console.log(root.$router.options.routes)

    //声明data数据
    const categoryOneStatus =ref (true);
    const categoryTwoStatus =ref (true);
    const category_add_status = ref(true);
    const category_two_status = ref(true);
    const category_one_status = ref(true);
    let loading = ref(true);
   

    const  ruleForm = reactive( {
          categoryOne: '',
          categoryTwo: '',
          
        })

    //信息分类列表数据

    const infoList = reactive ({
      list:[],
      delCurrent:'',
      editCurrent:'',
      // 清除表单用的
      formName:'',
      //存储子级分类当前
      childrenCurrent:''
      
    })

 
    //方法声明
 
    // 获取信息分类列表的方法
    //  const getCategory = ()=>{

    //     getCategoryList({}).then(res=>{
         
    //       if (res.data.resCode==0){
    //              let req =res.data.data.data
                 
    //               infoList.list =req
    //       }

    //     }).catch(err=>{
    //       console.log('获取信息列表有误');
    //     })

    //  }


    //  按钮触发一级分类,二级分类不显示
    const firstCategoryShow = ()=>{
        
          infoList.editCurrent= '';
           ruleForm.categoryOne='';
         categoryOneStatus.value=true;
         categoryTwoStatus.value=false;
         category_add_status.value=false;
         category_one_status.value=false;

        
        //  infoList.formName && refs[ infoList.formName].resetFields();
    }
    //  按钮触发子级分类
    const childrenCategoryShow = ()=>{
         categoryOneStatus.value=true;
         categoryTwoStatus.value=true;
         category_add_status.value=false;
         category_one_status.value=true;
         category_two_status.value=false;
         
    }

    // 添加一级分类方法
     const  addFirst = (formName)=>{

       //清除表单的方法 存出来
       infoList.formName=formName;

       //添加一级分类的方法

       //编辑一级分类的方法
        if(infoList.editCurrent) {
             edit_fist_submit();

        }else if( infoList.childrenCurrent){
            add_children_submit();
        }else {
           add_first_category_submit();
        }
     }

      // 删除一级分类 
      const del_first_category = (params)=>{

        

        infoList.delCurrent = params;


        // 确认是否删除
        root.$warning(
          {
            content:'删除分类吗',
            type:'warning',
            // 传方法
            fn: deleteFirstSure
          }
        );
       

      }

      const deleteFirstSure = ()=>{ 

        // 因为这里把接口拆到别的方法里了  所以拿不到params.id ..所以要想办法 点击删除的时候就先存起来,外面定义一个变量来存

         deleteFirstCategory({"categoryId":infoList.delCurrent.id}).then(res=>{
              // 正常刷新第一级分类 没有子级
              // let index = infoList.list.findIndex(item=>item.id==infoList.delCurrent.id);
              // infoList.list.splice(index,1);

              // 全局刷新为了子分类能更新
              categoryGlobal();
              // console.log(res);
        }).catch(err=>{
          console.log(err);
        })

      };
      
      // 编辑一级分类 显示到对话框
      const edit_first_show = (params)=>{
        
          ruleForm.categoryOne = params.category_name;
          // firstCategoryShow();
          categoryOneStatus.value=true;
         categoryTwoStatus.value=false;
         category_add_status.value=false;
         category_one_status.value=false;
         
          infoList.editCurrent=params;
         

      }

      // 编辑一级分类方法 提交

      const edit_fist_submit = ()=>{
       
 
      let data = {"categoryName":ruleForm.categoryOne, "id":infoList.editCurrent.id };

      // let replaceData = infoList.list.findIndex(item=>item.id==infoList.editCurrent.id)  这个替换不行
      

      editFirstCategory(data).then(res=>{
        
         root.$message.success(res.data.message);
         refs[ infoList.formName].resetFields();
        //  过滤  利用 对象的 引用类型的特性, 修改原来数组的值
        //  let replaceData = infoList.list.filter(item=>item.id==infoList.editCurrent.id)
        //  console.log(replaceData);
        // replaceData[0].category_name=res.data.data.data.categoryName;

        // 方法2 利用 对象的 引用类型的特性
        // infoList.editCurrent.category_name=res.data.data.data.categoryName;

        // 全局刷新 为了能唰到子分类更新
        categoryGlobal();


        // 编辑成功刷新替换
        // getCategory();
        // 判断 提交按钮执行的方法 ,执行完编辑的方法 要帮他请空,不然怕影响 新增一级分类
            infoList.editCurrent ='';
             
      }).catch(err=>{
        console.log('编辑失败');
      })



      }


      //添加一级分类的方法 

      const add_first_category_submit = ()=>{
        if(ruleForm.categoryOne==''){
          root.$message.error('请输入一级分类内容');

          return false
        }

        let data = { "categoryName":ruleForm.categoryOne }

              addFirstCategory(data).then(res=>{
              
                if (res.data.resCode==0){
                      root.$message.success(res.data.message);
                      let data = res.data.data
                      console.log(data);
                    
                      infoList.list.push(data)
                    refs[ infoList.formName].resetFields();
                      // getCategory();
                       infoList.formName='';
                   };

                }).catch(err=>{
                    console.log(err);
                  })
      }

    //添加子级分类  
     const add_childern_category = (params)=>{
        console.log(params);
        // 把父级id存起来
        infoList.childrenCurrent = params.id;
        //把菜单列表打开,并把值带到列表里去
        childrenCategoryShow();
        ruleForm.categoryOne =params.category_name;
     };

     //子级分类请求的方法
      const  add_children_submit = ()=>{

         if(ruleForm.categoryTwo==''){
          root.$message.error('请输入子级分类内容');

          return false
        };

        let childData = { "categoryName":ruleForm.categoryTwo ,"parentId":infoList.childrenCurrent}

              addChildrenCategory(childData).then(res=>{
                      console.log(res);
                      infoList.childrenCurrent ='';
                     root.$message.success(res.data.message);
                    //  清空表格
                    refs[ infoList.formName].resetFields();

                    // 刷新列表
                     categoryGlobal();
                    
                     

                }).catch(err=>{
                    console.log(err);
                     infoList.childrenCurrent ='';
                  })


      };

    watch(()=>categoryGlobalData.reqData,(value)=>{
     
        infoList.list =value
    })


  
  

    //  生命周期
    onMounted(()=>{
        // getCategory()
        // 全局获取分类列表的方法
        categoryGlobal();
        
       
       
       
        

    })

    //  暴露数据
     return {
      //  ref 
      category_add_status, category_two_status, category_one_status, categoryOneStatus, categoryTwoStatus,loading,

      // reative
      ruleForm, infoList,

      // 方法 
        addFirst, firstCategoryShow, add_first_category_submit, del_first_category,deleteFirstSure, edit_first_show, edit_fist_submit,add_childern_category,childrenCategoryShow,
        add_children_submit

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

