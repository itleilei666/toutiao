import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import User from '@/views/user'
import Home from '@/views/home'
import LayOut from '@/views/layout'

Vue.use(VueRouter)

// 路由注册表
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: LayOut,
    redirect: '/layout/home',
    children: [
      {
        path: 'user',
        component: User
      },
      {
        path: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
