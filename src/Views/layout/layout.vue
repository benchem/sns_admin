<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col span="23">
            <h1>微服务管理中心</h1>
          </el-col>
          <el-col span="1">
            <el-button @click="logout">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container style="border: 1px solid #eee">
      <el-aside width='200px' style='background-color: rgb(238, 241, 246)'>
        <navMenu></navMenu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navMenu from '@/components/NavMenu'
import { removeToken } from '@/utils/auth.js'

export default {
  components: {
    'navMenu': navMenu
  },
  methods: {
    logout: (e) => {
      removeToken()
      this.router.push({name: 'Login'})
    }
  }
}
</script>
