<template>
<div id="app">
  <Layout>
    <Header>
      <Menu />
    </Header>
    <Content>
      <router-view/>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
</div>
</template>

<script>
import Menu from '@/components/Menu';
export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
