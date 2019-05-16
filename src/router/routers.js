import Main from '../components/main'
import parentView from '../components/parent-view'
const Home = ()=>import('../views/single-page/home');// 首页
const User = ()=>import('../views/users/index.vue');// 用户管理
const PostList = ()=>import('../views/post/list.vue');
const PostCreate = ()=>import('../views/post/create.vue');
const PostUpdate = ()=>import('../views/post/update.vue');
const PostTrash = ()=>import('../views/post/trash.vue');
const CateList = ()=>import('../views/cate/list.vue');
const CateUpdate = ()=>import('../views/cate/update.vue');
const CateCreate = ()=>import('../views/cate/create.vue');
const TagIndex = ()=>import('../views/tag/index.vue');
const TagCreate = ()=>import('../views/tag/create.vue');
const TagUpdate = ()=>import('../views/tag/update.vue');
const SystemIndex = ()=>import('../views/system/index.vue');
const LinkIndex = ()=>import('../views/link/index.vue');
const LinkCreate = ()=>import('../views/link/create.vue');
const LinkUpdate = ()=>import('../views/link/update.vue');

/**
 * iview-simple-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/backend/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('../views/login/login.vue')
  },
    {
        path: '/backend/register',
        name: 'register',
        meta: {
            title: 'Register - 注册',
            hideInMenu: true
        },
        component: () => import('../views/register/register.vue')
    },
  // 首页
  {
    path: '/backend/',
    name: 'redirect',
    redirect: '/backend/home',
    meta: {
      hideInMenu: true,
      notCache: true
    },
  },
  {
    path: '/backend/home',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          icon: 'md-home',
          title: '首页',
        },
        component: Home
      }
    ]
  },
  {
    path: '/backend/post',
    name: 'post',
    meta: {
      icon: 'ios-book',
      title: '文章管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'post_list',
        meta: {
          icon: 'ios-book',
          title: '文章列表'
        },
        component: PostList
      },
      {
        path: 'trash',
        name: 'post_trash',
        meta: {
          icon: 'md-trash',
          title: '回收站'
        },
        component: PostTrash
      },
      {
        path: 'create',
        name: 'post_create',
        meta: {
            hideInMenu: true,
            icon: 'ios-book',
            title: '创建文章'
        },
        component: PostCreate
      },
      {
          path: 'update',
          name: 'post_update',
          meta: {
              hideInMenu: true,
              icon: 'ios-book',
              title: '更新文章'
          },
          component: PostUpdate
      },
    ]
  },
  {
      path: '/backend/cate',
      name: 'cate',
      meta: {
          icon: 'ios-book',
          title: '分类管理'
      },
      component: Main,
      children: [
          {
              path: 'list',
              name: 'cate_list',
              meta: {
                  icon: 'ios-book',
                  title: '分类列表'
              },
              component: CateList
          },
          {
              path: 'update',
              name: 'cate_update',
              meta: {
                  hideInMenu: true,
                  icon: 'ios-book',
                  title: '修改分类'
              },
              component: CateUpdate
          },
          {
              path: 'create',
              name: 'cate_create',
              meta: {
                  icon: 'ios-book',
                  title: '创建分类'
              },
              component: CateCreate
          },
      ]
  },
  {
    path: '/backend/tag',
    name: 'tag',
    meta: {
        icon: 'ios-book',
        title: '标签管理'
    },
    component: Main,
    children: [
        {
            path: 'list',
            name: 'tag_list',
            meta: {
                icon: 'ios-book',
                title: '标签列表'
            },
            component: TagIndex
        },
        {
            path: 'update',
            name: 'tag_update',
            meta: {
                hideInMenu: true,
                icon: 'ios-book',
                title: '修改标签'
            },
            component: TagUpdate
        },
        {
            path: 'create',
            name: 'tag_create',
            meta: {
                icon: 'ios-book',
                title: '创建标签'
            },
            component: TagCreate
        },
    ]
},
  {
        path: '/backend/system',
        name: 'system',
        meta: {
            icon: 'ios-book',
            title: '系统管理'
        },
        component: Main,
        children: [
            {
                path: 'index',
                name: 'system_index',
                meta: {
                    icon: 'ios-book',
                    title: '系统设置'
                },
                component: SystemIndex
            },
        ]
    },
    {
        path: '/backend/link',
        name: 'link',
        meta: {
            icon: 'ios-book',
            title: '友链管理'
        },
        component: Main,
        children: [
            {
                path: 'index',
                name: 'link_index',
                meta: {
                    icon: 'ios-book',
                    title: '友链列表'
                },
                component: LinkIndex
            },
            {
                path: 'update',
                name: 'link_update',
                meta: {
                    hideInMenu: true,
                    icon: 'ios-book',
                    title: '修改友链'
                },
                component: LinkUpdate
            },
            {
                path: 'create',
                name: 'link_create',
                meta: {
                    icon: 'ios-book',
                    title: '新增友链'
                },
                component: LinkCreate
            },
        ]
    },
  {
    path: '/backend/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('../views/single-page/message/index.vue')
      }
    ]
  },

  {
    path: '/backend/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error-page/401.vue')
  },
  {
    path: '/backend/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('../views/error-page/500.vue')
  },
  {
    path: '/backend/*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]
