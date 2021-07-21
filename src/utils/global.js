
// 2.0写法 
export default {
    install (Vue, options) {
      Vue.prototype.$warning = function (params="") {
        console.log('Plugin Test')
        this.$confirm( params.content || '此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: params.type || 'warning'
        }).then(() => {
            
            if(params.fn) {
              params.fn()
            }else {
              console.log('不存在传进来的方法');
            }

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      }
    }
  }