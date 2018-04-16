<template>
  <el-select
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="loadData"
    :loading="loading">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      options: []
    }
  },
  methods: {
    loadData: function (query) {
      console.log(query)
    }
  }
}
</script>
