<template>
  <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
          <li v-for="(item,index) in menuTab" :key=item.index  :class="{'current':item.current}" @click="toggleMenu(item)"> {{item.txt}}</li>
        </ul>
         <!-- 登录表单 -->
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" >
            <el-form-item  prop="email" class="item-from">
              <label >邮箱</label>
              <el-input type="password" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="pass" class="item-from">
               <label >密码</label>
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="code" class="item-from">
               <label>验证码</label>
               <el-row :gutter="10">
                  <el-col :span="15"> <el-input v-model.number="ruleForm.code"></el-input></el-col>
                  <el-col :span="9"><el-button type="success"  class="block">获取验证码</el-button></el-col>
                  
               </el-row>
             
            </el-form-item>

            <el-form-item  class="menu-login">
              <el-button type="danger" @click="submitForm('ruleForm')" class="block">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script>
 
export default {
   name:"login",
   data() {
    //  表单规则
     var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.pass !== '') {
            this.$refs.ruleForm.validateField('pass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.email) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        } 
      };
     return {
       menuTab:[
        {txt:"登录",current:true },
        {txt:"注册",current:false }
       ],
       //表单数据开始
        ruleForm: {
          email: '',
          pass: '',
          code: ''
        },
        rules: {
          email: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      
       //表单数据结束
       
       
     }
   },
   methods:{
     toggleMenu(data){
       this.menuTab.forEach(el => {
          el.current=false
       });
       data.current=true;
     },

    //  表单的方法
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     
    
    //  表单的方法
    
   }
}
</script>

<style lang="scss" scoped>
  #login {
    background-color: #333366;
    height: 100vh;
    .login-wrap {
      width: 330px;
      margin: 0 auto;
      .menu-tab {
        color: #fff;
        text-align: center;
        li {
          display: inline-block;
          width: 90px;
          line-height: 36px;
          border-radius: 2px;
          font-size: 14px;
          cursor: pointer;
          
        }
        .current {
          background-color: rgba(0,0,0,.2);
        }
      }
    }

    .login-form{
      margin-top: 29px;
       .item-from {
      margin-top: 13px;
      color: #fff;
    }
    .menu-login{
      margin-top: 30px;
      .block {
        display: block;
        width: 100%;
      }
    }
    }
   
  }

</style>>

