<template>
  <div class="advert-edit">
    <create-or-update is-edit :id="id"></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'AdvertEdit',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped></style>
