<template>
  <div class="page-container">
    <div class="page-title">消息中心</div>
    <el-card>
      <div class="mb-2 flex-row">
        <el-select v-model="filterType" placeholder="按类型筛选" clearable style="width: 140px; margin-right: 12px;">
          <el-option label="全部" value="" />
          <el-option label="告警" value="告警" />
          <el-option label="通知" value="通知" />
        </el-select>
        <el-button @click="markAllRead" :disabled="!unreadCount" type="primary" plain>全部标为已读</el-button>
      </div>
      <el-table :data="pagedData" style="width: 100%">
        <el-table-column prop="time" label="时间" width="170" />
        <el-table-column prop="type" label="类型" width="80" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '未读' ? 'danger' : 'info'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button v-if="scope.row.status === '未读'" size="small" @click="markRead(scope.$index + (page-1)*pageSize)">标为已读</el-button>
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

const msgData = ref([
  { time: '2024-05-10 09:00', type: '告警', content: '主机 host-01 CPU 使用率过高', status: '未读' },
  { time: '2024-05-10 09:05', type: '通知', content: '系统升级维护通知', status: '未读' },
  { time: '2024-05-10 09:10', type: '告警', content: '存储节点空间不足', status: '已读' },
  { time: '2024-05-10 09:15', type: '通知', content: '新功能已上线', status: '未读' },
  { time: '2024-05-10 09:20', type: '告警', content: '虚拟机 vm-03 网络延迟升高', status: '未读' },
  { time: '2024-05-10 09:25', type: '通知', content: '备份任务已完成', status: '已读' },
  { time: '2024-05-10 09:30', type: '告警', content: '主机 host-02 离线', status: '未读' },
  { time: '2024-05-10 09:35', type: '通知', content: '安全策略已更新', status: '已读' },
  { time: '2024-05-10 09:40', type: '告警', content: '存储节点 IO 延迟升高', status: '未读' },
  { time: '2024-05-10 09:45', type: '通知', content: '月度报告已生成', status: '已读' }
])

const filterType = ref('')
const page = ref(1)
const pageSize = 6

const filteredData = computed(() => {
  return msgData.value.filter(item => {
    return !filterType.value || item.type === filterType.value
  })
})

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredData.value.slice(start, start + pageSize)
})

const unreadCount = computed(() => msgData.value.filter(m => m.status === '未读').length)

function markRead(index) {
  filteredData.value[index].status = '已读'
}

function markAllRead() {
  msgData.value.forEach(m => { m.status = '已读' })
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-2 { margin-bottom: 12px; }
.mt-2 { margin-top: 12px; }
.flex-row { display: flex; align-items: center; }
.flex-row-end { display: flex; justify-content: flex-end; }
</style> 