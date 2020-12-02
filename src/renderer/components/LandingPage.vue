<template>
  <div class="row">
    <div class="col s3 side-nav">
      <!-- Side Nav -->
      <div class="valign-wrapper">
        <h5 class="valign">这个应该垂直居中对齐</h5>
      </div>
    </div>

    <div class="col s9 main-window">
      <!-- Main window  -->
      <import-library v-if="is_empty" v-on:imported="is_empty = false">
      </import-library>
      <a @click="clear_library" class="waves-effect waves-light btn red"
        >清空图库</a
      >
    </div>
  </div>
</template>
<script>
import ImportLibrary from './LandingPage/ImportLibrary'
export default {
  name: 'landing-page',
  components: { ImportLibrary },
  data() {
    return {
      is_empty: !this.$db.read().has('meta.is_empty').value()
    }
  },
  methods: {
    clear_library: function () {
      this.$db.unset('meta.is_empty').write()
      this.is_empty = true
    }
  }
}
</script>

<style scoped>
.row > .side-nav {
  height: 100%;
  background: #333;
}
</style>