<template>
  <div id="layout-wrap" :class="[isCollapse?'close':'open']">
    <layoutNav />
    <layoutHeader />
    <layoutMain />
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted, computed } from '@vue/composition-api';

import layoutNav from './Components/nav.vue';
import layoutHeader from './Components/header.vue';
import layoutMain from './Components/main.vue';

export default {
  name:'layout',
  
  components:{layoutNav,layoutHeader,layoutMain},
  setup(props, {root}){
           /**
       * computed 监听
       */
   const isCollapse = computed(() => root.$store.state.login.isCollapse);
   console.log(root.$store.state.login);

   return {
     isCollapse
   }
  }

}
</script>

<style <style lang="scss" scoped>
#layout-wrap{
  background-color: #fff;
}
  
</style>>