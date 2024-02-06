import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout')
  }
]

const router = new VueRouter({
  routes
})

// 無須驗證token的頁面
const whiteList = ['/login', '/reg']
// 全局前置路由守衛
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登錄了
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    // 未登錄
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
