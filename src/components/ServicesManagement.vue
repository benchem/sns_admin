<template>
  <div class="svrlst">
    <div v-if="!isCreateMode">
      <el-button @click="onCreate">{{createButtonText}}</el-button>
      <el-button @click="onReload">{{reloadButtonText}}</el-button>
      <el-table style="width: 90%" :data="serviceArr">
        <el-table-column
          label="Service Key"
          prop="key"
          width="180"
        ></el-table-column>
        <el-table-column
          label="Service Desc"
          prop="desc"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'ServiceDetail', params:{key:scope.row.key}}" class="el-button el-button--text">详情</router-link>
            <router-link :to="{name:'ServiceInstance', params:{key:scope.row.key}}" class="el-button el-button--text">实例</router-link>
            <i class='el-icon-delete' @click="onUnreg(scope.row.key)" :v-bind="scope.row.key"></i>
          </template>
        </el-table-column>
      </el-table>
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
    },
    onUnreg: function (microKey) {
      alert(microKey)
    }
  }
}
</script>
