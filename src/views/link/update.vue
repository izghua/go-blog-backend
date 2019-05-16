<template>
    <div>
        <Card>
            <div >
                <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <FormItem label="Name" prop="name" >
                        <Input v-model="formValidate.name" placeholder="title"></Input>
                    </FormItem>
                    <FormItem label="Link" prop="link" >
                        <Input v-model="formValidate.link" placeholder="link"></Input>
                    </FormItem>
                    <FormItem label="Order" prop="order">
                        <Input v-model="formValidate.order"  number placeholder="sort"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>


            </div>
        </Card>
    </div>
</template>

<script>
    import { LinkEdit,LinkUpdate} from '@/api/link'

    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    link: '',
                    order: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The name length is too long', trigger: 'blur'}
                    ],
                    link: [
                        { required: true, message: 'The link cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The link length is too long', trigger: 'blur'}
                    ],
                    order: [
                        { required: true,type: 'number',min: 0, message: 'The order cannot be empty', trigger: 'blur' },
                    ],
                },
                linkId: 0
            }
        },
        mounted() {
            const id = this.$route.query.id;
            this.linkId = id;
            this.defaultData(id);
        },
        methods: {
            defaultData (id) {
                LinkEdit(id)
                    .then(data => {
                        this.formValidate.name = data.data.data.Name;
                        this.formValidate.link = data.data.data.Link;
                        this.formValidate.order = data.data.data.Order;
                    })
                    .catch(err => {
                        this.$Message.error("操作失败"+ err);
                    });
            },
            handleSubmit (name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        LinkUpdate(that.linkId,that.formValidate.name,that.formValidate.link,that.formValidate.order)
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$Message.success(res.data.message);
                                    setTimeout(() => {
                                        this.$router.push('/backend/link/index')
                                    },2000)
                                } else {
                                    this.$Message.error(res.data.message);

                                }
                            }).catch(err => {
                            this.$Message.error("操作失败"+ err);
                        })

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
