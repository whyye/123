import Vue from "vue";
import svgIcon from "./svg.vue";


//注册全局组件

Vue.component('svg-icon',svgIcon )



// 解释SVg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
