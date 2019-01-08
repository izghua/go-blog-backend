<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .log-img {
        display:block;
        margin: 0 auto;
        width: 20%;
        height: 20%;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 50%;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible  :collapsed-width="78" v-model="isCollapsed">
                <Menu theme="dark"   width="auto" accordion :class="menuitemClasses" @on-select="handleSelect">
                    <img class="log-img" src="http://image.iphpt.com/1509003662wGdnYZDxr6a525f9c91847315e2de94ede9ac64dd3.jpg" alt="log">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper" ></Icon>
                                <span>内容管理</span>
                        </template>
                        <MenuItem name="/post" >
                            <Tooltip content="文章列表" theme="light" placement="right">
                                <Icon type="ios-navigate"></Icon>&nbsp;&nbsp;
                            </Tooltip>
                            <span>文章列表</span>
                        </MenuItem>
                        <MenuItem name="1-2" to="/post/list">
                            <Tooltip content="评论管理" theme="light" placement="right">
                                <Icon type="ios-search"></Icon>&nbsp;&nbsp;
                            </Tooltip>
                            <span>评论管理</span>
                        </MenuItem>
                        <MenuItem name="1-3">
                            <Tooltip content="留言管理" theme="light" placement="right">
                                <Icon type="ios-settings"></Icon>&nbsp;&nbsp;
                            </Tooltip>
                            <span>留言管理</span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Tooltip content="用户管理" theme="light" placement="right">
                                <Icon type="ios-people"></Icon>&nbsp;&nbsp;
                            </Tooltip>
                            <span>用户管理</span>
                        </template>
                        <MenuItem name="2-1">
                            <Tooltip content="用户列表" theme="light" placement="right">
                                <Icon type="ios-settings"></Icon>&nbsp;&nbsp;
                            </Tooltip>
                            <span>用户列表</span>
                        </MenuItem>
                    </Submenu>
                </Menu>
                <br>

            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <div style="float: right;">
                        <Badge :count="3">
                            <Dropdown trigger="click" style="margin-left: 20px;float: right;">
                                <a href="javascript:void(0)">
                                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"></Avatar>
                                    <!--<Icon type="ios-arrow-down"></Icon>-->
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>驴打滚</DropdownItem>
                                    <DropdownItem>炸酱面</DropdownItem>
                                    <DropdownItem>豆汁儿</DropdownItem>
                                    <DropdownItem>冰糖葫芦</DropdownItem>
                                    <DropdownItem>北京烤鸭</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Badge>
                    </div>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                count:12,
                isCollapsed: false,
            };
        },
        name: 'home',
        mounted() {
        },

        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            handleSelect (name) {
                this.$router.push(name);
            },
        }
    }
</script>
