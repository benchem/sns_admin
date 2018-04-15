<template>
  <div class="svrlst">
    <div v-if="!isCreateMode">
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
    <div v-else>
      <label for="txtSvrName">Service Name</label>
      <input type="text" name="txtSvrName" v-model="createObj.key">
      <label for="txtSvrDesc">Service Desc</label>
      <input type="text" name="txtSvrDesc" v-model="createObj.desc">
      <button @click="onSubmit">Save</button>
      <button @click="onCancel">Cancel</button>
    </div>
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
      serviceArr: [],
      isCreateMode: false,
      createObj: {
        key: '',
        desc: ''
      }
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
      this.isCreateMode = true
    },
    onReload: function (e) {
      reloadList(this)
    },
    onSubmit: function (e) {
      let that = this
      axios.post(this.GLOBAL.apiHost + '/svc/register', this.createObj).then(
        function (response) {
          if (response.data.statecode !== 0) {
            alert(response.data.errmsg)
            return
          }
          reloadList(that)
          that.isCreateMode = false
        }
      ).catch(
        function (ex) {

        }
      )
    },
    onCancel: function (e) {
      this.isCreateMode = false
    }
  }
}
</script>
