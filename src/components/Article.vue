<template>
<div class="article-container">
  <div class="controller" :style="styles.controller">
    <Button type="ghost" shape="circle" size="large" icon="ios-heart-outline" class="side-button"></Button>
  </div>
  <div class="node-content" v-html="node.content"></div>
  <div class="node-info">
    <p>{{ node.author }}</p>
    <p>{{ node.timestamp }}</p>
  </div>
  <Input v-if="editing" v-model="newNode.content" type="textarea" autosize></Input>
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
      editing: false,
      node: {
        content: 'Loading',
        author: '',
        timestamp: '',
      },
      newNode: {
        content: ''
      },
      styles: {
        controller: {
          position: 'fixed',
          top: '250px',
        }
      }
    }
  },
  computed: {
    ...mapState('layout', ['contentTop']),
  },
  mounted() {
    this.getNode(this.$route.params.node);
  },
  methods: {
    getNode(nodeId) {
      node.getNode(nodeId)
        .then(res => {
          if (res.data.code === 100000) {
            console.log(res.data)
            this.node.content = marked(res.data.content);
            this.node.author = res.data.author;
            this.node.timestamp = dayjs(res.data.timestamp);
          }
        })
        .catch(err => {
          console.log(err);
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
$sm: 500px;
$md: 600px;
.article-container {
  @media (min-width: 768px) { width: $sm; }
  @media (min-width: 992px) { width: $md; }
  margin: 0 auto;
  // position: relative;
  // .node-id {
  //   position: sticky;
  //   top: 0;
  //   background-color: #f7f7f7;
  //   padding: 1em 0;
  //   text-align: center;
  //   font-size: 1em;
  //   letter-spacing: 0.6em;
  //   @media (min-width: 768px) {
  //     letter-spacing: 1em;
  //     font-size: 1.2em;
  //   }
  // }
  .controller {
    left: 50%;
    @media (min-width: 768px) { margin-left: -$sm / 2 - 100px; }
    @media (min-width: 992px) { margin-left: -$md / 2 - 100px; }
    .side-button {
      padding: 0;
      line-height: 50px;
      width: 50px;
      height: 50px;
      font-size: 20px;
      text-align: center;
      /deep/ i {
      }
    }
  }
  .node-content {
    /deep/ h1,h2,h3,h4,h5 {
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
}
</style>
