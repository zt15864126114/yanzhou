import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('../views/Monitoring.vue'),
        meta: { title: '资源监控' }
      },
      {
        path: 'backup',
        name: 'Backup',
        component: () => import('../views/Backup.vue'),
        meta: { title: '备份管理' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: { title: '系统设置' }
      },
      {
        path: 'tenants',
        name: 'Tenants',
        component: () => import('../views/Tenants.vue'),
        meta: { title: '租户管理' }
      },
      {
        path: 'automation',
        name: 'Automation',
        component: () => import('../views/Automation.vue'),
        meta: { title: '自动运维' }
      },
      {
        path: 'system-health',
        name: 'SystemHealth',
        component: () => import('../views/SystemHealth.vue'),
        meta: { title: '系统健康' }
      },
      {
        path: 'audit-log',
        name: 'AuditLog',
        component: () => import('../views/AuditLog.vue'),
        meta: { title: '操作日志' }
      },
      {
        path: 'notification-center',
        name: 'NotificationCenter',
        component: () => import('../views/NotificationCenter.vue'),
        meta: { title: '消息中心' }
      },
      {
        path: 'recycle-bin',
        name: 'RecycleBin',
        component: () => import('../views/RecycleBin.vue'),
        meta: { title: '资源回收站' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 