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
                    <FormItem label="ParentCate" prop="parentCate">
                        <Select v-model="formValidate.parentCate" placeholder="Select your parent category">
                            <Option :value="0" :key="0" selected >顶节点</Option>
                            <Option  v-for="item in categories" :value="item.cates.Id" :key="item.cates.Id"><span v-html="item.html"></span>{{ item.cates.DisplayName }}</Option>
                        </Select>
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
    import { getCateList,CateCreate} from '@/api/cate'

    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    displayName: '',
                    parentCate: '',
                    seoDescription: '',
                },
                categories: {},
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The name length is too long', trigger: 'blur'}
                    ],
                    displayName: [
                        { required: true, message: 'The displayName cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The displayName length is too long', trigger: 'blur'}
                    ],
                    parentCate: [
                        // { required: true, message: 'Please select the category', trigger: 'blur' },
                        { type: 'integer', message: 'Please select the category', trigger: 'change' },
                    ],
                    seoDescription: [
                        { required: true, message: 'The seo description can not be empty', trigger: 'blur' },
                        { max:250, message: 'The seo description length is too long', trigger: 'blur'}
                    ],
                },
                cateId: 0,
            }
        },
        mounted() {
            this.defaultData();
        },
        methods: {
            defaultData () {
                getCateList().then(res => {
                    this.categories = res.data.data;
                }).catch(err => {
                    this.$Message.error("操作失败"+ err);
                })
            },
            handleSubmit (name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        CateCreate(that.formValidate.name,that.formValidate.displayName,that.formValidate.seoDescription,that.formValidate.parentCate)
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$Message.success(res.data.message);
                                    setTimeout(() => {
                                        this.$router.push('/backend/cate/list')
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
