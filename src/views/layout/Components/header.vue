<template>
  <div id="header-wrap">
    头部区域
  </div>
</template>

<script>
export default {
  name:'Header',
  setup(){
    
  }

}
</script>

<style <style lang="scss" scoped>
@import "../../../styles/config.scss";
   #header-wrap {
    position: fixed;
    top: 0;
    left: $navMenu;
    width: 100%;
    height: 75px;
    background-color:#fff;
    box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    z-index: 10;
  }
</style>>
