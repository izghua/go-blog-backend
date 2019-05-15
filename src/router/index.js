import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
// import store from '@/store'
import iView from 'iview'
import { canTurnTo } from '@/libs/app'
import { getCookie } from '@/libs/cookie'

Vue.use(Router);
const router = new Router({
  routes,
  mode: 'history'
});


// 登陆页name
const LOGIN_PAGE_NAME = 'login';
const REGISTER_PAGE_NAME = 'register';

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next();// 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {

  /**
 * @description 需要登陆页token或cookie认证代码参考如下
 */
  iView.LoadingBar.start();  // 开启loading
  const token = getCookie("token");  // 获得token getToken方法自定义

  if (!token && to.name !== LOGIN_PAGE_NAME && to.name !== REGISTER_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && (to.name === LOGIN_PAGE_NAME || to.name === REGISTER_PAGE_NAME)) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到homeName页
    })
  }

   /**
 * @description 内部系统单点登陆代码参考如下
 */
  //   if (hasGetInfo()) {
  //     // 判断是否登陆成功获得权限列表  hasGetInfo方法自己定义，推荐配合vuex使用
  //     turnTo(to, store.state.app.access, next)
  //   } else {
  //     getUserInfo().then(user => {
  //       // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
  //       turnTo(to, user.access, next)
  //     }).catch(() => {
  //       next({
  //         name: LOGIN_PAGE_NAME
  //       })
  //     })
  //   }

  next()
});

router.afterEach(to => {
  // 如果beforeEach里开启loading则关闭
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});


export default router
