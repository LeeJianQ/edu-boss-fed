<template>
  <div class="advert">
    <el-card>
      <div slot="header">
        <el-button @click="$router.push({name: 'advert-create'})">添加广告</el-button>
      </div>
      <el-table
        :data="adverts"
        border
        style="width: 100%">
        <el-table-column
          class-name="is-center"
          prop="id"
          label="id"
          width="150">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="name"
          label="广告名称"
          width="280">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="spaceName"
          label="广告位置"
          width="180">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="city"
          label="广告图片"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="height: 80px;">
          </template>
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="address"
          label="时间"
          width="300">
          <template slot-scope="scope">
            <span>开始时间：{{scope.row.startTimeFormatString}}</span>
            <br>
            <span>结束时间：{{scope.row.endTimeFormatString}}</span>
          </template>
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="zip"
          label="上线/下线"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="handleAdStatus(scope.row)"
              active-color="#40586f"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          class-name="is-center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'advert-edit',
                params: {
                  id: scope.row.id
                }
              })"
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, getAllSpaces, updateAdStatus } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      adverts: [],
      spaces: []
    }
  },
  created () {
    this.loadAdverts()
    this.loadAllSpaces()
  },
  methods: {
    handleAdStatus (data: any) {
      this.$confirm('是否修改上线/下线状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: adData } = await updateAdStatus({
          id: data.id,
          status: data.status
        })
        if (adData.state === 1) {
          this.$message.success('状态修改成功')
        } else {
          this.$message.error('状态修改失败，请联系管理员～')
        }
      })
    },
    handlePosition (id: any) {
      const data: any = this.spaces.find((item: any) => {
        return item.id === id
      })
      const name = (data && data.name) || ''
      return name
    },
    async loadAllSpaces () {
      const { data } = await getAllSpaces()
      this.spaces = data.content
    },
    async loadAdverts () {
      const { data } = await getAdList()
      data.content.forEach((item: any) => {
        item.spaceName = ''
        if (item.spaceId) {
          item.spaceName = this.handlePosition(item.spaceId)
        }
      })
      this.adverts = data.content
    },
    handleClick (row: any) {
      console.log(row)
    }
  }
})
</script>

<style lang="scss" scoped></style>
