<template>
  <el-form :model="loginForm" :rules="inputRules" ref="loginForm">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="loginForm.userName" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" />
    </el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form>
</template>

<script>
import { setToken } from '@/utils/auth.js'

export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      isLoading: false,
      inputRules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit: function (e) {
      var that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          setToken(that.loginForm.userName)
          that.router.push('/')
        }
      })
    }
  }
}
</script>
