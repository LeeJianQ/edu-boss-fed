<template>
  <div class="alloc-resource">
    <el-card>
      <div slot="header">
        <span>资源分配</span>
      </div>
      <div v-for="(item, index) in resources" :key="item.id">
        <el-row>
          <el-col :span="24">
            <div class="table-layout grid-content bg-purple-light">
              <el-checkbox :indeterminate="item.selected" v-model="item.checkAll" @change="handleCheckAllChange(item, index)">{{item.name}}</el-checkbox>
            </div>
          </el-col>
        </el-row>
        <el-row class="table-layout">
          <el-checkbox-group v-model="item.checkeds">
            <el-col v-for="resource in item.resourceList" :key="resource.id" :span="8">
              <div class="grid-content">
                <el-checkbox
                  :label="resource"
                  :key="resource.id"
                  @change="handleCheckedResourceChange(index)"
                >
                  {{resource.name}}
                </el-checkbox>
              </div>
            </el-col>
          </el-checkbox-group>
        </el-row>
      </div>
      <div style="margin-top: 20px; text-align: center">
        <el-button type="primary" @click="saveResource">保存</el-button>
        <el-button @click="clearResource">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getRoleResources,
  allocateRoleResources
} from '@/services/resource'

export default Vue.extend({
  name: 'ResourceIndex',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      resources: [],
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      },
      resourceList: []
    }
  },
  created () {
    this.initAllocResource()
  },
  methods: {
    // 处理单个资源选择问题
    handleCheckedResourceChange (index: any) {
      const data: any = this.resources[index]
      data.selected = data.checkeds.length === data.resourceList.length
      data.selected = !data.selected
      data.checkAll = data.checkeds.length === data.resourceList.length
      this.$set(this.resources, index, data)
    },
    // 全选或者取消
    handleCheckAllChange (data: any, index: any) {
      data.selected = false
      data.resourceList && data.resourceList.forEach((item: any) => {
        item.selected = data.checkAll
      })
      data.checkeds = data.checkAll ? data.resourceList : []
      this.$set(this.resources, index, data)
    },
    // 初始化所有权限
    async initAllocResource () {
      const { data } = await getRoleResources(this.roleId)
      data.data.forEach((item: any) => {
        item.checkAll = item.resourceList && item.resourceList.findIndex((row: any) => !row.selected).length < 0
        item.checkeds = item.resourceList && item.resourceList.filter((row: any) => row.selected)
      })
      data.data = data.data.sort((a: any, b: any) => {
        return a.id - b.id
      })
      this.resources = data.data
    },
    saveResource () {
      this.$confirm('是否分配资源？?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.resources.forEach((item: any) => {
          item.checkeds && item.checkeds.forEach((row: any) => {
            this.resourceList = [...this.resourceList, row.id] as any
          })
        })
        const { data } = await allocateRoleResources({
          roleId: this.roleId,
          resourceIdList: this.resourceList
        })
        if (data.code === '000000') {
          this.$message.success('分配成功')
        } else {
          this.$message.error('分配失败，请联系管理员～')
        }
        this.resourceList = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分配'
        })
      })
    },
    clearResource () {
      this.resources.forEach((item: any, index: any) => {
        item.checkAll = false
        this.handleCheckAllChange(item, index)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .table-layout {
      padding: 20px;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
