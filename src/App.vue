<template>
  <div id="app">
    <el-container>
      <el-header><h1>微服务管理中心</h1></el-header>
    </el-container>
    <el-container style="border: 1px solid #eee">
      <el-aside width='200px' style='background-color: rgb(238, 241, 246)'>
        <navMenu></navMenu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navMenu from '@/components/NavMenu'

export default {
  name: 'App',
  components: {
    'navMenu': navMenu
  }
}
</script>
