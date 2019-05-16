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
                    <router-link to="create">
                        <Button type="info" ghost>创建</Button>
                    </router-link>
                </div>
                <!--<span :data9="data9"></span>-->
                <Table stripe  :highlight-row=true :columns="columns10" :data="data9"></Table>
                <div style="margin-top: 40px;text-align: center"><Page :current="current" :total="total" @on-change="changePage" :page-size="pageSize"></Page></div>
            </div>
        </Card>
    </div>
</template>
<script>

    import { getPostList,PostDestory } from '@/api/post'
    import conf  from '@/api/conf'
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
                                            this.edit(params.row.post.id)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.post.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data9: [],
                total: 1,
                pageSize: 10,
                current: 1,

            }
        },
        mounted() {
            this.myPage();
        },
        methods: {
            myPage (page = 1) {
                let that  = this;
                let params = {
                    "page": page,
                    "limit": conf.consoleLimit
                };
                getPostList(params).then(res => {
                    if (res.data.data.list && res.data.data.list.length > 0) {
                        this.data9 = res.data.data.list;
                        this.total = res.data.data.page.count;
                        this.pageSize = res.data.data.page.limit;
                        this.current = res.data.data.page.current
                    } else {
                        this.data9 = [];
                        this.total = 0;
                        this.pageSize = 10;
                        this.current = 1;
                    }
                }).catch(err => {
                    this.$Message.error("操作失败"+ err);
                })
            },
            changePage (page) {
                this.myPage(page);
            },

            remove (id) {
                PostDestory(id)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$Message.success(res.data.message);
                            setTimeout(() => {
                                this.myPage(1);
                            },2000)
                        } else {
                            this.$Message.error(res.data.message);

                        }
                    }).catch(err => {
                    this.$Message.error("操作失败"+ err);
                })
            },
            edit (id) {
                this.$router.push('/backend/post/update?id=' + id)
            },
        }
    }
</script>
