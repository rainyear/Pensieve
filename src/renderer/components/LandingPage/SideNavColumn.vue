<template>
  <el-tree :data="data" @node-click="handleClicked"></el-tree>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.FileStatus.fTree
    }
  },
  methods: {
    handleClicked(data) {
      console.log(data.path)
      this.$store.commit('SELECT_FOLDER', data.path)
    }
  }
}
</script>