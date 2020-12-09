<template>
  <el-aside width="150px">
    <el-divider content-position="left">图片信息</el-divider>
    <el-row>
      <el-col :span="12">图片尺寸</el-col>
      <el-col :span="12"
        >{{ image.info.width }} x {{ image.info.height }}</el-col
      >
    </el-row>
  </el-aside>
</template>

<script>
export default {
  props: ['image']
}
</script>