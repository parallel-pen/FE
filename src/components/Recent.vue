<template>
<div class="recent">
  <div class="article-list">
    <Row>
      <Col
        :xs="24"
        :sm="12"
        :md="8"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="article-card" @click="toArticle(article.id)">
          <Card>
            <p slot="title">
              {{ article.title }}
            </p>
            <div slot="extra">
              <span class="date">{{ article.date }}</span>
              <Button type="text" icon="android-share-alt" size="small" @click.stop="share(article.id)"></Button>
            </div>
            <p class="content">
              {{ article.content }}
            </p>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          id: '5afea9521816f7208953ddb0',
          title: '一夜',
          date: '2018-5-5',
          desc: '',
        },
      ],
    };
  },
  methods: {
    toArticle(id) {
      this.$router.push(`article/beta/${id}`);
    },
    share(id) {
      alert(`分享功能即将上线`);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-list {
  max-width: 1000px;
  margin: 0 auto;
  .article-card {
    margin-bottom: 16px;
    padding: 0 8px;
    .content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      /* autoprefixer: on */
      overflow: hidden;
      text-align: justify;
      text-overflow: ellipsis;
    }
  }
}
</style>
