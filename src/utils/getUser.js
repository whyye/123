import Cookies from "js-cookie"

const adminUser = 'admin-user'

export function getUser (){
    return Cookies.get(adminUser)
}
export function setUser (data){
    return Cookies.set(adminUser,data)
}
export function removeUser (data){
    return Cookies.remove(adminUser)
}