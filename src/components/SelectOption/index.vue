<template>
  <el-select
    v-model="data.type_value"
    clearable
    placeholder="请选择"
    style="width: 100%"
      >
      <el-option
        v-for="item in data.type_options"
        :key="item.id"
        :label="item.label"
        :value="item.value"
        > </el-option>
    </el-select>
</template>

<script>
//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';

export default {
 name:"SelectOptin",
   components:{},
   props:{
     config :{
      type:Object,
      default:()=>{}
    },
     
   

  },

   setup( props, { refs, root,emit }){

      
      
       
     // 关键字数据
    const keyword_options = reactive([
      {
        value: "name",
        label: "姓名",
      },
      {
        value: "email",
        label: "邮箱",
      },
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);
  
   //声明data数据
     
    const data = reactive({
      type_value:'',
      type_options:[]
    })


      
    // 初始化下拉选项的数据,
    const initOption = ()=>{

        let initData = props.config.init;
        // 凡是数组都要进行数据校验,看是不是空的,不然循环取值会报错
        // 1.判断有没有传 初始化参数
        if(initData.length ==0){
          console.log('组件没传初始化数据');
          return false
        }

        let container = [];
       initData.forEach(elem => {

            let newArr = keyword_options.filter(item=>item.value==elem)
            
            // 继续校验
            if(newArr.length>0){
                container.push(newArr[0])
            }
            
        });
        // 2.如果有传但是传错了,就匹配不到,所以还要校验
        if(container.length==0){
          console.log('传的数据有误');
          return false
        }

      //过滤后 初始化赋值
      data.type_options =container;
      // 默认值
      data.type_value =container[0].value
    }
     
     
         

        

   
         
        

        
          //  生命周期
        onMounted(() => {
      
          initOption();
          
        });

    //  暴露数据
     return {
       data,
       keyword_options,
       initOption


         

     };


   }

       

}
</script>

<style lang="scss" scoped>


  
  
</style>


