<!-- 自助开发搜索组件 -->
<template>
    <div>
        <Form ref="formInline" :model="$parent.formInline" :label-width="80" inline :rules="$parent.ruleInline">
            <slot></slot>
            <FormItem>
                <Button type="primary" style="margin-right:20px;" @click="handleSubmit('formInline')">查询</Button>
                <Button @click="handleReset('formInline')">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
  props: {
    searchSubmit:{
      default(){
        return function(){
          console.log('没传入查询函数')
        }
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.searchSubmit()
        } else {
          this.$Message.error("查询失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },

  components: {},

  computed: {},

  mounted() {}
};
</script>
<style scoped>
</style>