<template>
  <div class="svrlst">
    <div align="left">
      <div v-if="!isCreateMode">
        <el-button @click="onReload">{{reloadButtonText}}</el-button>
        <el-button @click="onCreate">{{createButtonText}}</el-button>
      </div>
      <div v-else>
        <el-button @click="onSubmit">Save</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </div>
    </div>
    <div v-if="!isCreateMode">
      <el-table style="width: 100%" :data="serviceArr">
        <el-table-column
          label="Service Key"
          prop="key"
          width="180"
        ></el-table-column>
        <el-table-column
          label="Service Desc"
          prop="desc"
        ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <router-link :to="{name:'ServiceDetail', params:{key:scope.row.key}}" class="el-button el-button--text el-icon-edit"></router-link>
            <router-link :to="{name:'ServiceInstance', params:{key:scope.row.key}}" class="el-button el-button--text el-icon-upload"></router-link>
            <a class='el-button el-button--text el-icon-delete' @click="onUnreg(scope.row.key)" :v-bind="scope.row.key"></a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-form>
        <el-form-item label="Service Name">
          <el-input type="text" name="txtSvrName" v-model="createObj.key" placeholder="Service Name"></el-input>
        </el-form-item>
        <el-form-item label="Service Desc">
          <el-input type="text" name="txtSvrDesc" v-model="createObj.desc" placeholder="Service Desc"></el-input>
        </el-form-item>
      </el-form>
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
          that.$message({
            showClose: true,
            message: '服务注册成功',
            type: 'success'
          })
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
      let that = this
      this.$confirm('是否注销 ' + microKey + ' 服务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(that.GLOBAL.apiHost + '/svc/unregister2', {
          serviceKey: microKey
        }).then((response) => {
          if (response.data.statecode !== 0) {
            that.$message({
              showClose: true,
              type: 'error',
              message: response.data.errmsg
            })
            return
          }
          that.$message({
            showClose: true,
            message: '服务注销成功',
            type: 'success'
          })
          that.serviceArr.splice(that.serviceArr.findIndex(item => item.key === microKey), 1)
        })
      })
    }
  }
}
</script>
