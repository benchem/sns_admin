<template>
  <div id="svrDetail">
    <router-link :to="{name:'ServicesManagement'}">返回</router-link>
    <div>
      <label for="lb">service key</label>
      <input name="lb" type="text" v-model="serviceModel.key">

      <label for="desc">desc</label>
      <input type="text" v-model="serviceModel.desc">
    </div>
    <div>
      <input type="radio" name="access_type" id="access_type_0" value="0" v-model="serviceModel.access_type">
      <label for="access_type_0">公开</label>
      <input type="radio" name="access_type" id="access_type_1" value="1" v-model="serviceModel.access_type">
      <label for="access_type_1">白名单</label>
      <input type="radio" name="access_type" id="access_type_2" value="2" v-model="serviceModel.access_type">
      <label for="access_type_2">黑名单</label>
    </div>
    <div v-if="serviceModel.access_type > 0">
      <input
        type="text"
        placeholder="请输入服务名"
        @keyup.enter="addService"
      >
      <ol>
        <li v-for="item in serviceModel.access_list" :key="item">
          {{item}} [<a href="#" @click="remove(item)">Remove</a>]
        </li>
      </ol>
    </div>
    <button @click="onSave">Save</button>
  </div>
</template>

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

function commitDetail (pageCtx) {
  let apiHost = pageCtx.GLOBAL.apiHost
  var commitPackage = {
    svc_key: pageCtx.serviceModel.key,
    access_type: pageCtx.serviceModel.access_type,
    list: pageCtx.serviceModel.access_list
  }
  axios.post(apiHost + '/access/setdetail', commitPackage).then(
    function (response) {
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      alert('保存成功')
      pageCtx.router.push({name: 'ServicesManagement'})
    }
  ).catch(
    function (err) {
      console.log(err)
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
  },
  methods: {
    addService: function (e) {
      var serviceName = e.target.value.trim()
      if (serviceName === undefined || serviceName.length === 0) {
        alert('请输入服务名')
        return
      }
      this.serviceModel.access_list.unshift(serviceName)
      e.target.value = ''
    },
    remove: function (callerKey) {
      this.serviceModel.access_list.splice(this.serviceModel.access_list.findIndex(item => item === callerKey), 1)
    },
    onSave: function (e) {
      commitDetail(this)
    }
  }
}
</script>
