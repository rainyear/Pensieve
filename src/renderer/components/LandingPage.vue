<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <side-nav-column></side-nav-column>
      </el-aside>
      <el-container>
        <el-main>
          <image-window></image-window>
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
import ImageWindow from './LandingPage/ImageWindow.vue'
import ImportLibrary from './LandingPage/ImportLibrary'
import SideNavColumn from './LandingPage/SideNavColumn.vue'
import StatusBar from './LandingPage/StatusBar.vue'

export default {
  name: 'landing-page',
  components: { ImportLibrary, StatusBar, SideNavColumn, ImageWindow }
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