<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
            </Input>
        </FormItem>
        <FormItem prop="email">
            <Input v-model="form.email" placeholder="请输入邮箱">
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
        <FormItem prop="rePassword">
            <Input type="password" v-model="form.rePassword" placeholder="请再次输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
            </Input>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" type="primary" long>注册</Button>
        </FormItem>
    </Form>
</template>
<script>
    import { Register,AuthRegister } from '@/api/auth'

    export default {
        name: 'RegisterForm',
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
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            },
            emailRules: {
                type: Array,
                default: () => {
                    return [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        data () {
            const rePasswdRule = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.form.password) {
                        callback(new Error('两次密码不一致'));
                    } else {
                        callback();
                    }
            }
            return {
                form: {
                    email: '',
                    password: '',
                    userName: '',
                    rePassword: '',
                },
                rePasswdRule,
            }
        },
        computed: {
            rules () {
                return {
                    email: this.emailRules,
                    password: this.passwordRules,
                    userName: this.userNameRules,
                    rePassword: this.rePasswdRule,
                }
            }
        },
        mounted() {
            this.defaultInit()
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        AuthRegister(this.form.userName,this.form.email,this.form.password)
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$Message.success(res.data.message);
                                    setTimeout(() => {
                                        this.$router.push('/backend/login')
                                    },2000)

                                } else {
                                    this.$Message.error(res.data.message);
                                }
                            }).catch(err => {
                                this.$Message.error("操作失败"+ err);
                            })
                    }
                })
            },
            defaultInit() {
                Register()
                    .then(res => {
                        if (res.data.code !== 0) {
                            this.$router.push('/login')
                        }
                    }).catch(err => {
                        this.$Message.error("操作失败"+ err);
                    })
            }
        }
    }
</script>
