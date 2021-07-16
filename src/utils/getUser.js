import Cookies from "js-cookie"



export function getUser (){
    return Cookies.get('admin-user')
}
export function setUser (data){
    return Cookies.set('admin-user',data)
}
export function removeUser (data){
    return Cookies.remove('admin-user')
}