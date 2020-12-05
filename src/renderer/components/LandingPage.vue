<template>
  <el-container :style="style">
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
  components: { ImportLibrary, StatusBar, SideNavColumn, ImageWindow },
  data() {
    return {
      winHeight: window.innerHeight
    }
  },
  computed: {
    style() {
      return `height: ${this.winHeight}px`
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.winHeight = window.innerHeight
    })
  }
}
</script>
