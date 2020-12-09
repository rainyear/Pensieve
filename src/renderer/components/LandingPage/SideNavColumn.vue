<template>
  <div>
    <el-tree :data="data" @node-click="handleClicked"></el-tree>
    <el-button type="danger" v-if="!is_empty" @click="clear_library"
      >清空图库</el-button
    >
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.FileStatus.fTree
    },
    is_empty() {
      return this.$store.state.FileStatus.fTree.length === 0
    }
  },
  methods: {
    clear_library: function (event) {
      this.$db.unset('FTREE').write()
      this.$db.unset('IMAGES').write()
      this.$store.commit('CLEAR')
    },
    handleClicked(data) {
      console.log(data.path)
      this.$store.commit('SELECT_FOLDER', data.path)
    }
  }
}
</script>