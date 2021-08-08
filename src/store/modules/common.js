import { getCategoryListAll } from "@/api/info";
const state = {
    qiniuUrl: "http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/"
}
const getters = {
    qiniuUrl: state => state.qiniuUrl
}
const mutations = {}
const actions = {  // 可以回调处理事情 
    getInfoCategory(content, repuestData) {
        return new Promise((resolve, reject) => {
            getCategoryListAll({}).then((response) => {
                resolve(response.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}



export default {
    namespaced: true,
    mutations,
    state,
    getters,
    actions
};
