<template>
  <div id="main-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'Main',
  setup(){

  }

}
</script>

<style <style lang="scss" scoped>
@import "../../../styles/config.scss";
    #main-wrap {
      position: absolute;
      top: 75px;
      left: $navMenu;
      
      right: 0;
      border:30px solid #f7f7f7;
      background-color:#fff;
      // border-bottom: none;
        @include webkit(transition,all .5s ease 0s );

  }
   .open {
    #main-wrap{
      left: $navMenu;
    }
  }
  .close {
    #main-wrap{
      left: $navMenMin;
      
    }
  }

</style>>
