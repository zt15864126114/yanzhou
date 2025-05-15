<template>
  <div class="page-container">
    <div class="page-title">自动运维</div>
    <el-card>
      <div class="mb-2 flex-row">
        <el-button type="primary" @click="dialogVisible = true">新建任务</el-button>
      </div>
      <el-table :data="taskList" style="width: 100%">
        <el-table-column prop="name" label="任务名称" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已完成' ? 'success' : (scope.row.status === '执行中' ? 'warning' : 'info')">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastRun" label="上次执行时间" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-space>
              <el-button size="small" @click="runTask(scope.row)">执行</el-button>
              <el-button size="small" @click="showLog(scope.row)">日志</el-button>
              <el-button size="small" type="danger" @click="removeTask(scope.$index)">删除</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="新建自动化任务" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="任务名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="form.type">
            <el-option label="脚本" value="脚本" />
            <el-option label="计划任务" value="计划任务" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addTask">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="logVisible" title="任务日志" width="500px">
      <el-timeline>
        <el-timeline-item
          v-for="(item, idx) in logList"
          :key="idx"
          :timestamp="item.time"
          :type="item.type"
        >
          {{ item.content }}
        </el-timeline-item>
      </el-timeline>
      <template #footer>
        <el-button @click="logVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const taskList = ref([
  {
    name: '每日备份',
    type: '计划任务',
    status: '已完成',
    lastRun: '2024-05-10 02:00',
    log: [
      { time: '2024-05-10 02:00', type: 'success', content: '任务执行成功' },
      { time: '2024-05-09 02:00', type: 'success', content: '任务执行成功' }
    ]
  },
  {
    name: '主机健康检查',
    type: '脚本',
    status: '待执行',
    lastRun: '',
    log: []
  },
  {
    name: '存储空间清理',
    type: '脚本',
    status: '已完成',
    lastRun: '2024-05-09 03:00',
    log: [
      { time: '2024-05-09 03:00', type: 'success', content: '释放空间 2.3GB' },
      { time: '2024-05-08 03:00', type: 'success', content: '释放空间 1.8GB' }
    ]
  },
  {
    name: '系统安全扫描',
    type: '计划任务',
    status: '执行中',
    lastRun: '2024-05-10 01:00',
    log: [
      { time: '2024-05-10 01:00', type: 'info', content: '扫描中...' },
      { time: '2024-05-09 01:00', type: 'success', content: '未发现高危漏洞' }
    ]
  },
  {
    name: '资源用量统计',
    type: '计划任务',
    status: '已完成',
    lastRun: '2024-05-10 00:30',
    log: [
      { time: '2024-05-10 00:30', type: 'success', content: '统计完成，CPU平均利用率 35%' }
    ]
  },
  {
    name: '业务服务重启',
    type: '脚本',
    status: '待执行',
    lastRun: '',
    log: []
  },
  {
    name: '日志归档',
    type: '计划任务',
    status: '已完成',
    lastRun: '2024-05-09 23:00',
    log: [
      { time: '2024-05-09 23:00', type: 'success', content: '归档日志 120MB' }
    ]
  },
  {
    name: '网络连通性检测',
    type: '脚本',
    status: '已完成',
    lastRun: '2024-05-10 04:00',
    log: [
      { time: '2024-05-10 04:00', type: 'success', content: '所有节点网络正常' },
      { time: '2024-05-09 04:00', type: 'error', content: '节点 192.168.1.10 丢包率高' }
    ]
  }
])

const dialogVisible = ref(false)
const logVisible = ref(false)
const form = ref({ name: '', type: '' })
const logList = ref([])

function addTask() {
  if (!form.value.name || !form.value.type) return
  taskList.value.push({ name: form.value.name, type: form.value.type, status: '待执行', lastRun: '', log: [] })
  dialogVisible.value = false
  form.value = { name: '', type: '' }
  ElMessage.success('新建任务成功')
}

function removeTask(index) {
  taskList.value.splice(index, 1)
  ElMessage.success('删除任务成功')
}

function runTask(row) {
  row.status = '执行中'
  setTimeout(() => {
    row.status = '已完成'
    const now = new Date().toLocaleString()
    row.lastRun = now
    row.log.unshift({ time: now, type: 'success', content: '任务执行成功' })
    ElMessage.success('任务执行完成')
  }, 1000)
}

function showLog(row) {
  logList.value = row.log
  logVisible.value = true
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-2 { margin-bottom: 12px; }
.flex-row { display: flex; align-items: center; }
</style> 