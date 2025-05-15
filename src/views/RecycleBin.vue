<template>
  <div class="page-container">
    <div class="page-title">资源回收站</div>
    <el-card>
      <div class="mb-2 flex-row">
        <el-select v-model="filterType" placeholder="按类型筛选" clearable style="width: 140px; margin-right: 12px;">
          <el-option label="全部" value="" />
          <el-option label="主机" value="主机" />
          <el-option label="虚拟机" value="虚拟机" />
          <el-option label="存储卷" value="存储卷" />
        </el-select>
      </div>
      <el-table :data="pagedData" style="width: 100%">
        <el-table-column prop="name" label="资源名称" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="deletedAt" label="删除时间" width="170" />
        <el-table-column prop="operator" label="操作人" width="100" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-space>
              <el-button size="small" type="primary" @click="restore(scope.$index + (page-1)*pageSize)">恢复</el-button>
              <el-button size="small" type="danger" @click="remove(scope.$index + (page-1)*pageSize)">彻底删除</el-button>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const binData = ref([
  { name: 'host-01', type: '主机', deletedAt: '2024-05-10 08:00', operator: 'admin' },
  { name: 'vm-03', type: '虚拟机', deletedAt: '2024-05-10 08:10', operator: 'admin' },
  { name: 'volume-01', type: '存储卷', deletedAt: '2024-05-10 08:20', operator: 'admin' },
  { name: 'host-02', type: '主机', deletedAt: '2024-05-10 08:30', operator: 'admin' },
  { name: 'vm-05', type: '虚拟机', deletedAt: '2024-05-10 08:40', operator: 'admin' },
  { name: 'volume-02', type: '存储卷', deletedAt: '2024-05-10 08:50', operator: 'admin' },
  { name: 'host-03', type: '主机', deletedAt: '2024-05-10 09:00', operator: 'admin' },
  { name: 'vm-07', type: '虚拟机', deletedAt: '2024-05-10 09:10', operator: 'admin' }
])

const filterType = ref('')
const page = ref(1)
const pageSize = 6

const filteredData = computed(() => {
  return binData.value.filter(item => {
    return !filterType.value || item.type === filterType.value
  })
})

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredData.value.slice(start, start + pageSize)
})

function restore(index) {
  const item = filteredData.value[index]
  ElMessage.success(`资源 ${item.name} 已恢复`)
  binData.value.splice(binData.value.indexOf(item), 1)
}

function remove(index) {
  const item = filteredData.value[index]
  ElMessage.success(`资源 ${item.name} 已彻底删除`)
  binData.value.splice(binData.value.indexOf(item), 1)
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-2 { margin-bottom: 12px; }
.mt-2 { margin-top: 12px; }
.flex-row { display: flex; align-items: center; }
.flex-row-end { display: flex; justify-content: flex-end; }
</style> 