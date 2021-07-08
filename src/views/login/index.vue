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
              <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="pass" class="item-from">
               <label >密码</label>
              <el-input type="text" v-model="ruleForm.pass" autocomplete="off" minlength='8' maxlength='16'></el-input>
            </el-form-item>

             <!-- 定义模块显示重负密码 -->
             <el-form-item  prop="pass1" class="item-from" v-show="model === 'register'">
               <label >重复密码</label>
              <el-input type="text" v-model="ruleForm.pass1" autocomplete="off" minlength='8' maxlength='16'></el-input>
            </el-form-item>

            <el-form-item  prop="code" class="item-from">
               <label>验证码</label>
               <el-row :gutter="10">
                  <el-col :span="15"> <el-input v-model.number="ruleForm.code"></el-input></el-col>
                  <el-col :span="9"><el-button type="success"  class="block" @click="getLoginSms()">获取验证码</el-button></el-col>
               </el-row>
            </el-form-item>

            <el-form-item  class="menu-login">
              <el-button type="danger" @click="submitForm('ruleForm')" class="block" :disabled="loginButtonStatus">{{model==="login"?'登录':'注册'}}</el-button>
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script>
//引入login获取验证码
import {getSms} from '@/api/login';

//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';
//验证的邮箱 密码 验证码格式  和过滤
 import {validateSomeMail,validateSomePass,validateSomeCode,filterStr} from '@/utils/validate'
export default {
   name:"login",
   setup( props, { refs, root }){

     //表单验证
      let validateEmail = (rule, value, callback) => {
        
          if (value === '') {
            callback(new Error('请输入邮箱'));
          } else if (validateSomeMail(value)) {
            callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          } 
      };

      //验证密码格式
      let validatePass = (rule, value, callback) => {
          ruleForm.pass = filterStr(value);
          value = ruleForm.pass

          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (validateSomePass(value)) {
            callback(new Error('请输入至少八个字符,包含大小写和数字'));
              
          } else {
            callback();
          } 
      };

      //验证重负密码
      let validatePass1 = (rule, value, callback) => {
          ruleForm.pass1 = filterStr(value);
          value = ruleForm.pass1
          if(model.value=='login'){
             callback();
          }
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (value!=ruleForm.pass) {
            callback(new Error('密码不一致'));
              
          } else {
            callback();
          } 
      };

      let validateCode = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入验证码'));
          } else if (validateSomeCode(value)) {
            callback(new Error('验证码不正确'));
          } else {
            callback();
          } 
        
      };
    

    //声明data数据

    const model = ref('login');
    //登录按钮状态默认是禁用
    const loginButtonStatus  = ref (true);


    const  menuTab = reactive(
        [
        {txt:"登录",current:true , type:"login"},
        {txt:"注册",current:false ,type:"register"}
       ]
    );
    const  ruleForm = reactive(
         {
          email: '',
          pass: '',
          pass1: '',
          code: ''
        }
    );
    const  rules = reactive(
           {
              email: [
                { validator: validateEmail, trigger: 'blur' }
              ],
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              pass1: [
                { validator: validatePass1, trigger: 'blur' }
              ],
              code: [
                { validator: validateCode, trigger: 'blur' }
              ]
        },
    );

    //方法声明
    const toggleMenu = (data) => {
      menuTab.forEach(el => {
          el.current=false
       });
       data.current=true;
       //点击赋值显示还是隐藏重复密码
       model.value=data.type
     }

     //  表单的方法
        const submitForm = (formName) => {
        refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    //获取登录验证码
    const getLoginSms = () => {
    //判断邮箱不能为空才能获取
      if(ruleForm.email==''){

        root.$message.error('邮箱不能为空');
        return false
      }
    //判断密码格式
     if(validateSomePass(ruleForm.pass)) {

          root.$message.error('密码格式有误，小姐姐 请注意要大小写+数字');
          return false;
      }

    let requestData = {
          username: ruleForm.email, 
          module: model.value
        }

      getSms(requestData).then (res => {

        console.log(res);

      }).catch(error =>{
         console.log(error);
      })


    }
     

    //  暴露数据
     return {
        model,
        loginButtonStatus,
        menuTab,
        ruleForm,
        rules,
        toggleMenu,
        submitForm,
        getLoginSms

     }

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

