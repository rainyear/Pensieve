<template>
  <div>
    <el-button
      v-if="is_empty"
      type="primary"
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
const META_IS_EMPTY_FLAG = 'meta.is_empty'
export default {
  data() {
    return {
      is_empty: this.$db.get(META_IS_EMPTY_FLAG).value() !== undefined
    }
  },
  methods: {
    import_library: function (event) {
      /*
      this.$db.set(META_IS_EMPTY_FLAG, false).write()
      setTimeout(() => {
        this.is_empty = false
        this.$emit('imported')
      }, 1000)
      */
      ipcRenderer.send('selectFolder', 'ok')
    },
    clear_library: function (event) {
      this.$db.unset(META_IS_EMPTY_FLAG).write()
      this.is_empty = true
    }
  }
}
</script>