<template>
  <div class="page-container">
    <div class="page-title">仪表盘</div>
    <el-alert title="欢迎使用兖州区超融合管理平台！" type="success" show-icon class="mb-4" />
    <el-row :gutter="20" class="mb-4">
      <el-col :span="6">
        <el-card>
          <div>主机总数</div>
          <div class="stat-num">12</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div>虚拟机总数</div>
          <div class="stat-num">48</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div>存储总量</div>
          <div class="stat-num">120TB</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div>告警数</div>
          <div class="stat-num stat-warn">3</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-4">
      <el-col :span="12">
        <el-card>
          <template #header>资源使用率</template>
          <v-chart :option="chartOption" autoresize style="height:300px;" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>系统运行状态</template>
          <div class="mb-2">CPU健康度</div>
          <el-progress :percentage="92" status="success" class="mb-2" />
          <div class="mb-2">内存健康度</div>
          <el-progress :percentage="85" status="success" class="mb-2" />
          <div class="mb-2">存储健康度</div>
          <el-progress :percentage="78" status="warning" class="mb-2" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>最新告警</template>
          <el-table :data="alarmList" size="small" style="width: 100%">
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="level" label="级别" width="80" />
            <el-table-column prop="content" label="内容" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>近期操作日志</template>
          <el-table :data="logList" size="small" style="width: 100%">
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="user" label="用户" width="80" />
            <el-table-column prop="action" label="操作" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueECharts from 'vue-echarts'

const chartOption = ref({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [
    {
      name: '资源占用',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
      labelLine: { show: false },
      data: [
        { value: 40, name: 'CPU' },
        { value: 30, name: '内存' },
        { value: 20, name: '存储' },
        { value: 10, name: '网络' }
      ]
    }
  ]
})

const alarmList = ref([
  { time: '10:20', level: '高', content: '主机 host-01 CPU 使用率过高' },
  { time: '09:55', level: '中', content: '存储节点存储空间不足' },
  { time: '09:30', level: '低', content: '虚拟机 vm-03 网络延迟升高' }
])

const logList = ref([
  { time: '10:22', user: 'admin', action: '登录系统' },
  { time: '10:21', user: 'admin', action: '查看仪表盘' },
  { time: '10:20', user: 'admin', action: '处理告警：主机 host-01 CPU 使用率过高' }
])
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
.stat-num { font-size: 28px; font-weight: bold; margin-top: 8px; }
.stat-warn { color: #e6a23c; }
.mb-4 { margin-bottom: 24px; }
.mb-2 { margin-bottom: 12px; }
</style> 