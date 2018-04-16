<template>
  <div class="svrlst">
    <el-button @click="onReload">{{reloadButtonText}}</el-button>
    <el-button @click="onCreate">{{createButtonText}}</el-button>
    <el-table style="width: 100%" :data="serviceArr" v-loading="isLoading">
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
    <el-dialog title="注册新服务" :visible.sync="isCreateMode" :close-on-click-modal="false">
      <el-form :model="createObj" :rules="createRules" ref="createObj">
        <el-form-item label="Service Name" prop="key">
          <el-input v-model="createObj.key" placeholder="Service Name" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item label="Service Desc" prop="desc">
          <el-input v-model="createObj.desc" placeholder="Service Desc" auto-complete="false"></el-input>
        </el-form-item>
        <div align="right">
          <el-button @click.native="isCreateMode = false">Cancel</el-button>
          <el-button @click="onSubmit" type="primary">Save</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.svrlist{

}
</style>

<script>
import axios from 'axios'

function reloadList (pageCtx) {
  pageCtx.isLoading = true
  axios.get(pageCtx.GLOBAL.apiHost + '/svc/getlist').then(function (response) {
    if (response.data.statecode !== 0) {
      pageCtx.isLoading = false
      alert(response.errmsg)
      return
    }
    pageCtx.serviceArr = response.data.result
    pageCtx.isLoading = false
  })
}

function createService (pageCtx) {
  axios.post(pageCtx.GLOBAL.apiHost + '/svc/register', pageCtx.createObj).then(
    function (response) {
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      pageCtx.$refs['createObj'].resetFields()
      pageCtx.$message({
        showClose: true,
        message: '服务注册成功',
        type: 'success'
      })
      reloadList(pageCtx)
      pageCtx.isCreateMode = false
    }
  ).catch(
    function (ex) {

    }
  )
}

export default {
  data () {
    return {
      createButtonText: 'Create',
      reloadButtonText: 'Refresh',
      serviceArr: [],
      isLoading: false,
      isCreateMode: false,
      createObj: {
        key: '',
        desc: ''
      },
      createRules: {
        key: [
          {required: true, message: '请输入Service Key', trigger: 'blur'}
        ]
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
      this.$message({
        message: '服务列表刷新成功',
        type: 'success',
        duration: 1000
      })
    },
    onSubmit: function (e) {
      let that = this
      this.$refs.createObj.validate((valid) => {
        if (valid) {
          createService(that)
        }
      })
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
      }).catch(() => {})
    }
  }
}
</script>
