<template>
  <div class="app-container">
    <el-table :data="dictList" style="width: 100%" row-key="id" border lazy :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="dictCode" label="编码" width="180">
      </el-table-column>
      <el-table-column prop="value" label="值">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
    </el-table>
  </div>


</template>

<script>
import cmn from '@/api/cmn.js'
import { DatePicker } from 'element-ui'
export default {
  data() {
    return {
      dictList: []
    }
  },
  created() {
    cmn.findChildData(1).then(response => {
      this.dictList = response.data.items
      // console.log(this.dictList)
    }).catch(() => {
      this.$message({
        type: 'error',
        message: '加载数据失败'
      });
    })
  },
  methods: {
    load(row, treeNode, resolve) {
      //拿到这个id
      var id = row.id
      cmn.findChildData(id).then(response => {
        var reuslt = response.data.items
        resolve(reuslt)
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '加载数据失败'
        });
      })
    }
  }
}
</script>
