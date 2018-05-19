<template>
<div id="app">
  <Login></Login>
  <Layout>
    <Header ref="header" :style="styles.header">
      <Row>
        <Col :xs="9" :sm="{ span: 6, offset: 9}" >
          <div class="title" @click="$router.push('/')">Parallel Pen</div>
        </Col>
        <Col :xs="15" :sm="9" :md="6" :lg="4">
          <div v-if="isLogged" class="log-button">
            <Dropdown placement="bottom-end" @on-click="handleDropdownClick">
              <div>
                <span class="account">{{ account }}</span>
                <Icon type="arrow-down-b"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="user">个人中心</DropdownItem>
                <DropdownItem divided name="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      styles: {
        header: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          transition: 'top 350ms ease-out',
          zIndex: 999,
        },
        content: {
          margin: '88px 0 0',
          padding: '0 20px',
          minHeight: '80vh',
        },
        footer: {
          textAlign: 'center',
          lineHeight: 1.8,
        },
      },
    };
  },
  created() {
    this.checkUser();
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
    ...mapState('layout', ['isLoginShow', 'headerHeight', 'contentTop']),
    ...mapState('user', ['isLogged', 'account']),
  },
  methods: {
    handleDropdownClick(name) {
      switch (name) {
        case 'user':
          this.$router.push('/recent');
          break;
        case 'logout':
          this.logoutUser();
          break;
        default:
          break;
      }
    },
    updateHeaderHeight() {
      this.commitUpdateHeaderHeight(this.$refs.header.$el.clientHeight);
    },
    updateContentTop() {
      this.updateHeaderHeight();
      const { top } = this.$refs.content.$el.getBoundingClientRect();
      this.commitUpdateContentTop(top);
    },
    ...mapMutations('layout', {
      toggleLoginShow: 'toggleLoginShow',
      commitUpdateHeaderHeight: 'updateHeaderHeight',
      commitUpdateContentTop: 'updateContentTop',
    }),
    ...mapMutations('user', {
      checkUser: 'check',
      logoutUser: 'logout',
    }),
  },
  watch: {
    contentTop(oldVal, val) {
      this.styles.header.top = oldVal < val ? `${-this.headerHeight}px` : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.title {
  font-family: 'Crimson Text', serif;
  cursor: pointer;
  font-size: 2em;
  @media (min-width: 768px) {
    text-align: center;
  }
}

.log-button {
  float: right;
  cursor: pointer;
}

.account {
  margin-right: 10px;
}
</style>
