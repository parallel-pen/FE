<template>
<div id="app">
  <Login
    :value="isLoginShow"
    @toggleShow="toggleLoginShow"
    @login="login(true)"
  />
  <Layout>
    <Header ref="header" :style="styles.header">
      <Row>
        <Col :xs="12" :sm="{ span: 6, offset: 9}" >
          <div class="title">Parallel Pen</div>
        </Col>
        <Col :xs="12" :sm="9" :md="6" :lg="4">
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
    <Content ref="content" :style="styles.content">
      <router-view/>
    </Content>
    <Footer ref="footer" :style="styles.footer">
      <p>Copyright © 2018</p>
      <p>CUC DMA.All Rights Reserved</p>
    </Footer>
  </Layout>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Login from '@/components/Login';
export default {
  name: 'App',
  data() {
    return {
      isLoginShow: false,
      isLoged: false,
      styles: {
        header: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          transition: 'top 0.4s ease-in'
        },
        content: {
          margin: '88px 0 0',
          minHeight: '80vh',
        },
        footer: {
          textAlign: 'center',
          lineHeight: 1.8,
        }
      }
      
    };
  },
  mounted() {
    this.updateHeaderHeight();
    this.updateContentTop();
    window.addEventListener('scroll', this.updateContentTop);
  },
  unmounted() {
    window.removeEventListener('scroll', this.updateContentTop);
  },
  components: {
    Login,
  },
  computed: {
    ...mapState('layout', [
      'headerHeight',
      'contentTop',
    ])
  },
  methods: {
    checkLogin() {
      
    },
    autoHeader() {

    },
    updateHeaderHeight() {
      this.commitUpdateHeaderHeight(this.$refs.header.$el.clientHeight);
    },
    updateContentTop() {
      this.updateHeaderHeight();
      const { top } = this.$refs.content.$el.getBoundingClientRect();
      this.commitUpdateContentTop(top);
    },
    toggleLoginShow(isShow) {
      this.isLoginShow = !!isShow;
    },
    login(state) {
      this.isLoged = state;
    },
    ...mapMutations('layout', {
      commitUpdateHeaderHeight: 'updateHeaderHeight',
      commitUpdateContentTop: 'updateContentTop',
    })
  },
  watch: {
    contentTop(oldVal, Val) {
      if (oldVal < Val) {
        this.styles.header.top = `${-this.headerHeight}px`;
      } else {
        this.styles.header.top = 0;
      }
    }
  }
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
  
}
.content {
  padding: 20px 10px;
  min-height: 80vh
}
</style>
