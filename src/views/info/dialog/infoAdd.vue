
<template>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @closed="closed" width="576px" class="info" >
       
          <el-form :model="form">
              <el-form-item label="类型:" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
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
            <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        

    </el-dialog>  
</template>

  <script>
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
        formLabelWidth: '60px'
    }
  },

  props:{
    flag :{
      type:Boolean,
      default:false
    }
  },
  methods: {
    closed (){
        this.dialogFormVisible=false;
        console.log('已关闭');
        // this.$emit('update:flag',false)
        this.$emit('ok',false);
        
    }
  },
  
  watch:{
    flag:{
      handler(newValue,oldValue){
       
        
        this.dialogFormVisible=newValue;
      }
    }
  }

 
 
}
</script>

<style <style lang="scss" scoped>



</style>>

