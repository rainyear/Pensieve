<template>
    <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">卡片标题</span>
              <p>我是一个很简单的卡片。我很擅长于包含少量的信息。我很方便，因为我只需要一个小标记就可以有效地使用。</p>
            </div>
            <div class="card-action">
              <a href="#">这是一个链接</a>
              <a href="#">这是一个链接</a>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.name,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        dbversion: this.$db.get('version').value()
      }
    }
  }
</script>