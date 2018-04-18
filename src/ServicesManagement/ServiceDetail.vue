<template>
  <div id="svrDetail">
<!-- 返回 -->
  <router-link :to="{name:'ServicesManagement'}" class="SericeDetallBack">返回</router-link>
    <div class="svrDetailTop">
<!-- 输入框 -->
    <label for="lb">service key:</label>
      <el-input
      v-model="serviceModel.key"
      :disabled="true">
      </el-input>
      <label for="desc">desc:</label>
      <el-input
      v-model="serviceModel.desc"
      :disabled="true">
    </el-input>
    </div>
    <div class="svrDetailTopCenter">
    <ul class="svrDetailTopCenterUl">
      <li>
        <input type="radio" name="access_type" id="access_type_0" value="0" v-model="serviceModel.access_type">公开
      </li>
      <li>
        <input type="radio" name="access_type" id="access_type_1" value="1" v-model="serviceModel.access_type">白名单
      </li>
      <li>
        <input type="radio" name="access_type" id="access_type_2" value="2" v-model="serviceModel.access_type">黑名单
      </li>
    </ul>
    </div>
    <!-- 表格 -->
  <div v-if="serviceModel.access_type > 0">
      <el-input type="text" placeholder="请输入服务名(轻敲回车确认)"  class="ServiceDetailBottom" @keyup.enter.native="addService" ></el-input>
        <div class="ServiceDetailBottomUl">
          <div v-for="(item,oItem) in serviceModel.access_list" :key="item.id">
            <p>{{oItem+1}}.{{item}} </p><br>
            <a href="#" @click="remove(item)">Remove</a>
          </div>
        </div>
    </div>
    <el-button @click="onSave" type="primary" class="oSave">Save</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      key: '',
      serviceModel: []
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
      console.log(serviceName)
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

function loadDetail (pageCtx) {
  let apiHost = pageCtx.GLOBAL.apiHost
  axios.get(apiHost + '/svc/getdetail?key=' + pageCtx.key)
    .then(function (response) {
      console.log(response)
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      pageCtx.serviceModel = response.data.result
    }
    )
}

function commitDetail (pageCtx) {
  console.log(pageCtx)
  let apiHost = pageCtx.GLOBAL.apiHost
  var commitPackage = {
    svc_key: pageCtx.serviceModel.key,
    access_type: pageCtx.serviceModel.access_type,
    list: pageCtx.serviceModel.access_list
  }
  axios.post(apiHost + '/access/setdetail', commitPackage)
    .then(function (response) {
      console.log(response)
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      alert('保存成功')
      // pageCtx.router.push({name: 'ServicesManagement'})
    }
    ).catch(
      function (err) {
        console.log(err)
      }
    )
}

</script>
<style scoped>
#svrDetail .SericeDetallBack {
  background-color: #409eff;
  text-decoration: none;
  color: #fff;
  padding: .7% 1.5%;
  font-size: 13px;
  border-radius: 5px;
}
#svrDetail .svrDetailTop {
  width: 30%;
  margin-top: 2%;
}
#svrDetail .svrDetailTopCenter {
  margin-top: 1%;
}
#svrDetail .svrDetailTopCenter .svrDetailTopCenterUl {
  list-style: none;
}
#svrDetail .svrDetailTopCenter .svrDetailTopCenterUl li {
    display: inline-block;
    padding-right: 2%;
    font-size: 13px;
}
#svrDetail .svrDetailTopCenterInput {
  width: 30%;
}
#svrDetail svrDetailTopCenter input {
  padding-right: 3%;
}
#svrDetail .ServiceDetailBottom {
  width: 30%;
}
#svrDetail .ServiceDetailBottomUl div {
  list-style: none;
}
    #svrDetail .ServiceDetailBottomUl div p {
      display: inline-block;
      margin-bottom: .5%;
    }
  #svrDetail .ServiceDetailBottomUl div a {
    background-color: rgb(245,108,108);
    text-decoration: none;
    color: #fff;
    padding: .5% 1.2%;
    font-size: 13px;
    border-radius: 5px;
    margin: .5% 0;
  }
  #svrDetail .oSave {
    margin-top: 2%;
  }
</style>
