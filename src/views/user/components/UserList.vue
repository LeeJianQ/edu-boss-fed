<template>
  <div>
    <el-form :inline="true" :model="filterParams" ref="filter-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="filterParams.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="rangeDate">
        <el-date-picker
          v-model="filterParams.rangeDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="loading"
          @click="handleReset"
        >重置</el-button>
        <el-button
          type="primary"
          @click="handleQuery"
          :disabled="loading"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="用户ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="头像"
          width="80">
          <template slot-scope="scope">
            <el-avatar :size="'large'" :src="scope.row.portrait ||require('@/assets/images/default-avatar.jpg')"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="80"
          :class-name="'is-center'"
        >
          <template slot-scope="scope">
            <i
              class="status"
              :class="scope.row.status === 'ENABLE' ? 'locked' : 'unlocked'"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="240"
          :class-name="'is-center'"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 'ENABLE'"
              type="text"
              @click="handleForbidUser(scope.row)"
            >
              禁用
            </el-button>
            <el-button
              v-else
              type="text"
              @click="handleEnableUser(scope.row)"
            >
              启用
            </el-button>
            <el-button
              type="text"
              @click="handleSelectRole(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleAllocRole"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <el-pagination
      style="text-align: right; margin-top: 20px;"
      :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filterParams.currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="filterParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, forbidUser, enableUser } from '@/services/user'
import { Form } from 'element-ui'
import moment from 'moment'
import {
  getAllRoles,
  allocateUserRoles,
  getUserRoles
} from '@/services/role'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      totalCount: 0,
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 5,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      loading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: null // 分配角色的当前用户
    }
  },

  created () {
    this.loadUsers()
  },

  methods: {
    handleSizeChange (val: any) {
      this.filterParams.currentPage = 1
      this.filterParams.pageSize = val
      this.loadUsers()
    },
    handleCurrentChange (val: any) {
      this.filterParams.currentPage = val
      this.loadUsers()
    },
    async loadUsers () {
      this.loading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.totalCount = data.data.total
      data.data.records.forEach((row: any) => {
        row.createTime = moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.users = data.data.records
      this.loading = false
    },

    async handleEnableUser (user: any) {
      const { data } = await enableUser(user.id)
      if (data.code === '000000') {
        this.$message.success('启用用户成功～')
        this.loadUsers()
      } else {
        this.$message.error('启用失败，请联系管理员～')
      }
    },

    async handleForbidUser (user: any) {
      const { data } = await forbidUser(user.id)
      if (data.code === '000000') {
        this.$message.success('禁用用户成功～')
        this.loadUsers()
      } else {
        this.$message.error('禁用失败，请联系管理员～')
      }
    },

    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },

    handleReset () {
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    },

    async handleSelectRole (role: any) {
      this.currentUser = role
      // 加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data

      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)

      // 展示对话框
      this.dialogVisible = true
    },

    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      console.log(data)
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
