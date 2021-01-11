import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        redirect: { name: 'course' },
        meta: {
          name: '首页',
          requiresAuth: true
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          name: '角色管理',
          requiresAuth: true
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          name: '菜单管理',
          requiresAuth: true
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: {
          name: '资源管理',
          requiresAuth: true
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          name: '课程管理',
          requiresAuth: true
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          name: '用户管理',
          requiresAuth: true
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          name: '广告管理',
          requiresAuth: true
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),
        meta: {
          name: '广告位管理',
          requiresAuth: true
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue'),
        meta: {
          name: '添加菜单',
          requiresAuth: true
        }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */ '@/views/menu/edit.vue'),
        meta: {
          name: '编辑菜单',
          requiresAuth: true
        }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        props: true,
        meta: {
          name: '角色菜单管理',
          requiresAuth: true
        }
      },
      {
        path: '/course-create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
        meta: {
          name: '课程管理',
          requiresAuth: true
        }
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        props: true,
        meta: {
          name: '课程编辑',
          requiresAuth: true
        }
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true,
        meta: {
          name: '课程结构',
          requiresAuth: true
        }
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
        props: true,
        meta: {
          name: '课程视频',
          requiresAuth: true
        }
      },
      {
        path: '/resource/:roleId/allocResource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-resource' */ '@/views/resource/alloc-resource.vue'),
        props: true,
        meta: {
          name: '角色资源管理',
          requiresAuth: true
        }
      },
      {
        path: '/ad-space-create',
        name: 'ad-space-create',
        component: () => import(/* webpackChunkName: 'ad-space-create' */ '@/views/advert-space/create.vue'),
        meta: {
          name: '添加广告位',
          requiresAuth: true
        }
      },
      {
        path: '/advert-sapce/:id/edit',
        name: 'ad-space-edit',
        component: () => import(/* webpackChunkName: 'ad-space-edit' */ '@/views/advert-space/edit.vue'),
        props: true,
        meta: {
          name: '广告位编辑',
          requiresAuth: true
        }
      },
      {
        path: '/advert-create',
        name: 'advert-create',
        component: () => import(/* webpackChunkName: 'advert-create' */ '@/views/advert/create.vue'),
        meta: {
          name: '添加广告',
          requiresAuth: true
        }
      },
      {
        path: '/advert/:id/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkName: 'advert-edit' */ '@/views/advert/edit.vue'),
        props: true,
        meta: {
          name: '广告编辑',
          requiresAuth: true
        }
      },
      {
        path: '/resource-category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/resource-category.vue'),
        meta: {
          name: '资源分类',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to =>', to)
  console.log('from =>', from)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
