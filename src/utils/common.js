import { MessageBox } from 'element-ui';
import {getCategoryList,addFirstCategory,deleteFirstCategory,editFirstCategory,getCategoryListAll} from '@/api/info';

import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted,refs } from '@vue/composition-api'


export function getCategoryGlobal(){
   const categoryGlobalData =reactive({reqData:''})
    
    const categoryGlobal = (params) => {

      getCategoryListAll({}).then(res=>{
        
         
        if (res.data.resCode==0){
               let req =res.data.data
               
               categoryGlobalData.reqData=req
        }

      }).catch(err=>{
        console.log('获取信息列表有误');
      })
       
    }

    return {
        
      categoryGlobal,
      categoryGlobalData,
      
    }
}