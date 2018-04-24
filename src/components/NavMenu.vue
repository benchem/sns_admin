<template>
  <el-menu :default-active="focusIndex">
    <el-submenu :v-model="channel" v-for="channel in mainMenu" :key="channel.name" :index="channel.name">
        <template slot="title"><i class="el-icon-message"></i>{{channel.caption}}</template>
        <el-menu-item-group :index="group.name" :v-model="group" v-for="group in channel.groups" :key="group.name">
          <template slot="title">{{group.caption}}</template>
          <el-menu-item :index="func.name" :v-model="func" v-for="func in group.functions" :key="func.name" @click="menuClick(func)">{{func.caption}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getMemus } from '@/utils/api.js'

export default {
  data () {
    return {
      focusIndex: 'serviceManager'
    }
  },
  computed: {
    mainMenu () {
      return getMemus()
    }
  },
  methods: {
    menuClick (func) {
      this.focusIndex = func.name
      this.router.push(func.component)
    }
  }
}
</script>
