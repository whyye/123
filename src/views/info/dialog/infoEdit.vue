
<template>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" @closed="closed" width="576px" class="info"  @opened="opened" destroy-on-close>
       
          <el-form :model="form" ref="form">
              <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="form.region " placeholder="请选择类型">
                  <!-- 这里要判断存不存在,不然老报错 -->
                  <template v-if="fatherData">
                     <el-option v-for="item in fatherData" :label="item.category_name"  :value="item.id"  ></el-option>
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
            <el-button type="danger" @click="edit_info"  v-loading="loading">确 定</el-button>
            
          </div>
        

    </el-dialog>  
</template>

  <script>
  import {addInfo,editInfoList,addInfoList} from '@/api/info.js'
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
        eId:'',
        resData:''
        
       
        
        
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
    editId : {
      type:String,
      default:''
    },

  },
  methods: {

    //获取原来的信息列表
    add_list(val){
      let reqData = {
        id:val,
        pageNumber: 1,
        pageSize: 1

      }
       addInfoList(reqData).then(res=>{
        console.log(res.data.data.data[0]);
        this.resData =res.data.data.data[0]
        this.form.region =this.resData.categoryId
        this.form.name =this.resData.title
        this.form.content =this.resData.content
       

        
      }).catch(err=>{
         
      })
    },
    closed (){
        this.dialogFormVisible=false;
        
        // this.$emit('update:flag',false)
        this.$emit('ok',false);
        this.eId= ''
        
    },
    opened(){
     
       this.fatherData=this.typeData;
        if(this.eId){
            this.add_list(this.eId)
        }
      
       
    },
    //清空表单
    clearForm (){
      this.form.name = "";
      this.form.region="";
      this.form.content="";

    },

    edit_info(){
     
      console.log(this.eId);
      let req = {
      "id" : this.eId,
      "category_id": this.form.region,
      "content": this.form.content,
      "image_url": "../../../assets/admin.png",
      
      "status": "1",
      "title": this.form.name

      }

//       {
//     "id": 20
//     "category_id": "18"
//     "content": "<p>Vue3.js真的很不错</p>"
//     "create_date": "2021-06-25 16:39:38"
//     "image_url": "http://qv18xxim7.hn-bkt.clouddn.com/1-7.jpg"
//     "status": "1"
//     "title": "Vue3.js真的很不错"
// }
      
      if(!this.form.region || !this.form.content || !this.form.name ||!this.eId){
        this.$message({
          message: '请完整输入内容',
          type: 'warning'
        });

        return false
      }
      this.loading = true;
      


      editInfoList(req).then(res=>{
        
        //添加提示语
        this.$message({
          message: '恭喜你，修改成功',
          type: 'success'
        });
        this.loading = false;
        //清空表单
        
         //触发方法  刷新列表
         this.$emit('updateList');
        
        
         
         
      }).catch(err=>{
        console.log("错误了");
        console.log(err);
        this.loading = false;
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
    editId:{
      handler(newValue,oldValue){
       
        
        this.eId=newValue;
      }
    },
    
    
   
  }
 

 
 
}
</script>

<style <style lang="scss" scoped>



</style>>

