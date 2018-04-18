<template>
  <div id="svrInst">
    <router-link :to="{name:'ServicesManagement'}" class="SericeDetallBack">返回</router-link>
    <div class="svrInstTop">
      <div class="svrInstTopInput">
        <label for="lb">service key :</label>
        <el-input
        v-model="serviceModel.key"
        :disabled="true"
        >
        </el-input>
      </div>
        <!-- <input name="lb" type="text" v-model="serviceModel.key" disabled="disabled"/> -->
      <div class="svrInstTopInput">
        <label for="desc">desc :</label>
      <el-input
        v-model="serviceModel.desc"
        :disabled="true"
        >
        </el-input>
      </div>
      <div class="svrInstTopInputTwo" label-width="100%">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
          <el-form-item label="实例Url" prop="url">
            <el-input type="text" v-model="ruleForm2.url"></el-input>
          </el-form-item>
          <el-form-item label="超时 (ms)" prop="timeOut">
            <el-input v-model.number="ruleForm2.timeOut" maxlength="5"></el-input>
          </el-form-item>
          <el-form-item label="权重" prop="weights">
            <el-input v-model.number="ruleForm2.weights" maxlength="2" placeholder="0~10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="submitForm('ruleForm2')">配置</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
        <!-- <el-button  type="primary" class="twoSave"  @click="addService" id="ServiceButton">配置</el-button> -->
        <div class="svrInstBottom" >
          <div v-for="(item,oItem) in serviceModel.items" :key="item.id">
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
    var validateUrl = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写实例Url'))
      } else {
        // if (this.ruleForm2.checkPass !== '') {
        //   this.$refs.ruleForm2.validateField('checkPass')
        // }
        callback()
      }
    }
    var validateTimeOut = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('超时不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validataWeights = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('权重不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value > 10 || value < 0) {
            callback(new Error('必须符合范围'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      key: '',
      serviceModel: {},
      oInput: '',
      tInput: '',
      thInput: '',
      ruleForm2: {
        url: '',
        timeOut: '',
        weights: ''
      },
      rules2: {
        url: [
          { validator: validateUrl, trigger: 'blur' }
        ],
        timeOut: [
          { validator: validateTimeOut, trigger: 'blur' }
        ],
        weights: [
          { validator: validataWeights, trigger: 'blur' }
        ]
      }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '配置成功',
            type: 'success'
          })
        } else {
          this.$message.error('信息有误')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addService: function (e) {
      // var serviceName = e.target.value.trim()
      //   console.log(serviceName);
      //   e.target.value = ''
      if (this.oInput === '' || this.tInput === '' || this.thInput === '') {
        alert('请输入数据')
      } else {
        sessionStorage.setItem('0', this.oInput)
        sessionStorage.setItem('1', this.tInput)
        sessionStorage.setItem('2', this.thInput)
        alert('配置成功')
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
    desc: pageCtx.serviceModel.desc,
    url: pageCtx.ruleForm2.url,
    timeout: pageCtx.ruleForm2.timeOut,
    weight: pageCtx.ruleForm2.weights
  }
  axios.post(apiHost + '/inst/register', commitPackage)
    .then(function (response) {
      console.log(response)
      if (response.data.statecode !== 0) {
        alert(response.data.errmsg)
        return
      }
      sessionStorage.removeItem('0')
      sessionStorage.removeItem('1')
      sessionStorage.removeItem('2')
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
