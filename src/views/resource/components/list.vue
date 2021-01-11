<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button size="mini" @click="handleAdd">添加</el-button>
        <el-button
          size="mini"
          @click="$router.push({name: 'resource-category'})"
        >资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        v-loading="isLoading"
        style="width: 100%; margin-bottom: 20px">
        <el-table-column
          type="index"
          label="编号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              disabled
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑资源': '添加资源'"
      :visible.sync="dialogFormVisible"
      @close="resetRescouceFrom"
    >
      <el-form :model="resourceForm" ref="resourceForm">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="resourceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" :label-width="formLabelWidth">
          <el-input v-model="resourceForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth">
          <el-select v-model="resourceForm.categoryId" placeholder="请选择资源分类">
            <el-option
              v-for="item in resourceCategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="resourceForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleResource">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, saveOrUpdateResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 5
      },
      resourceForm: {
        name: '',
        categoryId: null,
        url: '',
        description: ''
      },
      totalCount: 0,
      resourceCategories: [],
      isLoading: true,
      isEdit: false,
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created () {
    this.loadResurces()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResurces () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
      console.log(data)
    },
    onSubmit () {
      this.loadResurces()
    },
    handleDelete (item: any) {
      console.log(item)
    },
    handleEdit (item: any) {
      this.resourceForm = item
      this.isEdit = true
      this.dialogFormVisible = true
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResurces()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResurces()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResurces()
    },
    handleAdd () {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    resetRescouceFrom () {
      this.resourceForm = {
        name: '',
        categoryId: null,
        url: '',
        description: ''
      }
    },
    async handleResource () {
      const { data } = await saveOrUpdateResource(this.resourceForm)
      if (data.code === '000000') {
        this.$message.success(`${this.isEdit ? '修改' : '添加'}资源成功～`)
        this.dialogFormVisible = false
      } else {
        this.$message.error(`${this.isEdit ? '修改' : '添加'}资源异常，请联系管理员～`)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
