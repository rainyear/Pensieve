<template>
  <p>Folders: {{ folders }} | Images: {{ images }}</p>
</template>

<script>
export default {
  computed: {
    folders() {
      return this.$store.state.FileStatus.fTree.length
    },
    images() {
      return this.$store.state.FileStatus.images.length
    }
  }
}
</script>

<style scoped>
</style>