<template>
<div class="recent">
  <div class="article-list">
    <Row :gutter="16">
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
          id: 1,
          title: '一夜',
          date: '2018.5.5',
          content: '“请朋友同僚吃饭可以在自己家里开宴，皇帝却不是能轻易请得动的。最稳妥的办法还是把一席山珍海味送进宫里去，由皇帝自己做主，爱吃的吃两口，不爱吃的分赏别人完事。这种“往皇宫里送美食”的行动就叫“上烧尾”啦。既然是送给皇帝吃的，那当然要聚集当世最豪华奢侈抽风烧包的各类美食，数量庞大，气势惊人，所以“食账”（菜谱）就必不可少。当所有美食按账目逐一烹制完成、摆放装置妥当，“食账”本身也要抄写在一卷精美贵重的纸帛上，用金玉锦缎装裱好，跟着食物一起送进宫里去以备查验。”'
        },
        {
          id: 2,
          title: '测试文章',
          date: '2018.5.4',
          content: '请朋友同僚吃饭可以在自己家里开宴，皇帝却不是能轻易请得动的。最稳妥的办法还是把一席山珍海味送进宫里去，由皇帝自己做主，爱吃的吃两口，不爱吃的分赏别人完事。'
        },
        {
          id: 3,
          title: '测试文章',
          date: '2018.5.3',
          content: '请朋友同僚吃饭可以在自己家里开宴，皇帝却不是能轻易请得动的。那当然要聚集当世最豪华奢侈抽风烧包的各类美食，数量庞大，气势惊人，所以“食账”（菜谱）就必不可少。当所有美食按账目逐一烹制完成、摆放装置妥当，“食账”本身也要抄写在一卷精美贵重的纸帛上，用金玉锦缎装裱好，跟着食物一起送进宫里去以备查验。”'
        },
        {
          id: 4,
          title: '测试文章',
          date: '2018.5.2',
          content: '请朋友同僚吃饭可以在自己家里开宴，皇帝却不是能轻易请得动的。那当然要聚集当世最豪华奢侈抽风烧包的各类美食，数量庞大，气势惊人，所以“食账”（菜谱）就必不可少。当所有美食按账目逐一烹制完成、摆放装置妥当，“食账”本身也要抄写在一卷精美贵重的纸帛上，用金玉锦缎装裱好，跟着食物一起送进宫里去以备查验。”'
        }
      ],
    }
  },
  methods: {
    toArticle(id) {
      this.$router.push(`article/${id}/1`);
    },
    share(id) {
      alert(`分享${id}成功`);
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  max-width: 1000px;
  margin: 0 auto;
  .article-card {
    margin-bottom: 16px;
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
