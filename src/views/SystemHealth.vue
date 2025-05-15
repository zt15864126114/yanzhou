<template>
  <div class="page-container">
    <div class="page-title">系统健康</div>
    <el-alert v-if="alerts.length" :title="alerts[0]" type="warning" show-icon class="mb-4" />
    <el-row :gutter="20" class="mb-4">
      <el-col :span="6" v-for="item in healthList" :key="item.name">
        <el-card>
          <div class="health-title">
            <el-icon :size="20" :color="item.status === '健康' ? '#67C23A' : '#E6A23C'">
              <component :is="item.status === '健康' ? 'CircleCheckFilled' : 'WarningFilled'" />
            </el-icon>
            <span>{{ item.name }}</span>
          </div>
          <div class="health-status">
            <el-tag :type="item.status === '健康' ? 'success' : 'warning'">{{ item.status }}</el-tag>
          </div>
          <el-progress :percentage="item.percent" :status="item.percent >= 80 ? 'success' : 'warning'" />
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <template #header>资源利用率</template>
      <v-chart :option="chartOption" autoresize style="height:300px;" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueECharts from 'vue-echarts'

const healthList = ref([
  { name: '主机', status: '健康', percent: 95 },
  { name: '存储', status: '健康', percent: 88 },
  { name: '网络', status: '预警', percent: 65 },
  { name: '服务', status: '健康', percent: 92 }
])

const alerts = ref([
  '网络模块健康度低于80%，请关注网络质量！'
])

const chartOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['CPU', '内存', '存储'] },
  xAxis: { type: 'category', data: ['10:00', '10:10', '10:20', '10:30', '10:40'] },
  yAxis: { type: 'value', axisLabel: { formatter: '{value} %' } },
  series: [
    { name: 'CPU', type: 'line', data: [35, 40, 38, 45, 42], smooth: true },
    { name: '内存', type: 'line', data: [60, 62, 65, 63, 61], smooth: true },
    { name: '存储', type: 'line', data: [80, 78, 79, 81, 80], smooth: true }
  ]
})
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.mb-4 { margin-bottom: 24px; }
.health-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; margin-bottom: 8px; }
.health-title .el-icon { margin-right: 8px; }
.health-status { margin-bottom: 8px; }
</style> 