<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo">
        <span>管理系统</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :router="true"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <el-icon><Monitor /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>

        <!-- 用户管理 -->
        <el-sub-menu index="user">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/profile">个人信息</el-menu-item>
          <el-menu-item v-if="isAdmin" index="/users">用户列表</el-menu-item>
        </el-sub-menu>

        <!-- 设备管理 -->
        <el-sub-menu index="device">
          <template #title>
            <el-icon><Connection /></el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="/devices">网络设备</el-menu-item>
          <el-menu-item index="/servers">服务器</el-menu-item>
          <el-menu-item index="/storage">存储设备</el-menu-item>
        </el-sub-menu>

        <!-- 资源管理 -->
        <el-menu-item index="/resources">
          <el-icon><Cpu /></el-icon>
          <span>资源管理</span>
        </el-menu-item>

        <!-- 数据服务 -->
        <el-menu-item index="/data">
          <el-icon><DataLine /></el-icon>
          <span>数据服务</span>
        </el-menu-item>

        <!-- 监控告警 -->
        <el-sub-menu index="monitor">
          <template #title>
            <el-icon><Warning /></el-icon>
            <span>监控告警</span>
          </template>
          <el-menu-item index="/monitoring">系统监控</el-menu-item>
          <el-menu-item index="/alerts">告警管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主要内容区 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header>
        <div class="header-left">
          <el-button type="text" @click="toggleCollapse">
            <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </el-button>
          <el-breadcrumb>
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              {{ username }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {
  Monitor,
  User,
  Connection,
  Cpu,
  DataLine,
  Warning,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)
const username = ref(localStorage.getItem('username') || '用户')

// 计算当前激活的菜单
const activeMenu = computed(() => route.path)

// 判断是否为管理员
const isAdmin = computed(() => localStorage.getItem('userRole') === 'admin')

// 面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    title: item.meta.title,
    path: item.path
  }))
})

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 处理用户下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userRole')
        localStorage.removeItem('username')
        router.push('/login')
      })
      break
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
  color: #fff;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #2b2f3a;
}

.logo img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.logo span {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.el-menu {
  border-right: none;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
}

.user-info .el-icon {
  margin-left: 4px;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style> 