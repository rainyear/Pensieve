<template>
  <div>
    <h5 class="center-align">这个应该居中对齐</h5>
    <a @click="import_library" class="waves-effect waves-light btn">导入图库</a>
  </div>
</template>
<script>
export default {
  methods: {
    import_library: function (event) {
      this.$db.set('meta.is_empty', false).write()
      setTimeout(() => this.$emit('imported'), 1000)
    }
  }
}
</script>