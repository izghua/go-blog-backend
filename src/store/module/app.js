import routers from '@/router/routers'
import {getMenuByRouter,getBreadCrumbList} from '@/libs/app'
import minLogo from "../../assets/images/nice.png";
export default {
  namespaced: true,
  state: {
    access: [],   // 用户权限    
    breadCrumbList:[], // 面包屑
    userInfo:{      // 用户信息
      avatorImgPath:minLogo,  // 头像
      userName:"叶落山城",    // 姓名
    },
    unreadCount:10, // 未读消息数
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers,state.access) // 菜单列表
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route)
    },
  },
  actions: {

  }
}
