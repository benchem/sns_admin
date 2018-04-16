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
              <Lookup v-model="currentObject[headItem.column]"/>
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
            <el-button size="small">添加一行</el-button> <el-button size="small">移除一行</el-button>
            <el-table>
              <el-table-column v-for="col in formEntitySchema" :key="col.column" :prop="col.column" :label="col.caption"></el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <router-link :to="{name:'ServiceDetail', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-edit"></router-link>
                  <router-link :to="{name:'ServiceInstance', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-upload"></router-link>
                  <a class='el-button el-button--text el-icon-delete' @click="onDelete(scope.row.FID)" :v-bind="scope.row.FID"></a>
                </template>
              </el-table-column>
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
          column: 'FOrderIndex',
          caption: '序号'
        },
        {
          column: 'FProductName',
          caption: '商品名称'
        },
        {
          column: 'FQty',
          caption: '采购数量'
        },
        {
          column: 'FUnitName',
          caption: '单位'
        }
      ],
      currentObject: {
        FBillNo: '保存时创建',
        FSupplier: '',
        Entity: []
      },
      headLpOptions: {

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
    loadHeadLpOptions: function (query) {
      console.log(query)
    }
  }
}
</script>
