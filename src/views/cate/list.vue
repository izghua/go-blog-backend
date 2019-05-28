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
            </div>
        </Card>
    </div>
</template>
<script>

    import { getCateList,CateDestory } from '@/api/cate'
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
                            },params.row.cates.Id)
                        }
                    },
                    {
                        title: 'Category',
                        key: 'category',
                        render: (h,params) => {
                            return h('Tooltip',
                                 {
                                    domProps: {
                                        innerHTML: params.row.html + params.row.cates.DisplayName,
                                    },
                                });
                                // {
                                //     props: {
                                //         content:  params.row.cates.SeoDesc,
                                //         // innerHTML:params.row.html + params.row.cates.DisplayName,
                                //     },
                                //     style: {
                                //         maxWidth: '200'
                                //     },
                                // }

                            // return h('Tooltip', {
                            //     domProps: {
                            //         // content:  params.row.cates.DisplayName,
                            //         innerHTML: params.row.html + params.row.cates.DisplayName,
                            //     }
                            // }, {
                            //     domProps: {
                            //         content:  params.row.cates.SeoDesc,
                            //         innerHTML:params.row.html + params.row.cates.DisplayName,
                            //     },
                            //     style: {
                            //         maxWidth: '200'
                            //     },
                            // })
                        }
                    },
                    {
                        title: 'CreatedAt',
                        key: 'createdAt',
                        render: (h,params) => {
                            return h('div', {
                                props: {
                                },
                            },params.row.cates.CreatedAt)
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
                                            this.edit(params.row.cates.Id)
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
                                            this.remove(params.row.cates.Id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data9: [],
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
                getCateList(params).then(res => {
                    this.data9 = res.data.data;
                }).catch(err => {
                    this.$Message.error("操作失败"+ err);
                })
            },
            changePage (page) {
                this.myPage(page);
            },

            remove (id) {
                CateDestory(id)
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
                this.$router.push('/backend/cate/update?id=' + id)
            },
        }
    }
</script>
