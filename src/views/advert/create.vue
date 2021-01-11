<template>
  <div class="advert-create">
    <create-or-update></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'AdvertCreate',
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped></style>
