<template>
  <div class="page-container">
    <div class="page-title">租户信息</div>
    <el-card>
      <el-table :data="[tenant]" style="width: 100%">
        <el-table-column prop="id" label="租户ID" />
        <el-table-column prop="name" label="租户名称" />
        <el-table-column prop="department" label="所属部门" />
        <el-table-column prop="admin" label="管理员" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '正常' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="openDialog(tenant)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑租户" width="500px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="租户ID" required>
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="租户名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="form.department" />
        </el-form-item>
        <el-form-item label="管理员" required>
          <el-input v-model="form.admin" />
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.createdAt" type="datetime" placeholder="选择时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="正常" value="正常" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTenant">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tenant = ref({
  id: 'T001',
  name: '济宁兖州区人民政府办公室',
  department: '政务办',
  admin: '张三',
  phone: '13800000001',
  createdAt: '2024-05-01 09:00',
  status: '正常'
})

const dialogVisible = ref(false)
const form = ref({ ...tenant.value })

function openDialog(row) {
  form.value = { ...row }
  dialogVisible.value = true
}

function saveTenant() {
  Object.assign(tenant.value, form.value)
  dialogVisible.value = false
  ElMessage.success('租户信息已保存')
}
</script>

<style scoped>
.page-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
</style> 