import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      // 用户管理模块
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('../views/user/UserManagement.vue'),
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/user/Profile.vue'),
        meta: { requiresAuth: true }
      },
      // 设备管理模块
      {
        path: 'devices',
        name: 'DeviceManagement',
        component: () => import('../views/device/DeviceManagement.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'servers',
        name: 'ServerManagement',
        component: () => import('../views/device/ServerManagement.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'storage',
        name: 'StorageManagement',
        component: () => import('../views/device/StorageManagement.vue'),
        meta: { requiresAuth: true }
      },
      // 资源管理模块
      {
        path: 'resources',
        name: 'ResourceManagement',
        component: () => import('../views/resource/ResourceManagement.vue'),
        meta: { requiresAuth: true }
      },
      // 数据服务模块
      {
        path: 'data',
        name: 'DataService',
        component: () => import('../views/data/DataService.vue'),
        meta: { requiresAuth: true }
      },
      // 监控与告警模块
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('../views/monitoring/Monitoring.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'alerts',
        name: 'Alerts',
        component: () => import('../views/monitoring/Alerts.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const userRole = localStorage.getItem('userRole')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router 