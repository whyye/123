<template>
  
     <div class="EditDetail">
      <el-form :model="form" ref="form" label-width="100px">
              <el-form-item label="信息分类:" :label-width="data.formLabelWidth">
                <el-select v-model="form.categoryId " placeholder="请选择类型">
                  <!-- 这里要判断存不存在,不然老报错 -->
               <el-option v-for="item in data.category" :label="item.category_name"  :value="item.id"  :key="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="新闻标题:" :label-width="data.formLabelWidth">
                <el-input v-model="form.title" placeholder="请输入内容" style="width:350px"></el-input>
              </el-form-item>

              <el-form-item label="缩略图:" :label-width="data.formLabelWidth">
                   <!-- 
                      el-upload 的两个重要参数 

                       action="http://up-z2.qiniup.com"   上传的地址 
                       :data="data.uploadKey"             图片上传所要带的东西 ,一般带token,整个对象带就好

                        uploadKey:{
                          token:'',
                          key: ""  文件名转码用的  (上传前要转码)
                         }


                    -->
                    <el-upload
                      class="avatar-uploader"

                      action="http://up-z2.qiniup.com"  
                      :data="data.uploadKey"  

                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
              </el-form-item>

              <el-form-item label="发布日期:" :label-width="data.formLabelWidth"  >
                <el-date-picker
                  v-model="form.createDate"
                  type="date"
                  placeholder="选择日期" disabled>
                </el-date-picker>
              </el-form-item>
              
              <el-form-item label="详细内容:" :label-width="data.formLabelWidth" class="quillEditorHeight">
                <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" class="ql-editor"/>

              </el-form-item>
          </el-form>

          <div slot="footer" class="buttom-footer ">
           
            <el-button type="danger" @click="submit"  v-loading="data.loading">保存</el-button>
            
          </div>
     </div>        
  
</template>

<script>
//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';

import { quillEditor } from "vue-quill-editor"; 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


 import {editInfoList,addInfoList} from '@/api/info.js'
 import { timestampToTime } from "@/utils/timer.js";

 import { QiniuToKen } from "@/api/common";




export default {
 name:"EditDetail",
   components:{quillEditor},

   setup( props, { refs, root }){

    

            //明文传参后接收方式  this.$router.query.传过来的东西
          // let id =root.$route.query.id;
          // console.log(id);

            //密文传参后接收方式  this.$router.params.传过来的东西
        // let id =root.$route.params.id || root.$store.getters['infoDetail/infoId'];
        // let title =root.$route.params.title || root.$store.getters['infoDetail/infoTitle'];

       

        const data = reactive({
              id: root.$route.params.id || root.$store.getters['infoDetail/infoId'],
              category: [],
              editorOption: {},
              loading: false,
              formLabelWidth: '120px',
              uploadKey:{
                token:'',
                 key: ""
              }
       })

        const form = reactive({
          categoryId: "",
          title: "",
          createDate: "",
          content: "",
          imgUrl: ""
        })

         /**
          *
         * 获取七牛云token , 上传到七牛云网址需要
         */
        const getQiniuToKen = () => {
            let requestData = {
                "ak": "p3Q6Fkdkv7X1OKAA8YLr63FVsdVWozVi9eIt46Zg",
                "sk": "r20wgmp9bAP9-UJ_mxeWG9iYjAwHW0hhuVffoSeA",
                "buckety": "jpg1111"
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
        // 上传成功后  要显示地址, 就要拼上上传保存的地方(这个地址是七牛云的地址,A总的) 拼上上传图片的名称 res.key.
        // 最后保存要显示在后台上, 要读取接口把form.imgUrl 附上值,才能一直显示 ,不然刷新页面会看不到
        form.imgUrl = `http://qxigdawhl.hn-bkt.clouddn.com/${res.key}`
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
    

     
          //获取原来的信息列表
      const add_list=()=>{
          let reqData = {
            id:data.id,
            pageNumber: 1,
            pageSize: 1

          }
          // return false;
          addInfoList(reqData).then(res=>{
            
            let resData =res.data.data.data[0]
            form.categoryId= resData.categoryId;
            form.title= resData.title;
            form.content= resData.content;
            form.createDate= timestampToTime(resData.createDate);

            // 上传图片成功后刷新接口会变,,所以一定要请求接口的时候把form.imgUrl 地址附上, 
            // 如果没返回地址  看下是不是 编辑提交的时候 有没有把 imgUrl 提交出去
            form.imgUrl =resData.imgUrl
          

            //  this.$nextTick(() => {
            //   // 在 DOM 中添加 my-component 组件
            //   father.renderComponent = true;
            // });

          

            
          }).catch(err=>{
            
          })
        }

          // 用 store里的获取分类列表的方法 获取分类
          /**
          * 获取信息分类
          */
        const getInfoCategory = () => {
          root.$store.dispatch('common/getInfoCategory').then(response => {
            data.category = response
            
          })
        }

        /**
         * 保存（修改数据时，必须注意的：一定需要一个ID）
         */
        const submit = () => {
          let requestData = {
            id: data.id,
            categoryId: form.categoryId,
            title: form.title,
            content: form.content,

            // 图片上传 要把参数提交出去,不然后台可能不会返回,,看清楚接口
            imgUrl: form.imgUrl
            
          }
          data.loading = true
          

          editInfoList(requestData).then(response => {
            let responseData = response.data
            root.$message({
              message: responseData.message,
              type: 'success'
            })
            data.loading = false
          }).catch(error => {
              data.loading = false
          })
        }
        

        
          //  生命周期
        onMounted(() => {
        getInfoCategory();
        add_list();
        getQiniuToKen()
          
        });

    //  暴露数据
     return {
       
       data,
       form,
       
       add_list,
       submit,
       handleAvatarSuccess,
       beforeAvatarUpload,
       getQiniuToKen


         

     };


   }

       

}
</script>

<style lang="scss" scoped>

 .EditDetail {
   height: 100vh;
   padding-top: 50px;
   .el-form-item{
    margin-bottom: 30px;
    &.quillEditorHeight{
      height: 300px;
    }
  }

 
  
 }

 .buttom-footer {
   margin-left: 60px;
 }

 
  
  
</style>


