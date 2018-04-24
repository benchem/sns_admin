<template>
  <section>
    当前访问的页面被外星人带走了
    <el-button @click="back">返回</el-button>
  </section>
</template>

<script>
export default {
  methods: {
    back: function (e) {
      this.router.go(-1)
    }
  }
}
</script>
