<template>
  <div class="app-container">
    <template>
      <div class="app-container">
        <el-form label-width="120px" :rules="rules" :model="hospset" ref="validateHosp">
          <el-form-item label="医院名称" prop="hosname">
            <el-input v-model="hospset.hosname" />
          </el-form-item>
          <el-form-item label="医院编号" prop="hoscode">
            <el-input v-model="hospset.hoscode" />
          </el-form-item>
          <el-form-item label="api地址">
            <el-input v-model="hospset.apiUrl" />
          </el-form-item>
          <el-form-item label="联系人" prop="contactsName">
            <el-input v-model="hospset.contactsName" />
          </el-form-item>
          <el-form-item label="电话" prop="contactsPhone">
            <el-input v-model="hospset.contactsPhone" />
          </el-form-item>
          <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('validateHosp')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script>
import hospitalset from '@/api/hospitalset'
export default {
  data() {
    return {
      hospset: {},
      rules: {
        hosname: [
          { required: true, message: '请输入医院名称', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        hoscode: [
          { required: true, message: '请输入医院编码', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ]
      },
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  methods: {
    //根据id 查询详情
    fetchDataById(id) {
      hospitalset.getHospitalSetById(id).then(response => {
        this.hospset = response.data.item
      }).catch(response => {
        this.$message({
          type: 'error',
          message: '获取数据失败'
        })
      })
    },
    //保存或者修改
    saveOrUpdate(formName) {
      //二次校验
      this.saveBtnDisabled = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.hospset.id) {
            console.log('执行新增')
            this.saveData()
          } else {
            console.log('执行修改')
            this.updateData()
          }
        } else {
          this.$message.error('表单输入有误')
          return false;
        }
      });
    },
    updateData() {
      console.log('执行更新操作')
      hospitalset.updateById(this.hospset).then(response => {
        return this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).then(response => {
        this.$router.push({
          path: '/yygh/hospset/list'
        })
      }).catch(response => {
          // console.log(response)
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        })
    },
    saveData() {
      //保存数据
      console.log('执行保存操作')
      hospitalset.save(this.hospset).then(response => {
        return this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).then(response => {
        this.$router.push({
          path: '/yygh/hospset/list'
        })
      })
        .catch(response => {
          // console.log(response)
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    }
  },
  created() {
    console.log('created')
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }
  }
}
</script>