<template>
  <el-select
    v-model="currentObj[columnName]"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入值"
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
  props: {
    currentObj: {
      type: Object,
      required: true
    },
    columnName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      options: []
    }
  },
  created: function (e) {
    console.log(e)
  },
  methods: {
    loadData: function (query) {
      // console.log(query)
      // console.log(this.currentObj)
      // console.log(this.columnName)
    }
  }
}
</script>
