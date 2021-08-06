<template>
  
     <div>
       编辑详情
     </div>        
  
</template>

<script>
//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';




import InfoAdd from './dialog/infoAdd.vue';
import InfoEdit from './dialog/infoEdit.vue';
export default {
 name:"EditDetail",
   components:{InfoAdd,InfoEdit},

   setup( props, { refs, root }){

            //明文传参后接收方式  this.$router.query.传过来的东西
          // let id =root.$route.query.id;
          // console.log(id);

            //密文传参后接收方式  this.$router.params.传过来的东西
          let id =root.$route.params.id || root.$store.getters['infoDetail/infoId'];
          let title =root.$route.params.title || root.$store.getters['infoDetail/infoTitle'];
         
          
        
          
          console.log('id'+ id);
          console.log('title'+ title);

  
    
  
 


   

   

     

    //  暴露数据
     return {
       
       


         

     }


   }

       

}
</script>

<style lang="scss" scoped>

 
  
  
</style>


