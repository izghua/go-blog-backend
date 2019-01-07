<!-- 自助开发分页组件 -->
<template>
    <div style="text-align:center;background-color:white;padding:15px 0;">
        <Page :total="total" show-sizer show-elevator show-total @on-change="onChange" @on-page-size-change="onPageSizeChange" />
    </div>
</template>

<script>
export default {
  props: {
    total:{default:0},
    'onChange':{
      default(){
        return function(){
          console.log('没有传页数改变回调')
        }
      }
    },
    'onPageSizeChange':{
      default(){
        return function(){
          console.log('没有传每页显示数回调')
        }
      }
    }
  },

  data() {
    return {};
  },

  methods: {},

  components: {},

  computed: {},

  mounted() {}
};
</script>
<style scoped>
</style>