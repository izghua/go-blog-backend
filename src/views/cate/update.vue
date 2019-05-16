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
                            <!--<Option :value="0" :key="0" >顶节点</Option>-->
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
    import { CateEdit,getCateList,CateUpdate} from '@/api/cate'

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
                        // { required: true, message: 'Please select the category232', trigger: 'change' },
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
            const id = this.$route.query.id;
            this.cateId = id;
            this.defaultData(id);
        },
        methods: {
            defaultData (id) {
                CateEdit(id)
                    .then(data => {
                        this.formValidate.name = data.data.data.Name;
                        this.formValidate.displayName = data.data.data.DisplayName;
                        this.formValidate.seoDescription = data.data.data.SeoDesc;
                        this.formValidate.parentCate = data.data.data.ParentId;
                    })
                    .catch(err => {
                        this.$Message.error("操作失败"+ err);
                    });
                getCateList().then(res => {
                    var catess = [];
                    catess.push({"cates":{"Id":0,"DisplayName":"顶节点"},"html":""});
                    this.categories =  catess.concat(res.data.data);
                }).catch(err => {
                    this.$Message.error("操作失败"+ err);
                })
            },
            handleSubmit (name) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        CateUpdate(that.cateId,that.formValidate.name,that.formValidate.displayName,that.formValidate.seoDescription,that.formValidate.parentCate)
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
