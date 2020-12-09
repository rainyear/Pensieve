<template>
  <el-row :gutter="20" v-if="is_group_view">
    <el-col :span="6" v-for="(image, idx) in images" :key="image.idx">
      <el-card :body-style="{ padding: '0px', margin: '0px' }" shadow="hover">
        <el-image
          style="height: 200px"
          :src="fixMacOS(image.info.thumb_path)"
          fit="scale-down"
          v-on:dblclick="viewImage(idx)"
        ></el-image>
        <div style="padding: 4px">
          <span>{{ shortName(image.info.name) }}</span>
          <div class="bottom clearfix">
            <time class="time"
              >{{ image.info.width }} x {{ image.info.height }}</time
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-container v-else>
    <el-image v-bind:src="fixMacOS(selected_image.path)"></el-image>
    <image-info :image="selected_image"></image-info>
  </el-container>
</template>

<script>
import ImageInfo from './ImageInfo'
export default {
  components: { ImageInfo },
  data() {
    return {
      selected_image: ''
    }
  },
  computed: {
    is_group_view() {
      return this.$store.state.FileStatus.groupView
    },
    images() {
      const images = this.$store.state.FileStatus.currentImages
      return images
    }
  },
  methods: {
    viewImage(idx) {
      this.selected_image = this.$store.state.FileStatus.currentImages[idx]
      this.$store.commit('SET_IMAGEVIEW', false)
    },
    shortName(name) {
      return name.length > 20 ? name.substr(0, 17) + '...' : name
    },
    fixMacOS(src) {
      return `file:${src}`
    }
  }
}
</script>