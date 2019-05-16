<template>
    <div>
        <Card>
            <div >
                <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <FormItem label="Name" prop="name" >
                        <Input v-model="formValidate.name" placeholder="title"></Input>
                    </FormItem>
                    <FormItem label="DisplayName" prop="displayName" >
                        <Input v-model="formValidate.displayName" placeholder="title"></Input>
                    </FormItem>
                    <FormItem label="SeoDescription" prop="seoDescription">
                        <Input v-model="formValidate.seoDescription" type="textarea" :autosize="{minRows: 2}" placeholder="Enter seo description..."></Input>
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
    import { TagCreate} from '@/api/tag'

    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    displayName: '',
                    seoDescription: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The name length is too long', trigger: 'blur'}
                    ],
                    displayName: [
                        { required: true, message: 'The displayName cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The displayName length is too long', trigger: 'blur'}
                    ],
                    seoDescription: [
                        { required: true, message: 'The seo description can not be empty', trigger: 'blur' },
                        { max:250, message: 'The seo description length is too long', trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
            handleSubmit (name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        TagCreate(that.formValidate.name,that.formValidate.displayName,that.formValidate.seoDescription)
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$Message.success(res.data.message);
                                    setTimeout(() => {
                                        this.$router.push('/backend/tag/list')
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
