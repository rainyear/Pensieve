<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <import-library> </import-library>
        </el-main>
        <el-footer>
          <status-bar></status-bar>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import ImportLibrary from './LandingPage/ImportLibrary'
import StatusBar from './LandingPage/StatusBar.vue'
export default {
  name: 'landing-page',
  components: { ImportLibrary, StatusBar },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.row > .side-nav {
  height: 100%;
  background: #888;
}
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
</style>