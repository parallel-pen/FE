<template>
<div class="article-container">
  <div
    :class="['controller', { hide: hideController }]"
    :style="styles.controller"
  >
    <Button
      type="ghost"
      shape="circle"
      size="large"
      icon="ios-heart-outline"
      class="button large-button"
      disabled
    ></Button>
    <Button
      type="ghost"
      shape="circle"
      size="default"
      icon="android-share-alt"
      class="button small-button"
      disabled
    ></Button>
    <Button
      type="ghost"
      shape="circle"
      size="default"
      icon="arrow-left-c"
      class="button small-button"
      title="返回上一节点"
      :disabled="!node.fatherId"
      @click="$router.push(`/article/beta/${node.fatherId}`)"
    ></Button>
  </div>
  <div class="node-content" v-html="node.content"></div>
  <div class="node-info">
    <p>{{ node.author }}</p>
    <p>{{ node.timestamp }}</p>
  </div>
  <div v-if="!editing" class="node-children">
    <h1 class="center title">分支选择</h1>
    <p v-if="!node.childNodes.length" class="center">暂无分支, 快创建吧</p>
    <template v-for="child in childNodesPage">
      <p class="node-child" @click="$router.push(`/article/beta/${child.nodeId}`)">{{ child.desc }}</p>
    </template>
    <Page
      class-name="page center"
      v-if="node.childNodes.length > page.pageSize"
      :current.sync="page.current"
      :total="node.childNodes.length"
      :page-size="page.pageSize"
      size="small"
    >
    </Page>
    <Button
      type="ghost"
      shape="circle"
      size="large"
      icon="plus-round"
      class="create-button"
      @click="editing = true"
    ></Button>
    <p class="center">立即创建新分支</p>
  </div>
  <div v-else class="node-create">
    <h1 class="center title">创建新分支</h1>
    <Input v-if="editing" v-model="newNode.content" type="textarea" autosize></Input>
    <div class="buttons">
      <Button
        type="ghost"
        shape="circle"
        size="large"
        icon="arrow-left-c"
        class="button"
        @click="editing = false"
      ></Button>
      <Button
        type="ghost"
        shape="circle"
        size="large"
        icon="checkmark-round"
        class="button"
        @click="submitNewNode"
      ></Button>
    </div>
  </div>
</div>
</template>

<script>
import marked from 'marked';
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import node from '@/api/node';
export default {
  data() {
    return {
      hideController: false,
      editing: false,
      node: {
        fatherId: '',
        content: 'Loading',
        author: '',
        timestamp: '',
        childNodes: [],
      },
      newNode: {
        desc: '',
        content: '',
      },
      page: {
        current: 1,
        pageSize: 5,
      },
      styles: {
        controller: {
          position: 'fixed',
          top: '250px',
        },
      },
    };
  },
  computed: {
    childNodesPage() {
      const start = (this.page.current - 1) * this.page.pageSize;
      return this.node.childNodes.slice(start, start + this.page.pageSize);
    },
    ...mapState('layout', ['contentTop']),
  },
  mounted() {
    this.getNode(this.$route.params.node);
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'Article') {
      this.getNode(to.params.node);
      this.page.current = 1;
    }
    next();
  },
  methods: {
    getNode(nodeId, first) {
      node
        .getNode({ nodeId, first })
        .then(res => {
          if (res.data.code === 100000) {
            this.node.fatherId = res.data.fatherId || '';
            this.node.content = marked(res.data.content);
            this.node.author = res.data.author || '';
            this.node.timestamp = dayjs(res.data.timestamp).format('YYYY-M-D H:m');
            this.node.childNodes = res.data.childNodes || [];
          } else {
            this.$Message.error({
              content: node.err(res.data.code),
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createNode({ fatherId, content, desc }) {
      node
        .createNode({ fatherId, content, desc })
        .then(res => {
          if (res.data.code === 100000) {
            this.$Message.success({
              content: '提交成功, 即将自动跳转',
            });
            setTimeout(() => {
              this.$router.push(`/article/beta/${res.data.nodeId}`);
            }, 3000);
          }
        })
        .catch(err => {});
    },
    submitNewNode() {

    }
  },
  watch: {
    contentTop(oldVal, val) {
      const style = this.styles.controller;
      if (val < 0) {
        style.position = 'fixed';
        style.top = '162px';
      } else {
        style.position = 'absolute';
        style.top = '250px';
      }
      this.hideController = oldVal < val;
    },
  },
};
</script>

<style lang="scss" scoped>
$sm: 500px;
$md: 600px;
$btn-c: #333333;
.article-container {
  @media (min-width: 768px) {
    width: $sm;
  }
  @media (min-width: 992px) {
    width: $md;
  }
  margin: 0 auto;
  .controller {
    z-index: 999;
    left: 50%;
    $offset: 120px;
    @media (min-width: 768px) {
      margin-left: -$sm / 2 - $offset;
    }
    @media (min-width: 992px) {
      margin-left: -$md / 2 - $offset;
    }
    @media (max-width: 768px) {
      position: fixed !important;
      left: 20px;
      bottom: 20px;
      top: initial !important;
      transition: left 350ms ease-out;
      &.hide {
        left: -60px;
      }
    }
    .large-button {
      line-height: 50px;
      font-size: 23px;
    }
    .button {
      display: block;
      margin: 20px auto;
      &:not([disabled='disabled']) {
        background-color: #fff;
        color: $btn-c;
      }
    }
  }
  .node-content {
    /deep/ h1,
    h2,
    h3,
    h4,
    h5 {
      padding: 20px 0;
    }
    /deep/ p {
      word-break: break-word;
      line-height: 1.7;
      font-size: 16px;
      -webkit-margin-before: 1em;
      -webkit-margin-after: 1em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
    }
  }
  .node-info {
    text-align: right;
    margin-top: 40px;
    font-size: 1.2em;
    font-style: italic;
    color: #999999;
    line-height: 1.7;
  }
  .node-children {
    line-height: 1.7;
    padding: 40px 20px;
    .title {
      padding: 20px 0;
    }
    .node-child {
      margin: 1em 0;
      font-size: 18px;
      cursor: pointer;
    }
    .page {
      /deep/ .ivu-page-item-active {
        background-color: #666666;
      }
    }
    .create-button {
      display: block;
      margin: 40px auto 20px;
      color: $btn-c;
    }
  }
  .center {
    text-align: center;
  }
  .node-create {
    padding: 20px 0;
    .title {
      padding: 20px 0;
    }
    .buttons {
      display: flex;
      .button {
        flex: 0 0 1;
        display: block;
        margin: 0 auto;
        color: $btn-c;
      }
    }
  }
}
</style>
