import routers from '@/router/routers'
import {getMenuByRouter,getBreadCrumbList} from '@/libs/app'
export default {
  namespaced: true,
  state: {
    access: [],   // 用户权限    
    breadCrumbList:[], // 面包屑
    userInfo:{      // 用户信息
      avatorImgPath:'http://www.ghost64.com/qqtupian/zixunImg/local/2017/12/28/15144398193808.jpg',  // 头像
      userName:null,    // 姓名
    },
    unreadCount:0, // 未读消息数  
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
