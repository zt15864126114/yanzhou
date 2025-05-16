<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>用户注册</h2>
        </div>
      </template>
      
      <el-form
        ref="registerForm"
        :model="formData"
        :rules="rules"
        label-width="100px"
        @submit.prevent="handleRegister"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号码">
            <template #prefix>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="验证码" prop="verifyCode">
          <div class="verify-code">
            <el-input v-model="formData.verifyCode" placeholder="请输入验证码">
              <template #prefix>
                <el-icon><Key /></el-icon>
              </template>
            </el-input>
            <el-button
              type="primary"
              :disabled="isCodeSending"
              @click="sendVerifyCode"
            >
              {{ codeButtonText }}
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
          <div class="password-strength">
            <div class="strength-label">密码强度：</div>
            <el-progress
              :percentage="passwordStrength"
              :status="getPasswordStrengthStatus"
              :stroke-width="10"
            />
            <div class="strength-tips">
              <p>密码必须包含：</p>
              <ul>
                <li :class="{ satisfied: hasUpperCase }">大写字母</li>
                <li :class="{ satisfied: hasLowerCase }">小写字母</li>
                <li :class="{ satisfied: hasNumber }">数字</li>
                <li :class="{ satisfied: hasSpecialChar }">特殊字符</li>
                <li :class="{ satisfied: hasMinLength }">至少8位</li>
              </ul>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="formData.agreement" label="我已阅读并同意">
            <el-link type="primary" @click="showAgreement">《用户协议》</el-link>
            和
            <el-link type="primary" @click="showPrivacy">《隐私政策》</el-link>
          </el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
            注册
          </el-button>
          <el-button @click="$router.push('/login')">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 用户协议对话框 -->
    <el-dialog
      v-model="agreementDialogVisible"
      title="用户协议"
      width="600px"
    >
      <div class="agreement-content">
        <p>1. 用户注册</p>
        <p>1.1 用户注册是指用户按照本协议要求完成全部注册程序，并同意接受本协议全部条款的行为。</p>
        <p>1.2 用户注册成功后，将获得一个用户账号及相应的密码，该用户账号和密码由用户负责保管。</p>
        <p>2. 用户信息</p>
        <p>2.1 用户应提供真实、准确、完整的个人资料，并保证资料的真实性和有效性。</p>
        <p>2.2 用户应妥善保管账号和密码，对账号下的所有行为负责。</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="agreementDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 隐私政策对话框 -->
    <el-dialog
      v-model="privacyDialogVisible"
      title="隐私政策"
      width="600px"
    >
      <div class="privacy-content">
        <p>1. 信息收集</p>
        <p>1.1 我们收集的信息包括但不限于：用户名、手机号码、邮箱地址等。</p>
        <p>1.2 我们使用这些信息来提供、维护和改进我们的服务。</p>
        <p>2. 信息使用</p>
        <p>2.1 我们使用收集的信息来验证用户身份、发送通知等。</p>
        <p>2.2 我们不会将您的个人信息出售给第三方。</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="privacyDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Phone, Key, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const registerForm = ref(null)
const loading = ref(false)

// 表单数据
const formData = reactive({
  username: '',
  phone: '',
  verifyCode: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 验证码相关
const isCodeSending = ref(false)
const countdown = ref(0)
const codeButtonText = computed(() => {
  return countdown.value > 0 ? `${countdown.value}秒后重试` : '获取验证码'
})

// 对话框控制
const agreementDialogVisible = ref(false)
const privacyDialogVisible = ref(false)

// 密码强度检查
const hasUpperCase = computed(() => /[A-Z]/.test(formData.password))
const hasLowerCase = computed(() => /[a-z]/.test(formData.password))
const hasNumber = computed(() => /[0-9]/.test(formData.password))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
const hasMinLength = computed(() => formData.password.length >= 8)

const passwordStrength = computed(() => {
  let strength = 0
  if (hasUpperCase.value) strength += 20
  if (hasLowerCase.value) strength += 20
  if (hasNumber.value) strength += 20
  if (hasSpecialChar.value) strength += 20
  if (hasMinLength.value) strength += 20
  return strength
})

const getPasswordStrengthStatus = computed(() => {
  if (passwordStrength.value < 40) return 'exception'
  if (passwordStrength.value < 80) return 'warning'
  return 'success'
})

// 表单验证规则
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (passwordStrength.value < 60) {
    callback(new Error('密码强度不足'))
  } else {
    if (formData.confirmPassword !== '') {
      registerForm.value.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formData.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度应为6位', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ]
}

// 发送验证码
const sendVerifyCode = () => {
  if (!formData.phone) {
    ElMessage.warning('请先输入手机号码')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    ElMessage.warning('请输入正确的手机号码')
    return
  }
  
  isCodeSending.value = true
  countdown.value = 60
  
  // 模拟发送验证码
  const mockCode = Math.random().toString().slice(2, 8)
  console.log('模拟验证码：', mockCode) // 实际项目中删除这行
  ElMessage.success('验证码已发送')
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCodeSending.value = false
    }
  }, 1000)
}

// 显示用户协议
const showAgreement = () => {
  agreementDialogVisible.value = true
}

// 显示隐私政策
const showPrivacy = () => {
  privacyDialogVisible.value = true
}

// 处理注册
const handleRegister = async () => {
  if (!formData.agreement) {
    ElMessage.warning('请阅读并同意用户协议和隐私政策')
    return
  }
  
  try {
    await registerForm.value.validate()
    loading.value = true
    
    // 模拟注册过程
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 保存用户信息到 localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = {
      username: formData.username,
      phone: formData.phone,
      password: formData.password, // 实际项目中应该加密存储
      role: 'user',
      createTime: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    ElMessage.success('注册成功')
    router.push('/login')
  } catch (error) {
    console.error('注册失败：', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-card {
  width: 100%;
  max-width: 500px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.verify-code {
  display: flex;
  gap: 10px;
}

.verify-code .el-input {
  flex: 1;
}

.password-strength {
  margin-top: 10px;
}

.strength-label {
  margin-bottom: 5px;
  color: #606266;
}

.strength-tips {
  margin-top: 10px;
  color: #909399;
}

.strength-tips p {
  margin: 5px 0;
}

.strength-tips ul {
  margin: 5px 0;
  padding-left: 20px;
}

.strength-tips li {
  margin: 3px 0;
  color: #909399;
}

.strength-tips li.satisfied {
  color: #67C23A;
}

.submit-btn {
  width: 100%;
}

:deep(.el-form-item__content) {
  justify-content: center;
}

.agreement-content,
.privacy-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px;
}

.agreement-content p,
.privacy-content p {
  margin: 10px 0;
  line-height: 1.5;
}
</style> 