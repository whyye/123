import Cookies from "js-cookie"



export function getToken (){
    return Cookies.get('admin-token')
}
export function setToken (data){
    return Cookies.set('admin-token',data)
}
export function removeToken (data){
    return Cookies.remove('admin-token')
}