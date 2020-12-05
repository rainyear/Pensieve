<template>
  <el-tree :data="data"></el-tree>
</template>

<script>
export default {
  computed: {
    data() {
      console.log(this.$store.state.FileStatus.fTree)
      return this.$store.state.FileStatus.fTree
    }
  }
}
</script>