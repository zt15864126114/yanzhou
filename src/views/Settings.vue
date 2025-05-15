<template>
  <div class="page-container">
    <div class="page-title">系统设置</div>
    <el-card>
      <el-form :model="form" label-width="120px" style="max-width: 500px; margin-top: 20px;">
        <el-form-item label="平台名称">
          <el-input v-model="form.platformName" placeholder="请输入平台名称" />
        </el-form-item>
        <el-form-item label="管理员邮箱">
          <el-input v-model="form.adminEmail" placeholder="请输入管理员邮箱" />
        </el-form-item>
        <el-form-item label="自动备份">
          <el-switch v-model="form.autoBackup" />
        </el-form-item>
        <el-form-item label="备份时间">
          <el-time-picker v-model="form.backupTime" placeholder="选择时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref({
  platformName: '兖州区超融合平台',
  adminEmail: 'admin@yanzhou.gov.cn',
  autoBackup: true,
  backupTime: new Date(2024, 4, 10, 2, 0, 0)
})

function saveSettings() {
  ElMessage.success('设置已保存！')
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
</style> 