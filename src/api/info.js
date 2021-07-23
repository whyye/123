
import service from "@/utils/request";

//获取信息分类

export  function getCategoryList(data){
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
    // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
})
  
}



// 添加一级分类


export  function addFirstCategory(data){
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
    // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
})
  
}