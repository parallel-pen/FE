<template>
<div id="app">
  <Layout>
    <Header>
      <Row>
        <Col
          :xs="12"
          :sm="{ span: 6, offset: 9}"
        >
          <div class="title">Parallel Pen</div>
        </Col>
        <Col
          :xs="12"
          :sm="9"
          :md="6"
          :lg="4"
        >
          <div class="log-button">
            <Button type="text">登陆</Button>
            <Button type="ghost">开始使用</Button>
          </div>
        </Col>
      </Row>
    </Header>
    <Content>
      <Row>
        <Col
          :xs="{ span: 22, offset: 1}"
          :sm="{ span: 16, offset: 4}"
          :md="{ span: 14, offset: 5}"
          :lg="{ span: 12, offset: 6}"
        >
          <router-view/>
        </Col>
      </Row>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
</div>
</template>

<script>
export default {
  name: 'App',
  // components: {
  //   UserMenu,
  // },
  computed: {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
  @media (min-width: 768px) {
    text-align: center;
  }
}

.log-button {
  float: right;
}
</style>
