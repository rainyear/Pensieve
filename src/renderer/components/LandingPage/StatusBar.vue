<template>
  <el-row>
    <el-col :span="24">
      <p>Folders: {{ folders }} | Images: {{ images }}</p>
      <el-progress
        v-if="false"
        :text-inside="true"
        :stroke-width="26"
        :percentage="process"
      ></el-progress>
    </el-col>
  </el-row>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
export default {
  data() {
    return {
      process: 0
    }
  },
  computed: {
    folders() {
      return this.$store.state.FileStatus.fTree.length
    },
    images() {
      return this.$store.state.FileStatus.images.length
    },
    is_importing() {
      return this.$store.state.FileStatus.importing
    }
  },
  mounted() {
    ipcRenderer.on('imageProcess', (event, p) => {
      this.process = parseInt(p * 100)
    })
  }
}
</script>

<style scoped>
</style>