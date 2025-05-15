<template>
  <div class="page-container">
    <div class="page-title">资源监控</div>
    <el-card class="mb-4">
      <template #header>主机资源列表</template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="主机名" width="120" />
        <el-table-column prop="cpu" label="CPU使用率" />
        <el-table-column prop="memory" label="内存使用率" />
        <el-table-column prop="storage" label="存储使用率" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </el-card>
    <el-card>
      <template #header>CPU使用率趋势</template>
      <v-chart :option="chartOption" autoresize style="height:300px;" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'

const tableData = ref([
  { name: 'host-01', cpu: '35%', memory: '60%', storage: '40%', status: '在线' },
  { name: 'host-02', cpu: '50%', memory: '70%', storage: '55%', status: '在线' },
  { name: 'host-03', cpu: '20%', memory: '30%', storage: '25%', status: '离线' },
])

const chartOption = ref({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['10:00', '10:10', '10:20', '10:30', '10:40'] },
  yAxis: { type: 'value', axisLabel: { formatter: '{value} %' } },
  series: [
    { name: 'CPU使用率', type: 'line', data: [30, 40, 35, 50, 45], smooth: true }
  ]
})
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-4 { margin-bottom: 24px; }
</style> 