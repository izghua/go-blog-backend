<template>
    <div>
        <Card>
            <div >
                <Form ref="formValidate" label-position="left" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="Title" prop="title" >
                        <Input v-model="formValidate.title" placeholder="title"></Input>
                    </FormItem>
                    <FormItem label="Category" prop="category">
                        <Select v-model="formValidate.category" placeholder="Select your category">
                            <Option  v-for="item in categories" :value="item.cates.Id" :key="item.cates.Id"><span v-html="item.html"></span>{{ item.cates.DisplayName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="Tags" prop="tags">
                        <Alert type="warning">新增标签去标签页添加,请先保存好数据</Alert>
                        <Select v-model="formValidate.tags" multiple filterable >
                            <Option v-for="item in tags" :value="item.Id" :key="item.Name">{{ item.DisplayName }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="Summary" prop="summary">
                        <Input v-model="formValidate.summary" type="textarea" :autosize="{minRows: 2}" placeholder="Enter summary..."></Input>
                    </FormItem>
                    <FormItem label="Content" prop="Content">
                        <i-editor v-model="formValidate.content" :config="config" :img-url="imgUrl"  :showMdTip="showMdTip" :autosize="autosize" affix paste :placeholder="placeholder" :showSummary="showSummary"></i-editor>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">Submit</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>


            </div>
        </Card>
    </div>
</template>

<script>
    import { PostStore,PostEdit,PostUpdate } from '@/api/post'
    import { getCookie } from '@/libs/cookie'

    export default {
        data () {
            return {
                loading: false,
                formValidate: {
                    title: '',
                    category: '',
                    tags: [],
                    summary: '',
                    content: '',
                },
                categories: {},
                tags: [],
                placeholder:"You can use markdown",
                showSummary:true,
                showMdTip:true,
                showDiff:true,
                autosize: {minRows: 15},
                config: {
                    uploadForm: {
                        token: getCookie('token'),
                        key: '',
                        'upload-token': getCookie('token'),
                    },
                    action: "./",
                    maxSize: 5120
                },
                ruleValidate: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' },
                        { max:100, message: 'The title length is too long', trigger: 'blur'}
                    ],
                    category: [
                        // { required: true, message: 'Please select the category', trigger: 'change' },
                        { type: 'integer', message: 'Please select the category', trigger: 'change' },
                    ],
                    tags: [
                        { type: "array", required: true, message: 'Please select the tags', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: 'The summary can not be empty', trigger: 'blur' },
                        { max:250, message: 'The summary length is too long', trigger: 'blur'}
                    ],
                },
                postId: 0,
            }
        },
        mounted() {
            const id = this.$route.query.id;
            this.postId = id;
            this.defaultData(id);

        },
        methods: {
            defaultData (id) {
                PostEdit(id)
                    .then(data => {
                        this.tags = data.data.data.tags;
                        this.categories = data.data.data.cates;
                        this.config.action = data.data.data.imgUploadUrl;
                        this.formValidate.title = data.data.data.post.post.Title;
                        this.formValidate.summary = data.data.data.post.post.Summary;
                        this.formValidate.content = data.data.data.post.post.Original;
                        this.formValidate.tags = data.data.data.post.postTag;
                        this.formValidate.category = data.data.data.post.postCate;

                    })
                    .catch(() => {
                        console.log("err")
                    });

            },
            imgUrl(res) {
                return res.data.path
            },

            handleSubmit (name) {
                this.loading = true;
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        PostUpdate(that.postId,that.formValidate.title,that.formValidate.category,that.formValidate.tags,that.formValidate.summary,that.formValidate.content)
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$Message.success(res.data.message);
                                    setTimeout(() => {
                                        this.loading = false;
                                        this.$router.push('/backend/post/list')
                                    },2000)
                                } else {
                                    this.$Message.error(res.data.message);
                                    this.loading = false;
                                }
                            }).catch(err => {
                            this.$Message.error("创建失败"+ err);
                        })

                    } else {
                        this.loading = false;
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
