<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"><a href="https://github.com/izghua/go-blog">https://github.com/izghua/go-blog</a></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/login-form'
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>
