<template>
  <div id="svrInst">
    <router-link :to="{name:'ServicesManagement'}" class="SericeDetallBack">返回</router-link>
    <div class="svrInstTop">
      <div class="svrInstTopInput">
        <label for="lb">service key</label>
        <el-input
        v-model="serviceModel.key"
        :disabled="true"
        >
        </el-input>
      </div>
        <!-- <input name="lb" type="text" v-model="serviceModel.key" disabled="disabled"/> -->
      <div class="svrInstTopInput">
        <label for="desc">desc</label>
      <el-input
        v-model="serviceModel.desc"
        :disabled="true"
        >
        </el-input>
        <!-- <input type="text" v-model="serviceModel.desc" disabled="disabled"/> -->
      </div>

      <div>
          <div class="svrInstTopInputTwo">
            <el-input placeholder="请输入Url" v-model="oInput" id="oInput" ></el-input>
          </div>
          <div class="svrInstTopInputTwo">
            <el-input placeholder="请设置超时 (ms)" v-model="tInput" id="tInput" ></el-input>
          </div>
          <div class="svrInstTopInputTwo">
            <el-input placeholder="请设置权重 0~10" v-model="thInput" id="thInput" ></el-input>
          </div>
      </div>
        <el-button  type="primary" class="twoSave"  @click="addService" id="ServiceButton">配置</el-button>
        <div class="svrInstBottom" >
          <div v-for="item,oItem in serviceModel.items"  >
            <p>{{oItem+1}}.{{item.url}} </p>
            <a href="#" @click="remove(item)">Remove</a>
          </div>
        </div>
          <el-button @click="onSave" type="primary" class="oSave">Save</el-button>
	  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      key: '',
      serviceModel: {},
      oInput : '',
      tInput : '',
      thInput : '',
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
      // var serviceName = e.target.value.trim()
      //   console.log(serviceName);
        
      //   e.target.value = ''      
      if (this.oInput == "" || this.tInput == "" || this.thInput == "" ) {
          alert('请输入数据')
          return;
        }else{
          sessionStorage.setItem("0",this.oInput);
          sessionStorage.setItem("1",this.tInput);
          sessionStorage.setItem("2",this.thInput);
        alert("配置成功");
        }
      // this.serviceModel.items.unshift(serviceName);      
},
    remove: function (callerKey) {
      this.serviceModel.items.splice(this.serviceModel.items.findIndex(item => item === callerKey), 1)
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
    console.log(response);
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      pageCtx.serviceModel = response.data.result
    }
  )
}

function commitDetail (pageCtx) {
  let apiHost = pageCtx.GLOBAL.apiHost;
  var commitPackage = {
    svc_key: pageCtx.serviceModel.key,
    desc : pageCtx.serviceModel.desc,
    url : sessionStorage.getItem("0"),
    timeout : sessionStorage.getItem("1"),
    weight : sessionStorage.getItem("2")
  }
  axios.post(apiHost + '/inst/register', commitPackage)
  .then(function (response) {
    console.log(response);
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      sessionStorage.removeItem("0");
      sessionStorage.removeItem("1");
      sessionStorage.removeItem("2");
      alert('保存成功')
      pageCtx.router.push({name: 'ServicesManagement'})
    }
  ).catch(
    function (err) {
      console.log(err)
    }
  )
}
</script>


<style scoped>
	#svrInst .SericeDetallBack {
		background-color: #409eff;
		text-decoration: none;
		color: #fff;
		padding: .7% 1.5%;
		font-size: 13px;
		border-radius: 5px;
	}
	#svrInst .svrInstTop {
		margin-top: 2%;
	}
	#svrInst .svrInstTopInput {
		width: 30%;
	}
  #svrInst .svrInstTop .svrInstTopInputTwo {
    width: 30%;
    margin-top: 1%;
  }
  #svrInst .svrInstTop .svrInstTopInputTwo button {
    margin-top: 3%;
  }
  .twoSave {
    margin-top: 1%; 
  }
  #svrInst .svrInstBottom p {
    padding-bottom: 1%;
    margin-bottom: 0;
  }
  #svrInst .svrInstBottom a {
    background-color: rgb(245,108,108);
    text-decoration: none;
    color: #fff;
    padding: .5% 1.2%;
    font-size: 13px;
    border-radius: 5px;
  }
  #svrInst .oSave {
    margin-top: 3%;
  }
</style>
