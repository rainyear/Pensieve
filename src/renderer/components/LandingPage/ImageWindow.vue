<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="image in images" :key="image.idx">
      <el-image
        style="width: 100px; height: 100px"
        :src="image.path"
        fit="scale-down"
      ></el-image>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    images() {
      return this.$store.state.FileStatus.images
    }
  }
}
</script>