<template>
  <li>
      <div>
          <label>{{microService.key}}</label>
          <label class="desc">{{microService.desc}}</label>
          <router-link :to="{name:'ServiceDetail', params:{key:microService.key}}">详情</router-link> | <router-link :to="{name:'ServiceInstance', params:{key:microService.key}}">实例</router-link> | <a href="#" @click="onUnreg(microService.key)" :v-bind="microService.key">注销</a>
      </div>
  </li>
</template>

<style lang="stylus" scoped>
.desc{
    color:  #999999
}
</style>

<script>
export default {
  props: {
    microService: {
      type: Object,
      require: true
    }
  },
  methods: {
    onUnreg: function (microKey) {
      alert(microKey)
    }
  }
}
</script>
