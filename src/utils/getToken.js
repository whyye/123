import Cookies from "js-cookie"

const adminToken = 'admin-token';

export function getToken (){
    return Cookies.get(adminToken)
}
export function setToken (data){
    return Cookies.set(adminToken,data)
}
export function removeToken (data){
    return Cookies.remove(adminToken)
}