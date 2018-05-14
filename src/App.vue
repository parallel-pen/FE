<template>
<div id="app">
  <Login
    :value="isLoginShow"
    @toggleShow="toggleLoginShow"
    @login="login(true)"
  />
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
          <div v-if="isLoged" class="log-button">
            <Button type="text" @click="login(false)">
              退出登录
            </Button>
          </div>
          <div v-else class="log-button">
            <Button type="ghost" @click="toggleLoginShow(true)">
              登录 / 注册
            </Button>
          </div>
        </Col>
      </Row>
    </Header>
    <Content>
      <!-- <Row>
        <Col :span="22" :offset="1"> -->
          <div class="content">
            <router-view/>
          </div>
        <!-- </Col>
      </Row> -->
    </Content>
    <Footer>
      <div class="footer">
        <p>Copyright © 2018</p>
        <p>CUC DMA.All Rights Reserved</p>
      </div>
    </Footer>
  </Layout>
</div>
</template>

<script>
import Login from '@/components/Login';
export default {
  name: 'App',
  data() {
    return {
      isLoginShow: false,
      isLoged: false,
    };
  },
  components: {
    Login,
  },
  computed: {

  },
  methods: {
    toggleLoginShow(isShow) {
      this.isLoginShow = !!isShow;
    },
    login(state) {
      this.isLoged = state;
    }
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.title {
  font-size: 1.5em;
  // font-weight: bold;
  @media (min-width: 768px) {
    text-align: center;
  }
}

.log-button {
  float: right;
}

.footer {
  text-align: center;
  line-height: 1.8;
}
.content {
  padding: 20px 10px;
  min-height: 80vh
}
</style>
