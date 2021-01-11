<template>
  <el-card>
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="广告名称" prop="name" required>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置" prop="spaceId">
        <el-select v-model="form.spaceId" placeholder="请选择广告位置">
          <el-option v-for="item in spaces" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" required>
        <el-form-item prop="startTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-form-item prop="endTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="上线/下线" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="0">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片" prop="img">
        <course-image v-model="form.img" />
      </el-form-item>
      <el-form-item label="广告链接" prop="link" required>
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注" prop="text">
        <el-input type="textarea" v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from '@/views/course/components/CourseImage.vue'
import { getAdById, getAllSpaces, saveOrUpdateAd } from '@/services/advert'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrUpdate',
  data () {
    return {
      form: {
        name: '',
        spaceId: null,
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        status: 0
      },
      spaces: [],
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请填写广告链接', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    CourseImage
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: [String, Number]
  },
  created () {
    this.loadAllSpace()
    if (this.isEdit) {
      this.loadAdDetail()
    }
  },
  methods: {
    async loadAdDetail () {
      console.log(this.id)
      const { data } = await getAdById(this.id)
      this.form = data.content
    },
    async loadAllSpace () {
      const { data } = await getAllSpaces()
      this.spaces = data.content
    },
    submitForm () {
      this.$confirm(`是否${this.isEdit ? '修改' : '提交'}数据？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await saveOrUpdateAd(this.form)
        if (data.state === 1) {
          this.$message.success(`数据${this.isEdit ? '修改' : '提交'}成功`)
          this.$router.back()
        } else {
          this.$message.error(`数据${this.isEdit ? '修改' : '提交'}失败，请联系管理员～`)
        }
      })
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped></style>
