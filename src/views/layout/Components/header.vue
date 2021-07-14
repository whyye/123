<template>
  <div id="header-wrap">
    <div class="pull-left header-icon">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right ">
      <div class="header-info pull-left">
        <img src="../../../assets/admin.png" alt="">
        <span>管理员</span>
      </div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
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
    right: 0;
    left: $navMenu;
    
    height: 75px;
    background-color:#fff;
    box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    z-index: 10;
    .header-icon {
      line-height: 75px;
      font-size: 20px;
      padding: 0 26px;
      cursor: pointer;
    }
    .header-info {
      cursor: pointer;
      line-height: 75px;
      font-size: 13px;
      padding: 0 26px;
      border-right: 1px solid #ddd;
      img {
         display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        vertical-align: middle;
        margin-right: 20px;
      }
    }
  }
</style>>
