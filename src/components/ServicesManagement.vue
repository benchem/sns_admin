<template>
  <div class="svrlst">
      <button @click="onCreate">{{createButtonText}}</button>
      <button @click="onReload">{{reloadButtonText}}</button>
      <ul>
      <listItem
        :microService="microService"
        v-for="microService in serviceArr"
        :key="microService.key"
      ></listItem>
      </ul>
  </div>
</template>

<style lang="stylus" scoped>
.svrlist{

}
</style>

<script>
import listItem from '@/ServicesManagement/ListItem.vue'
import axios from 'axios'

function reloadList (pageCtx) {
  axios.get(pageCtx.GLOBAL.apiHost + '/svc/getlist').then(function (response) {
    if (response.data.statecode !== 0) {
      alert(response.errmsg)
      return
    }
    pageCtx.serviceArr = response.data.result
  })
}

export default {
  data () {
    return {
      createButtonText: 'Create',
      reloadButtonText: 'Refresh',
      serviceArr: []
    }
  },
  components: {
    'listItem': listItem
  },
  created: function (e) {
    reloadList(this)
  },
  methods: {
    onCreate: function (e) {
      alert('aaaa')
    },
    onReload: function (e) {
      reloadList(this)
    }
  }
}
</script>
