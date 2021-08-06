import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    meta: {
      name: "控制台",
      icon: 'console'
    },
    
    component: () => import("../views/layout/index.vue"),
    children:[
       {
        path: "/index",
        name: "index",
        meta: {
         
          name: "首页"
        },
        
        component: () => import("../views/info/detailed.vue"),
       }
      
    ]
  },
  // 信息管理
  {
    path: "/info",
    name: "Info",
    
    meta: {
      name: "信息管理",
      icon: 'minus'
    },
    
    component: () => import("../views/layout/index.vue"),
    children:[
       {
        path: "/detailed",
        name: "Detailed",
        
        meta: {
         
          name: "信息列表"
        },
        
        component: () => import("../views/info/detailed.vue"),
       },

       {
        path: "/Editdetailed",
        name: "EditDetailed",
        hidden:true,
        
        meta: {
         
          name: "信息详情"
        },
        
        component: () => import("../views/info/Editdetailed.vue"),
       },

       {
        path: "/category",
        name: "Category",
        meta: {
         
          name: "信息分类",
          icon: 'minus'
        },
        
        component: () => import("../views/info/category.vue"),
       }
      
    ]
  },
  // 用户管理
  {
    path: "/user",
    name: "User",
    
    meta: {
      name: "用户管理",
      icon: 'user'
    },
    
    component: () => import("../views/layout/index.vue"),
    children:[
       {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
         
          name: "用户列表"
        },
        
        component: () => import("../views/user/userIndex.vue"),
       }
      
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
