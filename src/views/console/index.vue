<template>
  <div class="console-wrap">
     <div class="console-header">
        <el-row :gutter="16">
          <el-col :span="4">
             <div class="label-wrap group">

               <!-- 特别注意 <div class="group-content"> 下包含的标签 一定要写style="width: 100%;" 不然适应不了父元素-->
                <label for="">类型:</label>
                <div class="group-content">
                     <el-select v-model="type_value" placeholder="请选择" style="width: 100%;">
                          <el-option
                            v-for="item in type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                     </el-select>
                </div>
             </div>
          </el-col>
          <el-col :span="7">
             <div class="label-wrap data">
                <label for="">日期: &nbsp&nbsp&nbsp&nbsp</label>
                <div class="group-content">
                   <el-date-picker
                      style="width: 100%;"
                      v-model="headerData"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </div>
             </div>
          </el-col>

          <el-col :span="3">
             <div class="label-wrap keyword">
                <label for="">关键字: &nbsp&nbsp</label>
                <div class="group-content">
                   <el-select v-model="keyword_value" placeholder="请选择" style="width: 100%;">
                          <el-option
                            v-for="item in keyword_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                     </el-select>
                </div>
             </div>
          </el-col>
         

           <el-col :span="4">
                <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;">搜索</el-button>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width: 100%;" >新增</el-button>
            </el-col>
         
            
          
         
        </el-row>
     </div>
     <div class="console-menu">

            <el-table :data="tableData"  style="width: 100%" border >

                <el-table-column type="selection" width="40" align="center" > </el-table-column>
                <el-table-column prop="title" label="标题" width="600" align="center" label-class-name='bold'> </el-table-column>
                <el-table-column prop="type" label="类别" width="80"   align="center" label-class-name='bold'> </el-table-column>
                <el-table-column prop="data" label="日期" width="180"  align="center" label-class-name='bold'> </el-table-column>
                <el-table-column prop="administrator" label="管理人"   align="center" label-class-name='bold' width="80"> </el-table-column>
                

                 <el-table-column label="操作" align="center" label-class-name='bold'>
                    <template slot-scope="scope">
                      <el-button size="mini" type="success">编辑</el-button>
                      <el-button size="mini" type="danger">删除</el-button>
                    </template>
               </el-table-column>
        
             </el-table>

     </div>
     <div class="console-page">
        <el-row>
          <el-col :span="6"><el-button size="small"  class="pull-left ">批量删除</el-button></el-col>
          <el-col :span="12">&nbsp</el-col>
          <el-col :span="6">
                <el-pagination
                    background
                    class="pull-right "
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="70">
                 </el-pagination>
          </el-col>
        </el-row>
     </div>
  </div>
</template>

<script>
//vue 3.0 试用先引入
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';
export default {
 name:"Console",
   setup( props, { refs, root }){

    //声明data数据
    const type_value = ref('');
    const headerData = ref('');
    const keyword_value = ref(1);
    const search_keyWork = ref('');

    // 分页数据
    const currentPage4 = ref(4);
    

  // 选项数据
    const  type_options = reactive(
      [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
          
    );

    //表格数据
    const  tableData = reactive(
       [{
            title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
            type: '国内信息',
            data: '2019-09-10 19:31:31',
            administrator:'管理员',
           

          },
          {
            title: '习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话',
            type: '国内信息',
            data: '2019-09-10 19:31:31',
            administrator:'李四',
            

          },{
            title: '基里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
            type: '国内信息',
            data: '2019-09-10 19:31:31',
            administrator:'九五',
           

          },{
            title: '不选了！纽约市长白思豪宣布退出2020美国大选',
            type: '国内信息',
            data: '2019-09-10 19:31:31',
            administrator:'张三',
            

          }]


          
    );

    // 关键字数据
    const  keyword_options = reactive(
      [{
          value: 1,
          label: 'ID'
        }, {
          value: 2,
          label: '类别'
        }]
          
    );

    //方法声明
    // const  updataCodeStaus = (params)=>{

    //   loginCodeStaus.text=params.text;
    //   loginCodeStaus.status=params.status;
    // }
     const handleSizeChange = (val) =>{
        console.log(`每页 ${val} 条`);
      };

      const handleCurrentChange = (val) =>{
        console.log(`当前页: ${val}`);
      };
    

   

     

    //  暴露数据
     return {
        type_value,
        type_options,
        headerData,
        keyword_value,
        keyword_options,
        search_keyWork,
        tableData,
        currentPage4,
        handleSizeChange,
        handleCurrentChange

     }


   }

       

}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
  .console-wrap{
    padding: 30px;
    font-size: 13px !important;
  }
  
  .label-wrap {
    &.group {
        @include layout(58,left);
    }
    &.data {
        @include layout(85,right);
    }
    &.keyword {
        @include layout(70,right);
    }
  }
  .console-menu , .console-page {
    margin-top: 40px;
  }
  
 
  
  
</style>


