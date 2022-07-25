import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'
// import Login from '@/views/login'
// import User from '@/views/user'
// import Home from '@/views/home'
// import LayOut from '@/views/layout'
// import Search from '@/views/search'
// import searchResult from '@/views/search/searchResult'
// import artDetial from '@/views/artDetial'
// import userEdit from '@/views/user/userEdit'
// import chat from '@/views/chat'
Vue.use(VueRouter)

// 路由注册表
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    beforeEnter: (to, from, next) => {
      if (getToken()?.length > 0) {
        next('/layout/home')
      } else {
        next(true)
      }
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user')
      },
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search')
  },
  {
    path: '/search-res/:key',
    component: () => import(/* webpackChunkName: "searchResult" */ '@/views/search/searchResult')
  }, {
    path: '/art-detial',
    component: () => import(/* webpackChunkName: "artDetial" */ '@/views/artDetial')
  },
  {
    path: '/user-edit',
    component: () => import(/* webpackChunkName: "userEdit" */ '@/views/user/userEdit')
  },
  {
    path: '/chat',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat')
  }
]

const router = new VueRouter({
  routes
})
// 前置守卫
// router.beforeEach((to, from, next) => {
//   console.log(getToken())
//   if (to.path === '/login' && getToken() !== undefined) {
//     next(false)
//   } else {
//     next(true)
//   }
// })

export default router
