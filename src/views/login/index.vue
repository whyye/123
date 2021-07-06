<template>
  <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
          <li v-for="(item,index) in menuTab" :key=item.index  :class="{'current':item.current}" @click="toggleMenu(item)"> {{item.txt}}</li>
          
        </ul>
    </div>
  </div>
</template>

<script>
 
export default {
   name:"login",
   data() {
     return {
       menuTab:[
        {txt:"登录",current:true },
        {txt:"注册",current:false }
       ]
     }
   },
   methods:{
     toggleMenu(data){
       this.menuTab.forEach(el => {
          el.current=false
       });
       data.current=true;
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
  }
</style>>

