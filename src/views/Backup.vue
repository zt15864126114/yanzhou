<template>
  <div class="page-container">
    <div class="page-title">备份管理</div>
    <el-card class="card-padding">
      <div class="mb-2 flex-row">
        <el-button type="primary" @click="dialogVisible = true">新建备份任务</el-button>
        <el-select v-model="filterType" placeholder="筛选类型" clearable class="ml-2" style="width: 140px">
          <el-option label="全量备份" value="全量" />
          <el-option label="增量备份" value="增量" />
        </el-select>
      </div>
      <el-table :data="filteredData.slice((page-1)*pageSize, page*pageSize)" style="width: 100%;">
        <el-table-column prop="name" label="任务名称" width="180" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="statusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度" width="140">
          <template #default="scope">
            <el-progress :percentage="scope.row.progress" :status="scope.row.progress===100?'success':'active'" :text-inside="true" :stroke-width="18" />
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" width="160" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-space>
              <el-button size="small" @click="showDetail(scope.row)">详情</el-button>
              <el-button size="small" type="success" :disabled="scope.row.progress===100" @click="runTask(scope.row)">执行</el-button>
              <el-button size="small" type="danger" @click="removeTask(scope.$index + (page-1)*pageSize)">删除</el-button>
            </el-space>
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
    <el-dialog v-model="dialogVisible" title="新建备份任务" width="400px">
      <el-form :model="form">
        <el-form-item label="任务名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="全量备份" value="全量" />
            <el-option label="增量备份" value="增量" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addTask">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="detailVisible" title="任务详情" width="400px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="任务名称">{{ detailRow.name }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ detailRow.type }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="statusTagType(detailRow.status)">{{ detailRow.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="进度">
          <el-progress :percentage="detailRow.progress" :status="detailRow.progress===100?'success':'active'" />
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detailRow.time }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { name: '每日全量备份', type: '全量', status: '已完成', progress: 100, time: '2024-05-01 02:00' },
  { name: '周末增量备份', type: '增量', status: '进行中', progress: 60, time: '2024-05-04 03:00' },
  { name: '月末全量备份', type: '全量', status: '待执行', progress: 0, time: '2024-05-31 01:00' },
  { name: '临时增量备份', type: '增量', status: '待执行', progress: 0, time: '2024-05-10 04:00' },
  { name: '季度全量备份', type: '全量', status: '已完成', progress: 100, time: '2024-04-01 02:00' },
  { name: '节假日增量备份', type: '增量', status: '已完成', progress: 100, time: '2024-05-02 03:00' },
  { name: '年度全量备份', type: '全量', status: '进行中', progress: 80, time: '2024-01-01 02:00' },
  { name: '测试增量备份', type: '增量', status: '待执行', progress: 0, time: '2024-05-12 04:00' },
  { name: '月初全量备份', type: '全量', status: '已完成', progress: 100, time: '2024-05-01 01:00' },
  { name: '周中增量备份', type: '增量', status: '进行中', progress: 40, time: '2024-05-08 03:00' },
  { name: '特殊全量备份', type: '全量', status: '待执行', progress: 0, time: '2024-05-20 02:00' },
  { name: '临时全量备份', type: '全量', status: '已完成', progress: 100, time: '2024-05-15 02:00' },
  { name: '周五增量备份', type: '增量', status: '进行中', progress: 20, time: '2024-05-17 03:00' },
  { name: '月末增量备份', type: '增量', status: '待执行', progress: 0, time: '2024-05-31 04:00' },
  { name: '年度增量备份', type: '增量', status: '已完成', progress: 100, time: '2024-01-01 03:00' }
])

const dialogVisible = ref(false)
const detailVisible = ref(false)
const form = ref({ name: '', type: '' })
const detailRow = ref({})
const filterType = ref('')
const page = ref(1)
const pageSize = 10

const filteredData = computed(() => {
  if (!filterType.value) return tableData.value
  return tableData.value.filter(item => item.type === filterType.value)
})

function addTask() {
  if (!form.value.name || !form.value.type) return
  tableData.value.push({
    name: form.value.name,
    type: form.value.type,
    status: '待执行',
    progress: 0,
    time: new Date().toLocaleString()
  })
  dialogVisible.value = false
  form.value = { name: '', type: '' }
  ElMessage.success('新建任务成功')
}

function removeTask(index) {
  tableData.value.splice(index, 1)
  ElMessage.success('删除任务成功')
}

function showDetail(row) {
  detailRow.value = { ...row }
  detailVisible.value = true
}

function runTask(row) {
  if (row.progress === 100) return
  row.status = '进行中'
  let timer = setInterval(() => {
    if (row.progress < 100) {
      row.progress += 10
    } else {
      row.status = '已完成'
      clearInterval(timer)
      ElMessage.success('任务执行完成')
    }
  }, 300)
}

function statusTagType(status) {
  switch (status) {
    case '已完成': return 'success'
    case '进行中': return 'warning'
    case '待执行': return 'info'
    default: return ''
  }
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-2 { margin-bottom: 12px; }
.mt-2 { margin-top: 12px; }
.flex-row { display: flex; align-items: center; }
.flex-row-end { display: flex; justify-content: flex-end; }
.ml-2 { margin-left: 12px; }
.card-padding { padding: 24px 24px 12px 24px; }
</style> 