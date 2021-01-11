<template>
  <div class="resource-category">
    <el-card>
      <div slot="header">
        <el-button size="mini" @click="dialogFormVisible = true">添加</el-button>
      </div>
      <el-table
        :data="resourceCategorys"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="120">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="handleResourceCategories(scope.row)">编辑</el-button>
            <el-button type="text" disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" @close="closeResource">
      <el-form :model="resourceCategory" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="resourceCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="resourceCategory.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleResourecCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategories, saveOrderUpdate } from '@/services/resource-category'
import moment from 'moment'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      dialogFormVisible: false,
      resourceCategory: {
        name: '',
        sort: 0
      },
      resourceCategorys: []
    }
  },
  created () {
    this.loadRescourceCategories()
  },
  methods: {
    async loadRescourceCategories () {
      const { data } = await getResourceCategories()
      data.data.forEach((item: any) => {
        item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.resourceCategorys = data.data
    },
    closeResource () {
      this.dialogFormVisible = false
      this.resourceCategory = {
        name: '',
        sort: 0
      }
    },
    handleResourceCategories (data: any) {
      this.dialogFormVisible = true
      this.resourceCategory = data
    },
    async handleResourecCategory () {
      const { data } = await saveOrderUpdate(this.resourceCategory)
      if (data.code === '000000') {
        this.$message.success('添加成功')
      } else {
        this.$message.error('添加异常，请联系管理员～')
      }
      this.dialogFormVisible = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
