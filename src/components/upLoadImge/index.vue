<template>
  
     
                   <!-- 
                      el-upload 的两个重要参数 

                       action="http://up-z2.qiniup.com"   上传的地址 
                       :data="data.uploadKey"             图片上传所要带的东西 ,一般带token,整个对象带就好

                        uploadKey:{
                          token:'',
                          key: ""  文件名转码用的  (上传前要转码)
                         }


                    -->
                   <div>
                      <el-upload
                      class="avatar-uploader"

                      :action="config.action"  
                      :data="data.uploadKey"  

                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="upLoad.imgUrl" :src="upLoad.imgUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                   </div>
  
</template>

<script>
//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';






 import { QiniuToKen } from "@/api/common";


/**
 * 图片上传的组件封装, 要传进来的 imgUrl ,  和可以不写死从外面配置进来的东西config,可以分成
 * 两段写,就是写两个props, 一个是主要功能,一个是主要配置,因为主要imgUrl是请求接口后传过来的
 * 所以需要监听,  主要配置因为默认就实打实的传进来的,直接赋值就可以 不需要监听,
 * 重点是修改是需要imgUrl地址的,vue是单项数据流,不能监听完就修改父组件的值,所以要单独声明
 * 变量来赋值,但点击提交时,,因为要修改最新的图片地址,所以要把图片地址返回出去,就要用到修饰符
 * 
 *  要把图片的地址返回出去,
        emit("update:imgUrl",Img);
 */

export default {
 name:"UpLoadImage",
   components:{},
   props:{

    imgUrl:{
      type:String,
      default:''
    },
    config:{
      type:Object,
      default:()=>{}
    },
   

  },

   setup( props, { refs, root,emit }){

        const data = reactive({
              uploadKey:{
                token:'',
                 key: ""
              }
       })

        const upLoad = reactive({
          
          imgUrl: ""
        })

         /**
          *
         * 获取七牛云token , 上传到七牛云网址需要
         */
        const getQiniuToKen = () => {
            let requestData = {
                "ak": props.config.ak,
                "sk":  props.config.sk,
                "buckety":  props.config.buckety
            }
            QiniuToKen(requestData).then(response => {
                data.uploadKey.token = response.data.data.token
                console.log(data.uploadKey.token);

                // 后面上传前 要做文件名转码,再图片上传前那个方法里设置转码
            })
        }

       /**
        * 图片上传的方法
        * 
        */
      const  handleAvatarSuccess = (res, file)=>{
        console.log(res);
        let Img =`http://qxigdawhl.hn-bkt.clouddn.com/${res.key}`
        // 上传成功后  要显示地址, 就要拼上上传保存的地方(这个地址是七牛云的地址,A总的) 拼上上传图片的名称 res.key.
        // 最后保存要显示在后台上, 要读取接口把form.imgUrl 附上值,才能一直显示 ,不然刷新页面会看不到
        upLoad.imgUrl = Img
        

        // 上传成功后 要把图片的地址返回出去,
        emit("update:imgUrl",Img);

      };
      const beforeAvatarUpload = (file)=> {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          root.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          root.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // 上传前文件名转码
        let suffix = file.name
        let key = encodeURI(`${suffix}`)
        data.uploadKey.key=key;


        return isJPG && isLt2M;
      }
    

     
     
         

        

      watch(
      () => props.imgUrl,
      (value) => {
        
        upLoad.imgUrl =value
      }
    );

         
        

        
          //  生命周期
        onMounted(() => {
      
        getQiniuToKen()
          
        });

    //  暴露数据
     return {
       
      upLoad,
      data,
       handleAvatarSuccess,
       beforeAvatarUpload,
       getQiniuToKen


         

     };


   }

       

}
</script>

<style lang="scss" scoped>


  
  
</style>


