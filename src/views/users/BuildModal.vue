<!-- 新建数据源管理 -->
<template>
  <Modal width="900" v-model="$parent.buildVisible" :mask-closable="false" title="新增数据表" :closable="false" :footer-hide="false">
    <Form ref="buildFormDynamic" :model="formValidate" :label-width="80" :rules="ruleValidate">
      <FormItem label="姓名" prop="userName">
        <Input v-model="formValidate.userName" placeholder="请输入" style="width:500px;"></Input>
      </FormItem>
      <FormItem label="创建人" prop="createUser">
        <Input v-model="formValidate.createUser" placeholder="请输入" style="width:500px;"></Input>
      </FormItem>
      <FormItem label="头像" prop="imgrule">
        <div class="demo-upload-list" v-for="(item,index) in viewList" :key="index">
          <img :src="item">
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
          </div>
        </div>
        <Upload ref="upload" :show-upload-list="false" :before-upload="handleBeforeUpload" type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>

    </Form>
    <!-- 自定义弹窗页脚 -->
    <div slot="footer">
      <Button style="margin-right: 8px" :disabled="isload" @click="handleCancel('buildFormDynamic')">取消</Button>
      <Button type="primary" :loading="isload" @click="handleSubmit('buildFormDynamic')">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { GetFd, ImgReader } from "../../libs/tool.js";
// import {  ImgReader } from "../../libs/tool.js";
import { BuildUser } from "../../api/user";
export default {
  props: {},

  data() {
    return {
      isload: false,
      viewList: [],
      formValidate: {
        userName: undefined,
        createUser: undefined,
        imgFile: undefined,
        imgrule: undefined
      },
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "blur"
          }
        ],
        createUser: [
          {
            required: true,
            message: "请填写创建人",
            trigger: "blur"
          }
        ],
        imgrule: [
          {
            required: true,
            message: "请上传头像",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    // 删除图片
    handleRemove(index) {
      this.viewList = [];
      this.formValidate.imgrule = undefined;
      this.formValidate.imgFile = undefined;
    },
    // 上传
    handleBeforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$Message.error("上传头像图片只能是 jpg/jpeg/png 格式!");
      }
      if (!isLt2M) {
        this.$Message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        ImgReader(file, result => {
          this.viewList = [result];
        });
        this.formValidate.imgrule = file.name;
        this.formValidate.imgFile = file;
      }

      return false;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isload = true;
          this.submitData();
        }
      });
    },
    handleCancel() {
      this.$Modal.confirm({
        title: "确定取消新建数据表吗？",
        onOk: () => {
          this.handleReset("buildFormDynamic");
          this.$parent.buildVisible = false;
        },
        okText: "确定",
        cancelText: "取消"
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    submitData() {
      const fd = GetFd(this.formValidate);
      setTimeout(() => {
        this.isload = false;
        this.handleReset("buildFormDynamic");
        this.$Message.success("用户添加成功");
        this.$parent.buildVisible = false;
      }, 1000);
      BuildUser(fd);
      // .then(() => {
      //   this.isload = false;
      //   this.handleReset("buildFormDynamic");
      //   this.$Message.success("用户添加成功");
      //   this.$parent.buildVisible = false;
      //   this.$parent.getList();
      // })
      // .catch(err => {
      //   this.isload = false;
      // });
    }
  },

  components: {},

  computed: {},

  mounted() {}
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
