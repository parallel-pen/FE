<template>
<div class="article-container">
  {{ article }}
</div>
</template>

<script>
export default {
  data() {
    return {
      article: 'aaa',
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  font-size: 1.5em;
  @media (min-width: 768px) { width: 500px; }
  @media (min-width: 992px) { width: 700px; }
  margin: 0 auto;
  line-height: 1.8;
}
</style>
