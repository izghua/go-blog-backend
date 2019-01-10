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
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="Tags" prop="tags">
                            <!--<span :model="formValidate.tags">{{formValidate.tags}}</span>-->
                            <Select v-model="formValidate.tags" multiple filterable >
                                <Option v-for="item in tags" :value="item.value" :key="item.value">{{ item.tag }}</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="Summary" prop="summary">
                            <Input v-model="formValidate.summary" type="textarea" :autosize="{minRows: 2}" placeholder="Enter summary..."></Input>
                        </FormItem>
                        <FormItem label="Content" prop="Content">
                            <i-editor v-model="content" :showMdTip="showMdTip" :autosize="autosize" affix paste :placeholder="placeholder" :showSummary="showSummary"></i-editor>
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
    import { PostStore } from '@/api/post'

    export default {
        data () {
            return {
                formValidate: {
                    title: '',
                    category: '',
                    tags: [],
                    summary: '',
                    content: '',
                },
                tags: [
                    {
                        value: 'New York',
                        tag: 'New York'
                    },
                    {
                        value: 'London',
                        tag: 'London'
                    },
                    {
                        value: 'Sydney',
                        tag: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        tag: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        tag: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        tag: 'Canberra'
                    }
                ],
                // model10: [],
                content: '',
                placeholder:"支持markdown哦",
                showSummary:true,
                showMdTip:true,
                showDiff:true,
                autosize: {minRows: 15},
                ruleValidate: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: 'Please select the category', trigger: 'blur' },
                    ],
                    tags: [
                        { type: "array", required: true, message: 'Please select the tags', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: 'The summary can not be empty', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                let that = this;
                console.log(that.formValidate.title,"看标题")
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let res = PostStore(that.formValidate.title,that.formValidate.category,that.formValidate.tags,that.formValidate.summary,that.formValidate.content)
                        console.log(res,"看结果")
                        this.$Message.success('Success!');
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
