<template>
  <div id="layout-wrap">
    <layoutNav />
    <layoutHeader />
    <layoutMain />
  </div>
</template>

<script>
import layoutNav from './Components/nav.vue';
import layoutHeader from './Components/header.vue';
import layoutMain from './Components/main.vue';

export default {
  name:'layout',
  
  components:{layoutNav,layoutHeader,layoutMain},
  setup(){
    
  }

}
</script>

<style <style lang="scss" scoped>
  
</style>>