<template>
  <Layout style="height: 100%" class="main">
    <!-- 侧边栏 -->
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>

    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avator="userAvator" :message-unread-count="unreadCount"/>
        </header-bar>
      </Header>

      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <!-- 内容 -->
            <router-view/>

          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from "./components/side-menu";
import HeaderBar from "./components/header-bar";
import User from "./components/user";
import routers from "../../router/routers";
import minLogo from "../../assets/images/logo-min.jpg";
import maxLogo from "../../assets/images/logo.jpg";
import "./main.less";
export default {
  name: "Main",
  components: {
    SideMenu,
    HeaderBar,
    User
  },
  data() {
    return {
      collapsed: false, // 侧边栏缩放
      minLogo,
      maxLogo,
      isFullscreen: false
    };
  },
  computed: {
    userAvator() {
      return this.$store.state.app.userInfo.avatorImgPath;
    },
    // sider菜单生成
    menuList() {
      return this.$store.getters["app/menuList"];
    },
    unreadCount() {
      return this.$store.state.app.unreadCount;
    }
  },
  methods: {
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    // sider导航栏展开收起
    handleCollapsedChange(state) {
      this.collapsed = state;
    }
  },
  watch: {
    $route(newRoute) {
      // 设置面包屑
      this.$store.commit("app/setBreadCrumb", newRoute);
      // 更新sider菜单展开项
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    }
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航
     */
    this.$store.commit("app/setBreadCrumb", this.$route);
  }
};
</script>
