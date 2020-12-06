<template>
  <div>
    <el-button
      v-if="is_empty"
      type="primary"
      :disabled="is_importing"
      @click="import_library"
      class="waves-effect waves-light btn"
      >打开目录</el-button
    >
    <el-button v-else type="danger" @click="clear_library">清空图库</el-button>
  </div>
</template>
<script>
import {
  ipcRenderer
} from 'electron'

export default {
  data() {
    return {

    }
  },
  computed: {
    is_empty() {
      return this.$store.state.FileStatus.fTree.length === 0
    },
    is_importing() {
      return this.$store.state.FileStatus.importing
    }
  },
  methods: {
    import_library: function (event) {
      ipcRenderer.send('selectFolder', 'ok')
      this.$store.commit('UPDATE_IMPORTING', true)
    },
    clear_library: function (event) {
      ipcRenderer.send('clearFolder', 'clear')
      this.$db.unset('FTREE').write()
      this.$db.unset('IMAGES').write()
      this.$store.commit('CLEAR')
    }
  },
  mounted() {
    ipcRenderer.on('folderSelected', (event, arg) => {
      const DT = [arg[0]]
      const Images = arg[1]
      this.$db.set('FTREE', DT).write()
      this.$db.set('IMAGES', Images).write()

      this.$store.commit('UPDATE_FTREE', DT)
      this.$store.commit('UPDATE_IMAGES', Images)
    })
  }
}
</script>