<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <info-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </info-card>
      </i-col>

    </Row>
  </div>
</template>



<script>
  import  InfoCard from '../../../components/info-card'
  import { HomeIndex } from '@/api/system'
  import CountTo from '../../../components/count-to'

  export default {
  name: 'home',
  components: {
    InfoCard,
    CountTo,
  },
  data () {
    return {
      inforCardData: [
        // { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        // { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        // { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        // { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        // { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
    }
  },
  mounted() {
      this.defaultData();
  },
  methods: {
      defaultData() {
          HomeIndex()
              .then(res => {
                  this.inforCardData = res.data.data;
              }).catch(err => {
                this.$Message.error("操作失败"+ err);
          })
      }
  }

}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
