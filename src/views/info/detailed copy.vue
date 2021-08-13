<template>
  <div class="console-wrap">
    <div class="console-header">
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="label-wrap group">
            <!-- 特别注意 <div class="group-content"> 下包含的标签 一定要写style="width: 100%;" 不然适应不了父元素-->
            <label for="">类型:</label>
            <div class="group-content">
              <el-select
                v-model="type_value"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <template v-if="type_options.list.length != 0">
                  <el-option
                    v-for="item in type_options.list"
                    :key="item.id"
                    :label="item.category_name"
                    :value="item.id"
                  >
                  </el-option>
                </template>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="label-wrap data">
            <label for="">日期: &nbsp&nbsp&nbsp&nbsp</label>
            <div class="group-content">
              <el-date-picker
                style="width: 100%"
                v-model="headerData"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>

        <el-col :span="3">
          <div class="label-wrap keyword">
            <label for="">关键字: &nbsp&nbsp</label>
            <div class="group-content">
              <el-select
                v-model="keyword_value"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in keyword_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>

        <el-col :span="4">
          <el-input
            v-model="search_keyWork"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width: 100%" @click="search"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            class="pull-right"
            style="width: 100%"
            @click="infoAddStatus = true"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="console-menu">
      <el-table
        :data="tableData.item"
        style="width: 100%"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="500"
          align="center"
          label-class-name="bold"
        >
        </el-table-column>
        <el-table-column
          prop="categoryId"
          label="类别"
          width="80"
          align="center"
          label-class-name="bold"
          :formatter="toCategory"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="日期"
          width="180"
          align="center"
          label-class-name="bold"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="administrator"
          label="管理人"
          align="center"
          label-class-name="bold"
          width="80"
        >
        </el-table-column>

        <el-table-column label="操作" align="center" label-class-name="bold">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="editlList(scope.row.id)"
              >编辑</el-button
            >
            <!-- 一, 明文传参用query 页面会显示  刷新不会丢失 -->

            <!-- <router-link
              :to="{ name: 'EditDetailed', query: { id: scope.row.id } }"
              class="routerLinkPadding"
            >
              <el-button size="mini" type="success">编辑详情</el-button>
            </router-link> -->

            <!-- 用js 跳转 -->
            
            <el-button size="mini" type="success" @click="toEdit(scope.row)"
              >编辑详情</el-button
            >


            <!-- 二, 密文传参,页面不显示,刷新参数丢失 只是把query换成 params -->
                    <!-- <router-link
                    :to="{ name: 'EditDetailed', params: { id: scope.row.id ,title:scope.row.title} }"
                    class="routerLinkPadding"
                     >
                        <el-button size="mini" type="success">编辑详情</el-button>
                     </router-link> -->

            <el-button size="mini" type="danger" @click="detelList(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="console-page">
      <el-row>
        <el-col :span="6"
          ><el-button size="small" class="pull-left" @click="detelAll"
            >批量删除</el-button
          ></el-col
        >
        <el-col :span="12">&nbsp</el-col>
        <el-col :span="6">
          <el-pagination
            background
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <!-- 信息添加弹框 组件 -->

    <!-- <InfoAdd :flag.sync="infoAddStatus"  /> -->
    <InfoAdd
      :flag="infoAddStatus"
      @ok="close"
      :typeData="type_options.list"
      @updateList="UpdataList"
    />
    <InfoEdit
      :flag="infoEditStatus"
      @ok="close"
      :typeData="type_options.list"
      @updateList="UpdataList"
      :editId="editData"
    />
  </div>
</template>

<script>
//vue 3.0 试用先引入
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
} from "@vue/composition-api";

// 全局global3.0 写法
import { global } from "@/utils/global_V3.0";

import { getCategoryGlobal } from "@/utils/common.js";
import { timestampToTime } from "@/utils/timer.js";

import { addInfoList, delInfoList } from "@/api/info.js";

import InfoAdd from "./dialog/infoAdd.vue";
import InfoEdit from "./dialog/infoEdit.vue";
export default {
  name: "Detail",
  components: { InfoAdd, InfoEdit },

  setup(props, { refs, root }) {
    // global
    const { confirm } = global();
    //  全局获取分类类别的方法
    const { categoryGlobal, categoryGlobalData } = getCategoryGlobal();

    //声明data数据
    const type_value = ref("");
    const headerData = ref("");
    const keyword_value = ref("id");
    const search_keyWork = ref("");
    let loading = ref(false);
    let deteId = ref("");
    let editData = ref("");

    let total = ref(0);
    const page = reactive({
      pageNumber: 1,
      pageSize: 10,
    });

    // 信息新增弹框状态
    let infoAddStatus = ref(false);
    let infoEditStatus = ref(false);

    // 分页数据
    const currentPage4 = ref(1);

    // 选项数据
    const type_options = reactive({ list: [] });

    //表格数据
    const tableData = reactive(
      //item 写 "" 会报错,,要写 []
      { item: [] }
    );

    // 关键字数据
    const keyword_options = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);

    //方法声明
    // const  updataCodeStaus = (params)=>{

    //   loginCodeStaus.text=params.text;
    //   loginCodeStaus.status=params.status;
    // }

    // 编辑信息详情 用js跳转
    const toEdit = (val) => {
      
      // 路由跳转 密文传输,刷新页面数据丢失,配合store和本地存储,使页面刷新数据不丢失,具体方法,1,跳转前先调用store的方法存一次,顺便本地存储也存,
      //刷新数据store 里 id:"" || sessionStorage.getItem('infoId'), title:"" || sessionStorage.getItem('infoTitle'), 取数据的时候
      //  let id =root.$route.params.id || root.$store.getters['infoDetail/infoId'];  let title =root.$route.params.title || root.$store.getters['infoDetail/infoTitle'];
         
          
   

      // 前存到store 里面
      //  root.$store.commit('infoDetail/SET_ID',val.id)
      // root.$store.commit('infoDetail/SET_TITLE',val.title)

      // 改成一个方法存到store里
        root.$store.commit('infoDetail/SET_INFO',{
          id:{
            value:val.id,
            session:true,
            sessionKey:"infoId"
            
            },
          title: {
            value:val.title,
             session:true,
             sessionKey:"infoTitle"
          }
        })
  


      root.$router.push({
        name: 'EditDetailed',
        params: {
          id: val.id,
          title: val.title,
        },
      });
    };

    // 编辑信息列表
    const editlList = (val) => {
      editData.value = val;
      infoEditStatus.value = true;
    };

    // 搜索的方法
    const search = () => {
      // console.log(type_value.value);
      // console.log(headerData.value);
      // console.log(keyword_value.value);
      // console.log(search_keyWork.value);
      let oo = searchData();
      console.log(oo);
      add_list();
    };
    // 因为搜索要按数据来搜,有选择的就传进去  没选的就不传,但是pageNumber,pageSize 是必传, 所以要定义个方法来专门处理请求的数据,再返回出来
    const searchData = () => {
      let reqData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      };
      if (type_value.value) {
        reqData.categoryId = type_value.value;
      }
      if (headerData.value.length != 0) {
        reqData.start_time = headerData.value[0];
        reqData.end_time = headerData.value[1];
      }
      if (search_keyWork.value) {
        reqData[keyword_value.value] = search_keyWork.value;
      }
      return reqData;
    };

    // 获取列表
    const add_list = () => {
      //  let uu =   {
      //     categoryId: "4354",
      //     categoryName: null,
      //     content: "今日要闻万",
      //     createDate: "1627688014",
      //     end_time: null,
      //     id: "202",
      //     imgUrl: null,
      //     start_time: null,
      //     status: null,
      //     title: "今日要闻,国家对每人发放生活补助金8万"
      //   };

      // let reqData= {

      //   categoryId:"",
      //   title: "",
      //   pageNumber: page.pageNumber,
      //   pageSize: page.pageSize
      // }

      let reqData = searchData();

      loading.value = true;

      addInfoList(reqData)
        .then((res) => {
          let resData = res.data.data;
          tableData.item = resData.data;
          total.value = resData.total;
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
      page.pageSize = val;
      add_list();
    };

    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
      page.pageNumber = val;
      add_list();
    };

    // 弹框 子传父  触发的方法
    const close = (val) => {
      infoAddStatus.value = val;
      infoEditStatus.value = val;
    };

    // 子组件触发更新列表
    const UpdataList = () => {
      add_list();
    };

    // 删除方法
    const detelList = (val) => {
      deteId.value = val.id;

      // 全局提示方法  传参数进去,一般以对象的形式传 方便以后加功能
      root.$warning({
        content: "删除单个吗",
        type: "warning",
        // 传方法
        fn: DeteCategory,
      });
    };
    const detelAll = () => {
      // 全局提示方法  可传 可不传
      // root.$warning();

      //全局提示方法  3.0 写法
      //  confirm({
      //         content: "确认删除当前信息，确认后将无法恢复！！啊啊啊啊",
      //         tip: "哇擦勒",
      //         fn: DeteCategory

      //     })
      if (!deteId.length || deteId.value.length == 0) {
        root.$message.error("请勾选要删的选项");
        return false;
      }

      root.$warning({
        content: "删除所有选中的吗",
        type: "warning",
        // 传方法
        fn: DeteCategory,
      });
    };

    // 饿了么 多选的表格的方法
    const handleSelectionChange = (val) => {
      let ttt = val.map((item) => item.categoryId);
      let yy = ttt.join();
      deteId.value = yy;
    };

    const DeteCategory = () => {
      delInfoList({ id: deteId })
        .then((res) => {
          deteId.value = "";
          add_list();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    watch(
      () => categoryGlobalData.reqData,
      (value) => {
        type_options.list = value;
      }
    );

    // 过滤日期的方法
    const formatter = (row, column, cellValue, index) => {
      //时间搓转换的方法
      return timestampToTime(row.createDate);
    };

    //过滤列表的方法
    const toCategory = (row) => {
      // 找出父级分类ID
      let cateId = row.categoryId;

      // 和类型的数组做匹配,type_options.list中有相同的父级分类ID 就过滤出来成为单独的数组,再选择他对应的类型
      let ss = type_options.list.filter((item) => item.id == cateId);

      return ss[0].category_name;
    };
    //  生命周期
    onMounted(() => {
      // getCategory()
      // 全局获取分类列表的方法
      categoryGlobal();

      //获取列表
      add_list();
    });

    //  暴露数据
    return {
      infoEditStatus,
      editData,
      deteId,
      loading,
      total,
      page,
      type_value,
      type_options,
      headerData,
      keyword_value,
      keyword_options,
      search_keyWork,
      tableData,
      currentPage4,
      handleSizeChange,
      handleCurrentChange,
      infoAddStatus,
      close,
      detelList,
      detelAll,
      add_list,
      UpdataList,
      formatter,
      toCategory,
      DeteCategory,
      handleSelectionChange,
      search,
      searchData,
      editlList,
      toEdit
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.console-wrap {
  padding: 30px;
  font-size: 13px !important;
}

.label-wrap {
  &.group {
    @include layout(58, left);
  }
  &.data {
    @include layout(85, right);
  }
  &.keyword {
    @include layout(60, right);
  }
}
.console-menu,
.console-page {
  margin-top: 40px;
}

.routerLinkPadding {
  padding: 0 10px;
}
</style>


