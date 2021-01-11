<template>
  <el-card>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="广告位名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">提交</el-button>
        <el-button @click="form.name = ''">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateAdSpace, getSpaceById } from '@/services/advert'

export default Vue.extend({
  name: 'CreateOrUpdate',
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: [String, Number]
  },
  created () {
    if (this.isEdit) {
      this.loadSpace()
    }
  },
  methods: {
    async loadSpace () {
      const { data } = await getSpaceById(this.id)
      this.form = data.content
    },
    saveOrUpdate () {
      this.$confirm(`是否${this.isEdit ? '修改' : '提交'}数据？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await saveOrUpdateAdSpace(this.form)
        if (data.state === 1) {
          this.$message.success(`数据${this.isEdit ? '修改' : '提交'}成功`)
          this.$router.back()
        } else {
          this.$message.error(`数据${this.isEdit ? '修改' : '提交'}失败，请联系管理员～`)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
