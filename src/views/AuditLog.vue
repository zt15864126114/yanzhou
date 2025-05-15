<template>
  <div class="page-container">
    <div class="page-title">操作日志</div>
    <el-card>
      <div class="mb-2 flex-row">
        <el-input v-model="filterUser" placeholder="按用户筛选" clearable style="width: 180px; margin-right: 12px;" />
        <el-select v-model="filterResult" placeholder="按结果筛选" clearable style="width: 140px;">
          <el-option label="全部" value="" />
          <el-option label="成功" value="成功" />
          <el-option label="失败" value="失败" />
        </el-select>
      </div>
      <el-table :data="pagedData" style="width: 100%">
        <el-table-column prop="time" label="操作时间" width="170" />
        <el-table-column prop="user" label="用户" width="100" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="result" label="结果" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.result === '成功' ? 'success' : 'danger'">{{ scope.row.result }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-2 flex-row-end">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredData.length"
          :page-size="pageSize"
          v-model:current-page="page"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const logData = ref([
  { time: '2024-05-10 09:00', user: 'admin', type: '登录', content: '管理员登录系统', result: '成功' },
  { time: '2024-05-10 09:05', user: 'admin', type: '配置', content: '修改平台名称', result: '成功' },
  { time: '2024-05-10 09:10', user: 'admin', type: '运维', content: '执行主机健康检查', result: '成功' },
  { time: '2024-05-10 09:15', user: 'admin', type: '备份', content: '启动每日备份', result: '成功' },
  { time: '2024-05-10 09:20', user: 'admin', type: '配置', content: '修改管理员邮箱', result: '失败' },
  { time: '2024-05-10 09:25', user: 'admin', type: '租户', content: '编辑租户信息', result: '成功' },
  { time: '2024-05-10 09:30', user: 'admin', type: '运维', content: '执行存储空间清理', result: '成功' },
  { time: '2024-05-10 09:35', user: 'admin', type: '运维', content: '执行系统安全扫描', result: '失败' },
  { time: '2024-05-10 09:40', user: 'admin', type: '日志', content: '导出操作日志', result: '成功' },
  { time: '2024-05-10 09:45', user: 'admin', type: '配置', content: '修改备份时间', result: '成功' },
  { time: '2024-05-10 09:50', user: 'admin', type: '运维', content: '执行网络连通性检测', result: '成功' },
  { time: '2024-05-10 09:55', user: 'admin', type: '备份', content: '启动月末全量备份', result: '成功' },
  { time: '2024-05-10 10:00', user: 'admin', type: '租户', content: '编辑租户信息', result: '成功' }
])

const filterUser = ref('')
const filterResult = ref('')
const page = ref(1)
const pageSize = 8

const filteredData = computed(() => {
  return logData.value.filter(item => {
    const userMatch = !filterUser.value || item.user.includes(filterUser.value)
    const resultMatch = !filterResult.value || item.result === filterResult.value
    return userMatch && resultMatch
  })
})

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredData.value.slice(start, start + pageSize)
})
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-2 { margin-bottom: 12px; }
.mt-2 { margin-top: 12px; }
.flex-row { display: flex; align-items: center; }
.flex-row-end { display: flex; justify-content: flex-end; }
</style> 