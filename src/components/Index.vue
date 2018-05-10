<template>
<div class="index">
  {{ articles[0] }}
</div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      articles: ['test'],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
