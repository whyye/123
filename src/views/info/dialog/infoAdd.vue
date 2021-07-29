
<template>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @closed="closed" width="576px" class="info"  @opened="opened" destroy-on-close>
       
          <el-form :model="form" ref="form">
              <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择类型">
                  <el-option v-for="item in fatherData" :label="item.category_name"  :value="item.id"  ></el-option>
                  
                </el-select>
              </el-form-item>
              <el-form-item label="标题:" :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="概况:" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content" placeholder="请输入内容" ></el-input>
              </el-form-item>

             

            
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="add_info">确 定</el-button>
            <el-button type="danger" @click="add_list">确 定111</el-button>
          </div>
        

    </el-dialog>  
</template>

  <script>
  import {addInfo,addInfoList} from '@/api/info.js'
export default {
  name:'InfoAdd',
 
  data() {
    return {
      dialogFormVisible:false,
      
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          content:''

        },
        formLabelWidth: '60px',
        fatherData:'',
        
    }
  },

  props:{
    flag :{
      type:Boolean,
      default:false
    },
    typeData :{
      type:Array,
      default:()=>[]
    },

  },
  methods: {
    closed (){
        this.dialogFormVisible=false;
        console.log('已关闭');
        // this.$emit('update:flag',false)
        this.$emit('ok',false);
        
    },
    opened(){
      console.log('iiii');
       this.fatherData=this.typeData
    },
    add_info(){
      this.dialogFormVisible=false;
      let reqData= {
        
      "category_id": "19",
      "content": "hhhytt33yy",
      "create_date": "2021-06-25 16:39:33",
      "image_url": "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg",
      "status": "1",
      "title": "js真的很不错lglglgl"

      }
      addInfo(reqData).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log("错误了");
        console.log(err);
      })
      
    },
    add_list(){

      let reqData= {
        
        categoryId: 1,
        title: "vue3",
        pageNumber: 1,
        pageSize: 10

      }

      addInfoList(reqData).then(res=>{
        console.log(res);
      })
    }

    
  
  },
  mounted() {
    
  },
  
  watch:{
    flag:{
      handler(newValue,oldValue){
       
        
        this.dialogFormVisible=newValue;
      }
    },
   
  }
 

 
 
}
</script>

<style <style lang="scss" scoped>



</style>>

