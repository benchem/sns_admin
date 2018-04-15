<template>
  <div id="svrInst">
    <router-link :to="{name:'ServicesManagement'}">返回</router-link>
    <div>
      <label for="lb">service key</label>
      <input name="lb" type="text" v-model="serviceModel.key" disabled="disabled"/>

      <label for="desc">desc</label>
      <input type="text" v-model="serviceModel.desc" disabled="disabled"/>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

</style>

<script>
import axios from 'axios'

function loadDetail (pageCtx) {
  let apiHost = pageCtx.GLOBAL.apiHost
  axios.get(apiHost + '/svc/getdetail?key=' + pageCtx.key).then(
    function (response) {
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      pageCtx.serviceModel = response.data.result
    }
  )
}

export default {
  data () {
    return {
      key: '',
      serviceModel: {}
    }
  },
  created: function (e) {
    this.key = this.$route.params.key
    if (this.key === undefined || this.key.length === 0) {
      this.router.push({name: 'ServicesManagement'})
    }
    loadDetail(this)
  }
}
</script>
