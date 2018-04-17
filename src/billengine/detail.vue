<template>
  <el-row>
    <el-col>
      <el-button @click="onBack">返回</el-button>
      <el-button type="primary">保存</el-button>
      <el-form :inline="true" style="margin-top:60px" :model="currentObject" ref="currentObject">
        <template v-for="(headItem) in formHeadSchema">
          <el-form-item :label="headItem.caption" :key="headItem.column" :prop="headItem.column">
            <template v-if="headItem.isReadOnly">
              <el-input v-model="currentObject[headItem.column]" disabled="disabled"/>
            </template>
            <template v-else-if="headItem.isLookup">
              <Lookup v-model="currentObject[headItem.column]" :currentObj="currentObject" :columnName="headItem.column"/>
            </template>
            <template v-else-if="headItem.dataType === 'System.DateTime'">
              <el-date-picker v-model="currentObject[headItem.column]" type="datetime" placeholder="选择日期时间"/>
            </template>
            <template v-else>
              <el-input v-model="currentObject[headItem.column]"/>
            </template>
          </el-form-item>
        </template>
        <template v-if="formEntitySchema.length > 0">
          <div>
            <el-button size="small" @click="entityAddRow">添加一行</el-button>
            <el-button size="small" @click="entityRemoveRow" v-popover:nothingDeleteTips>移除一行</el-button>
            <el-table :data="currentObject.Entity" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column v-if="col.isDisplay" v-for="col in formEntitySchema" :key="col.column" :prop="col.column" :label="col.caption">
                <template slot-scope="scope">
                  <template v-if="currentObject.focusEntity !== null && scope.row.FROWID === currentObject.focusEntity.FROWID">
                    <el-input v-model="scope.row[col.column]"/>
                  </template>
                  <template v-else>
                    {{scope.row[col.column]}}
                  </template>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <router-link :to="{name:'ServiceDetail', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-edit"></router-link>
                  <router-link :to="{name:'ServiceInstance', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-upload"></router-link>
                  <a class='el-button el-button--text el-icon-delete' @click="onDelete(scope.row.FID)" :v-bind="scope.row.FID"></a>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </template>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="stylus" scoped>

</style>

<script>
import Lookup from '@/components/Lookup'

function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

export default {
  data () {
    return {
      loading: false,
      formHeadSchema: [
        {
          column: 'FBillNo',
          caption: '订单编号',
          isReadOnly: true
        },
        {
          column: 'FSupplier',
          caption: '供应商',
          isLookup: true
        },
        {
          column: 'FDate',
          caption: '下单日期',
          dataType: 'System.DateTime'
        }
      ],
      formEntitySchema: [
        {
          column: 'FROWID',
          caption: '内码'
        },
        {
          column: 'FOrderIndex',
          caption: '序号',
          isDisplay: true
        },
        {
          column: 'FProductName',
          caption: '商品名称',
          isDisplay: true
        },
        {
          column: 'FQty',
          caption: '采购数量',
          isDisplay: true
        },
        {
          column: 'FUnitName',
          caption: '单位',
          isDisplay: true
        }
      ],
      currentObject: {
        FBillNo: '保存时创建',
        FSupplier: '',
        FDate: new Date(),
        Entity: [],
        focusEntity: null
      }
    }
  },
  components: {
    'Lookup': Lookup
  },
  methods: {
    onBack: function (e) {
      this.$router.push({name: 'BillEngineDemo'})
    },
    entityAddRow: function (e) {
      var newRow = {}
      for (var index in this.formEntitySchema) {
        var colInfo = this.formEntitySchema[index]
        newRow[colInfo.column] = uuid()
      }
      this.currentObject.Entity.push(newRow)
    },
    entityRemoveRow: function (e) {
      if (this.currentObject.focusEntity == null) {
        this.$alert('请选择需要移除的分录行', '提示')
        return
      }
      this.currentObject.Entity.splice(this.currentObject.Entity.findIndex((item) => item.FROWID === this.currentObject.focusEntity.FROWID), 1)
      this.currentObject.focusEntity = null
    },
    handleCurrentChange: function (focusRow) {
      this.currentObject.focusEntity = focusRow
    }
  }
}
</script>
