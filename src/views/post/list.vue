<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    img{
        width:auto;
        height:auto;
        max-width:100%;
        max-height:100%;
    }
</style>

<template>
    <div>
        <Card>
            <div style="height:auto;">
                <div style="margin-bottom: 20px">
                    <router-link to="post_create">
                        <Button type="info" ghost>创建</Button>
                    </router-link>
                </div>
                <span :data9="data9"></span>
                <Table stripe  :highlight-row=true :columns="columns10" :data="data9"></Table>
                <div style="margin-top: 40px;text-align: center"><Page :current="current" :total="total" @on-change="changePage" :page-size="pageSize"></Page></div>
            </div>
        </Card>
    </div>
</template>
<script>

    import { getPostList } from '@/api/post'
    import { consoleLimit }  from '@/api/conf'
    import expandRow from './expand-post.vue';
    export default {
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row.post
                                }
                            })
                        }
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.post.id)
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.post.title)
                        }
                    },
                    {
                        title: 'category',
                        key: 'category',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.category.displayName)
                        }
                    },
                    {
                        title: 'view',
                        key: 'view',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.view.num)
                        }
                    },
                    {
                        title: 'author',
                        key: 'author',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.author.name)
                        }
                    },
                    {
                        title: 'createdAt',
                        key: 'createdAt',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.post.createdAt)
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data9: [],
                total: 0,
                pageSize: 10,
                current: 1,

            }
        },
        mounted() {
            this.myPage();
        },
        methods: {
            myPage (page = 1) {
                let that  = this
                let params = {
                    "page": page,
                    "limit": consoleLimit
                }
                getPostList(params).then(res => {
                    console.log("看",res.data.data.page.count,"快说快说")
                    this.data9 = res.data.data.list
                    this.total = res.data.data.page.count
                    this.pageSize = res.data.data.page.limit
                    this.current = res.data.data.page.current
                }).catch(err => {
                    console.log("有醋味")
                    console.log(err,"又问题")
                })
            },
            changePage (page) {
                this.myPage(page);
            },
            // myPage (page = 1) {
            //     var that = this;
            //     axios.get('/post',{
            //         // headers: {
            //         //     'x-auth-token': that.token,
            //         // },
            //         params: {
            //             'page':page
            //         }
            //     }).then((res) => {
            //         console.log(res.data)
            //         // this.totalNum = res.data.pager.entities;
            //         // this.pageSize = +res.data.pager.limit;
            //         // this.data6 = res.data.data;
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            // },
            // show (index) {
            //     this.$Modal.info({
            //         title: 'User Info',
            //         content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            //     })
            // },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>
