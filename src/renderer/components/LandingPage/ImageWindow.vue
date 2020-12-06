<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="image in images" :key="image.idx">
      <el-card :body-style="{ padding: '0px', margin: '0px' }" shadow="hover">
        <el-image
          style="height: 200px"
          :src="image.path"
          fit="scale-down"
        ></el-image>
        <div style="padding: 4px">
          <span>{{ shortName(image.info.name) }}</span>
          <div class="bottom clearfix">
            <time class="time"></time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    images() {
      return this.$store.state.FileStatus.currentImages
    }
  },
  methods: {
    shortName(name) {
      return name.length > 20 ? name.substr(0, 17) + '...' : name
    }
  }
}
</script>