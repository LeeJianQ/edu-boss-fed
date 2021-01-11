<template>
  <div class="menu-edit">
    <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuEdit',
  components: {
    createOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
