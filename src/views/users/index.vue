<!-- 数据源管理 -->
<template>
  <div style="">
    <self-search :model="formInline" :search-submit="handleSubmit">
      <FormItem label="姓名" style="width:25%" prop="userName">
        <Input type="text" v-model.trim="formInline.userName" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="添加人" style="width:25%" prop="createUser">
        <Input type="text" v-model.trim="formInline.createUser" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="添加时间" prop="createTime">
        <DatePicker :editable="false" v-model="formInline.createTime" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
      </FormItem>
    </self-search>
    <Button @click="buildVisible = true" type="primary" style="margin-bottom:10px;">新建用户</Button>
    <Table :loading="tableLoad" border :columns="columns" :data="dataList" @on-sort-change="sortChange"></Table>
    <self-page :total="total" :onChange="onPageChange" :onPageSizeChange="onPageSizeChange"></self-page>
    <build-modal></build-modal>
  </div>
</template>

<script>
import { Format, SearchExit } from "../../libs/tool.js";
// import {  } from "../../libs/app.js";
import SelfPage from "../../components/self-page/SelfPage.vue";
import SelfSearch from "../../components/self-search/SelfSearch.vue";
import BuildModal from "./BuildModal";
import { GetUserList } from "../../api/user";
export default {
  props: {},

  data() {
    return {
      buildVisible: false, // 新建
      formInline: {
        userName: undefined,
        createUser: undefined,
        createTime: []
      },
      ruleInline: {},
      columns: [
        {
          title: "头像",
          key: "userHeader",
          render: (h, params) => {
            return h("img", {
              attrs: { src: params.row.userHeader },
              style: { height: "32px", width: "32px" }
            });
          }
        },
        {
          title: "姓名",
          key: "userName"
        },
        {
          title: "更新时间",
          key: "createTime",
          sortable: "custom"
        },
        {
          title: "添加人",
          key: "createUser"
        },
        {
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.openDetailModal(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.openEditModal(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataList: [],
      tableLoad: false,
      total: 0,
      searchConditions: {
        sort: {
          // 排序
          property: null, // 排序对象
          direction: null // 排序顺序
        },
        page: {
          // 页码
          num: 1,
          size: 10
        }
      },
    };
  },

  methods: {
    remove(param) {
      this.$Modal.confirm({
        title: "是否删除该数据表",
        onOk: () => {
          console.log('删除')
        },
        okText: "确定",
        cancelText: "取消"
      });
    },
    // 开启新建
    OpenBuildModal() {
      if (this.tableLoad) return;
      this.buildVisible = true;
      console.log("新建");
    },
    // 开启编辑
    openEditModal(params) {
      console.log("编辑");
    },
    // 开启详情
    openDetailModal(params) {
      console.log('查看详情')
    },

    // 查询
    handleSubmit() {
      this.searchConditions.page.num = 1
      this.getList();
    },

    // 排序事件
    sortChange(c) {
      let property, direction;
      if (c.key === "createTime") {
        property = "create_time";
      }
      if (c.order === "asc") {
        direction = "ASC";
      }
      if (c.order === "desc") {
        direction = "DESC";
      }
      // 保存排序条件
      this.searchConditions.sort.property = property;
      this.searchConditions.sort.direction = direction;
      this.getList();
    },
    onPageChange(num) {
      // 保存分页条件
      this.searchConditions.page.num = num;
      this.getList();
    },
    onPageSizeChange(size) {
      // 保存分页条件
      this.searchConditions.page.size = size;
      this.getList();
    },
    getList() {
     // this.tableLoad = true;
     // 整理条件参数
      const params = {
        page: {
          num: this.searchConditions.page.num,
          size: this.searchConditions.page.size
        },
        sort: {
          property: this.searchConditions.sort.property,
          direction: this.searchConditions.sort.direction
        },
        search: {
          userName: this.formInline.userName,
          createUser: this.formInline.createUser,
          startTime: SearchExit(this.formInline.createTime[0])
            ? Format(this.formInline.createTime[0])
            : null,
          endTime: SearchExit(this.formInline.createTime[1])
            ? Format(this.formInline.createTime[1])
            : null
        }
      };
      // 过滤空参数
      // Object.keys(params).forEach(doc => {
      //   Object.keys(params[doc]).forEach(item => {
      //     if (!SearchExit(params[doc][item])) {
      //       delete params[doc][item];
      //     }
      //   });
      // });

      GetUserList(params)
        // .then(data => {

        // })
        // .catch(() => {
        //   this.tableLoad = false;
        // });
    }
  },

  components: {
    SelfPage,
    SelfSearch,
    BuildModal,
  },

  computed: {},

  mounted() {
    // mocks数据
    this.dataList = [
      {
        userHeader:
          "http://www.ghost64.com/qqtupian/zixunImg/local/2017/12/28/15144398193808.jpg",
        userName: "管理员a",
        createTime: "2018-11-11",
        createUser: "添加人a"
      },
      {
        userHeader:
          "http://www.ghost64.com/qqtupian/zixunImg/local/2017/12/28/15144398193808.jpg",
        userName: "管理员b",
        createTime: "2018-11-11",
        createUser: "添加人b"
      },
      {
        userHeader:
          "http://www.ghost64.com/qqtupian/zixunImg/local/2017/12/28/15144398193808.jpg",
        userName: "管理员c",
        createTime: "2018-11-11",
        createUser: "添加人c"
      }
    ];
    this.getList();
  },
  beforeDestroy() {

  }
};
</script>
<style scoped>
</style>
