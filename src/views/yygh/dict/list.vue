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

    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <el-button type="text" @click="exportData"><i class="fa fa-plus" /> 导出</el-button>
        <el-button type="text" @click="importData"><i class="fa fa-plus" /> 导入</el-button>
      </div>

      <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
        <el-form label-position="right" label-width="170px">
          <el-form-item label="文件">
            <!-- multiple 代表可以上传多个文件 -->
            <el-upload :multiple="false" :on-success="onUploadSuccess"
              :action="'http://nginx.yygh.com:9001/admin/cmn/dict/upload'" class="upload-demo">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogImportVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

  </div>


</template>

<script>
import cmn from '@/api/cmn.js'
import { DatePicker } from 'element-ui'
export default {
  data() {
    return {
      dictList: [],
      dialogImportVisible: false
    }
  },
  created() {
   this.fetchData()
  },
  methods: {
    //文件上传成功回调
    onUploadSuccess(response, file) {
      this.$message.info('上传成功')
      this.dialogImportVisible = false
      this.fetchData()
    },
    fetchData() {
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
    //文件上传
    importData() {
      this.dialogImportVisible = true
    },
    exportData() {
      //这里的地址应该写成 nginx 的服务器地址
      window.open('http://nginx.yygh.com:9001/admin/cmn/dict/download')
    },
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
