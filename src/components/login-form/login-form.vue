<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="email">
      <Input v-model="form.email" placeholder="请输入账号">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="captcha">
      <Row>
        <Col span="11">
          <Input  v-model="form.captcha" placeholder="请输入验证码">
            <span slot="prepend">
              <Icon :size="14" type="md-image"></Icon>
            </span>
          </Input>
        </Col>
        <Col span="2" style="text-align: center"></Col>
        <Col span="11">
          <img :src="captchaSrc" @click="changeCaptcha()" alt="图形验证码" style="height: 32px;margin-left: 10px;margin-right: 10px">
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
    import { Login,AuthLogin } from '@/api/auth'
    import { setCookie } from '@/libs/cookie'

    export default {
      captchaSrc: '',
      captchaKey: '',
      name: 'LoginForm',
      props: {
        userNameRules: {
          type: Array,
          default: () => {
            return [
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ]
          }
        },
        passwordRules: {
          type: Array,
          default: () => {
            return [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
        },
        captchaRules: {
            type: Array,
            default: () => {
                return [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            }
        }
      },
      data () {
        return {
          form: {
            email: '',
            password: '',
            captcha: '',
          },
          captchaSrc:'',
        }
      },
      computed: {
        rules () {
          return {
            email: this.userNameRules,
            password: this.passwordRules,
              captcha: this.captchaRules
          }
        }
      },
      mounted() {
          this.changeCaptcha()
      },
      methods: {
        handleSubmit () {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
                AuthLogin(this.captchaKey,this.form.email,this.form.password,this.form.captcha)
                  .then(res => {
                    if (res.data.code === 0) {
                        this.$Message.success(res.data.message);
                        setCookie('token',res.data.data);

                        setTimeout(() => {
                            this.$router.push('/backend/home')
                        },1000)
                    } else {
                        this.changeCaptcha();
                        this.$Message.error(res.data.message);
                    }
                  }).catch(err => {
                  this.$Message.error("操作失败"+ err);
                })
              // this.$emit('on-success-valid', {
              //   userName: this.form.userName,
              //   password: this.form.password
              // })
            }
          })
        },
        changeCaptcha() {
          Login()
          .then(res => {
              this.captchaSrc = res.data.data.png;
              this.captchaKey = res.data.data.key;
          })
        }
      }
}
</script>
