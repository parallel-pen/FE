<template>
<div class="index">
  {{ articles[0] }}
</div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      articles: ['“又到一年穿越季，本时空旅游公司恢复营业，开门见喜，优惠八折！\
        按照我大吃货帝国的悠久传统，一年之计在于吃，民以食为天。所谓吉祥喜气，就是\
        飘溢出来的煎炒烹炸的各种美味香气。我们的唐穿之旅也不例外，特别是很多热爱穿\
        越的妹子都笃信“要征服男人的心，必先征服他的胃”，怀揣各种食谱去猎杀唐朝帅哥的女客真是不要太多哦！\
        不过呢，之前我们已经说过了，唐朝没辣椒，没土豆，没炒锅，没花生，穿越女们要端出一盆水煮鱼或宫保鸡丁\
        是不可能的，就算简单煮个玉米或烤个红薯都做不到。于是很多妹子另辟蹊径，打算用“抹茶蛋糕”“奶油曲奇”“北海道吐司”之类的糕点去惊艳唐朝人。\
        如意算盘打得也很好：焙烘糕点用的原材料不是很简单吗？面粉、油、水、糖、茶末等调味料有啥算啥，马马虎虎凑合一下……\
      '],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  font-size: 1.5em;
  @media (min-width: 768px) { width: 500px; }
  @media (min-width: 992px) { width: 700px; }
  margin: 0 auto;
  line-height: 1.8;
}

</style>
