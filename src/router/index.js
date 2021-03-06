import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'HomeLineChart',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard',affix:true }
    }]
  },

  {
    path: '/department',
    component: Layout,
    redirect: '/department/table',
    name: 'Department',
    meta: { title: '部门管理', icon: 'tree' ,affix:false},
    children: [
      {
        path: 'table',
        name: 'DepartmentAdd',
        component: () => import('@/views/department/add/index'),
        meta: { title: '添加部门', icon: 'department',affix:false }
      },
      {
        path: 'tree',
        name: 'DepartmentList',
        component: () => import('@/views/department/list/index'),
        meta: { title: '部门列表', icon: 'table',affix:false}
      }
    ]
  },

  {
    path: '/position',
    component: Layout,
    redirect: '/position/list',
    name: 'Position',
    meta: { title: '职位管理', icon: 'el-icon-s-help' ,affix:false},
    children: [
      {
        path: 'add',
        name: 'PositionAdd',
        component: () => import('@/views/position/add/index'),
        meta: { title: '添加职位', icon: 'job',affix:false}
      },
      {
        path: 'list',
        name: 'PositionList',
        component: () => import('@/views/position/list/index'),
        meta: { title: '职位列表', icon: 'table',affix:false }
      }  
    ]
  },


  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form',affix:false }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ClipboardDemo',
        component: () => import('@/views/clipboard/index'),
        meta: { title: '剪切板', icon:'clipboard',affix:false }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '数据可视化',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '表一',affix:false },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '表一-一',affix:false }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '表一-二',affix:false },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '表一-二-一',affix:false }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '表一-二-二',affix:false }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '表一-三',affix:false }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '表二',affix:false }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/yuejianjian/Vue-Admin-Template',
        meta: { title: '项目代码地址', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden:true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  console.log("执行了吗?")
}

export default router
