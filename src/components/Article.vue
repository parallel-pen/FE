<template>
<div class="article-container">
  <div class="controller">

  </div>
  <!-- <p class="node-id">{{ node.id }}</p> -->
  <div class="node-content" v-html="node.content"></div>
  <Input v-model="newNode.content" type="textarea" autosize></Input>
</div>
</template>

<script>
import marked from 'marked';
import node from '@/api/node';
export default {
  data() {
    return {
      node: {
        content: 'Loading',
      },
      newNode: {
        content: ''
      },
    }
  },
  mounted() {
    this.getNode(this.$route.params.node);
  },
  methods: {
    getNode(nodeId) {
      node.getNode(nodeId)
        .then(res => {
          if (res.data.code === 100000) {
            this.node.content = marked(res.data.content);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  @media (min-width: 768px) { width: 500px; }
  @media (min-width: 992px) { width: 700px; }
  margin: 0 auto;
  .node-id {
    position: sticky;
    top: 0;
    background-color: #f7f7f7;
    padding: 1em 0;
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.6em;
    @media (min-width: 768px) {
      letter-spacing: 1em;
      font-size: 1.2em;
    }
    
  }
  .node-content {
    font-size: 1.5em;
    line-height: 1.8;
    /deep/ h1,h2,h3,h4,h5 {
    padding: 20px 0;
    text-align: center;
    }
    /deep/ p {
      margin-bottom: 30px;
      text-indent: 2em;
    }
  }
}
</style>
