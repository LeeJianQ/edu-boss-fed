<template>
  <div class="advert-space">
    <el-card>
      <div slot="header">
        <el-button @click="$router.push({name: 'ad-space-create'})">添加广告位</el-button>
      </div>
      <el-table
        :data="spaces"
        border
        style="width: 100%">
        <el-table-column
          class-name="is-center"
          prop="spaceKey"
          label="spaceKey"
          width="180">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="name"
          label="广告位名称"
          width="180">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          class-name="is-center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push({
                name: 'ad-space-edit',
                params: {
                  id: scope.row.id
                }
              })"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert'
import moment from 'moment'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      spaces: []
    }
  },
  created () {
    this.loadSpaces()
  },
  methods: {
    async loadSpaces () {
      const { data } = await getAllSpaces()
      data.content.forEach((item: any) => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.spaces = data.content
    }
  }
})
</script>

<style lang="scss" scoped></style>
