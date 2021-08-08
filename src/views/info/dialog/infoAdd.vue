
<template>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @closed="closed" width="576px" class="info"  @opened="opened" destroy-on-close>
       
          <el-form :model="form" ref="form">
              <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="form.region " placeholder="请选择类型">
                  <!-- 这里要判断存不存在,不然老报错 -->
                  <template v-if="fatherData">
                     <el-option v-for="item in fatherData" :label="item.category_name"  :value="item.id" :key="item.id" ></el-option>
                  </template>
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
            <el-button type="danger" @click="add_info"  v-loading="loading">确 定</el-button>
            
          </div>
        

    </el-dialog>  
</template>

  <script>
  import {addInfo} from '@/api/info.js'
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
        loading:false ,
       
        
        
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
    Editrr : {
      type:Object,
      default:function () {
            return {}
      }
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
     
       this.fatherData=this.typeData
      
       
    },
    //清空表单
    clearForm (){
      this.form.name = "";
      this.form.region="";
      this.form.content="";

    },

    add_info(){
     
      
      let reqData= {
        
      "category_id": this.form.region,
      "content": this.form.content,
      "create_date": "",
      "image_url": "",
      "status": "1",
      "title": this.form.name

      }
      
      if(!this.form.region || !this.form.content || !this.form.name){
        this.$message({
          message: '请完整输入内容',
          type: 'warning'
        });

        return false
      }
      this.loading = true;
      


      addInfo(reqData).then(res=>{
        console.log(res);
        //添加提示语
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.loading = false;
        //清空表单
         this.clearForm()
         //触发方法  刷新列表
         this.$emit('updateList');
         let tt = this.dialogFormVisible = false
        
         
         
      }).catch(err=>{
        console.log("错误了");
        console.log(err);
      })
      
    },
   

    
  
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

