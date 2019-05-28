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
                <span :data9="data9"></span>
                <Table stripe  :highlight-row=true :columns="columns10" :data="data9"></Table>
                <div style="margin-top: 40px;text-align: center"><Page :current="current" :total="total" @on-change="changePage" :page-size="pageSize"></Page></div>
            </div>
        </Card>
    </div>
</template>
<script>

    import { GetTagList,TagDestory } from '@/api/tag'
    import conf  from '@/api/conf'
    export default {
        data () {
            return {
                columns10: [
                    {
                        title: '#',
                        key: 'id',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.Id)
                        }
                    },
                    {
                        title: 'Tag',
                        key: 'Tag',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.DisplayName)
                        }
                    },
                    {
                        title: 'Num',
                        key: 'Num',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.Num)
                        }
                    },
                    {
                        title: 'CreatedAt',
                        key: 'createdAt',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.CreatedAt)
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
                                            this.edit(params.row.Id)
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
                                            this.remove(params.row.Id)
                                        }
                                    }
                                }, '删除')
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
                let that  = this;
                let params = {
                    "page": page,
                    "limit": conf.consoleLimit
                };
                GetTagList(params).then(res => {
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
                TagDestory(id)
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
                this.$router.push('/backend/tag/update?id=' + id)
            },
        }
    }
</script>
