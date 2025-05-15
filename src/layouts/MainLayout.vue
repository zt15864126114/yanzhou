<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo">
        <el-icon :size="32" color="#409EFF"><Monitor /></el-icon>
        <span>超融合管理平台</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :router="true"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <el-icon><Monitor /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-menu-item index="/monitoring">
          <el-icon><DataLine /></el-icon>
          <template #title>资源监控</template>
        </el-menu-item>
        <el-menu-item index="/backup">
          <el-icon><Upload /></el-icon>
          <template #title>备份管理</template>
        </el-menu-item>
        <el-menu-item index="/tenants">
          <el-icon><OfficeBuilding /></el-icon>
          <template #title>租户管理</template>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
        <el-menu-item index="/automation">
          <el-icon><Tools /></el-icon>
          <template #title>自动运维</template>
        </el-menu-item>
        <el-menu-item index="/system-health">
          <el-icon><StarFilled /></el-icon>
          <template #title>系统健康</template>
        </el-menu-item>
        <el-menu-item index="/audit-log">
          <el-icon><Document /></el-icon>
          <template #title>操作日志</template>
        </el-menu-item>
        <el-menu-item index="/notification-center">
          <el-icon><BellFilled /></el-icon>
          <template #title>消息中心</template>
        </el-menu-item>
        <el-menu-item index="/recycle-bin">
          <el-icon><DeleteFilled /></el-icon>
          <template #title>资源回收站</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <el-icon class="collapse-btn" @click="toggleCollapse">
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRoute }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span>管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapse = ref(false)

const activeMenu = computed(() => route.path)
const currentRoute = computed(() => route.meta.title || '')

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  
  .el-aside {
    background-color: #304156;
    color: #fff;
    
    .logo {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      background-color: #2b3649;
      
      .el-icon {
        margin-right: 12px;
      }
      
      span {
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
      }
    }
    
    .el-menu {
      background-color: transparent;
      border-right: none;
      
      :deep(.el-menu-item) {
        color: #e0e6ed;
        font-size: 16px;
        font-weight: 500;
        transition: background 0.2s, color 0.2s;
        
        .el-icon {
          color: #bfcbd9;
          transition: color 0.2s;
        }
        
        &.is-active {
          background-color: #1e2b3a !important;
          color: #ffffff !important;
          font-weight: bold;
          
          .el-icon {
            color: #409EFF !important;
          }
        }
        
        &:hover {
          background-color: #22304a !important;
          color: #fff !important;
          
          .el-icon {
            color: #409EFF !important;
          }
        }
      }
    }
  }
  
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    
    .header-left {
      display: flex;
      align-items: center;
      
      .collapse-btn {
        font-size: 20px;
        cursor: pointer;
        margin-right: 20px;
        
        &:hover {
          color: #409EFF;
        }
      }
    }
    
    .header-right {
      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        span {
          margin-left: 8px;
        }
      }
    }
  }
  
  .el-main {
    background-color: #f0f2f5;
    padding: 20px;
  }
}
</style> 