<template>
  <el-row>
    <el-col>
      <el-button>刷新</el-button>
      <el-button @click="onCreate">新建</el-button>
      <el-table :data="gridSource" style="100%">
        <el-table-column v-for="col in gridSchema" :key="col.column" :prop="col.column" :label="col.caption"></el-table-column>
        <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="{name:'ServiceDetail', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-edit"></router-link>
          <router-link :to="{name:'ServiceInstance', params:{key:scope.row.FID}}" class="el-button el-button--text el-icon-upload"></router-link>
          <a class='el-button el-button--text el-icon-delete' @click="onDelete(scope.row.FID)" :v-bind="scope.row.FID"></a>
        </template>
      </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style lang="stylus" scoped>

</style>

<script>
export default {
  data () {
    return {
      gridSchema: [
        {
          column: 'FBillNo',
          caption: '订单编号'
        },
        {
          column: 'FDate',
          caption: '下单日期'
        },
        {
          column: 'FSupplier',
          caption: '供应商'
        },
        {
          column: 'FSupplierNumber',
          caption: '供应商编码'
        }
      ],
      gridSource: [
        {
          FID: 10000,
          FBillNo: 'CGDD20180400001',
          FDate: '2018-1-1 14:00',
          FSupplierNumber: '0001',
          FSupplier: '京东商城'
        },
        {
          FID: 10001,
          FBillNo: 'CGDD20180400002',
          FDate: '2018-1-1 14:01',
          FSupplierNumber: '0002',
          FSupplier: '天猫商城'
        }
      ]
    }
  },
  methods: {
    onCreate: function (e) {
      this.$router.push({name: 'BillDetailEngineDemo'})
    }
  }
}
</script>
