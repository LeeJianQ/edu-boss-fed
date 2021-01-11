<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<!-- <script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      a: 1,
      b: '2',
      c: [],
      d: {
        a: 1,
        b: '2'
      }
    }
  },

  methods: {
    test () {
      this.a.abc()
    }
  }
})
</script>-->
<!-- <script>
// export default {
//   data () {
//     return {
//       a: 1,
//       b: '2',
//       c: [],
//       d: {
//         a: 1,
//         b: '2'
//       }
//     }
//   },

//   methods: {
//     test () {
//       this.a.abc()
//     }
//   }
// }
// </script> -->

<style lang="scss" scoped>
p {
  color: $success-color;
}
</style>
