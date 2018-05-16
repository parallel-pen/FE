<template>
<div class="article-container">
  <div class="controller"></div>
  <p class="node-id">{{ node.id }}</p>
  <div class="node-content" v-html="convert(node.content)"></div>
</div>
</template>

<script>
import marked from 'marked';
export default {
  data() {
    return {
      node: {
        content:'# 节点标题\n\n同僚吃饭可以在自己家里开宴，皇帝却不是能轻易请得动的。最稳妥的办法还是把一席山珍海味送进宫里去，由皇帝自己做主，爱吃的吃两口，不爱吃的分赏别人完事。这种“往皇宫里送美食”的行动就叫“上烧尾”啦。\n\n\
既然是送给皇帝吃的，那当然要聚集当世最豪华奢侈抽风烧包的各类美食，数量庞大，气势惊人，所以“食账”（菜谱）就必不可少。当所有美食按账目逐一烹制完成、摆放装置妥当，“食账”本身也要抄写在一卷精美贵重的纸帛上，用金玉锦缎装裱好，跟着食物一起送进宫里去以备查验。\n\n\
现在呈递给您过目的“食账”，只是一份草稿，写在几张零散的麻纸上。您一页页翻看，没看多久就头晕眼花了：\n\n\
“……单笼金乳酥 曼陀样夹饼 巨胜奴 贵妃红 婆罗门轻高面 御黄王母饭。“既然是大官的府第，一般都会有很大的厨房。如果院子足够宽阔，设计又比较合理，那么厨房会跟仓库、磨碓棚、柴草堆、鸡鸭鹅猪圈……这些功能相近的部分组成一个单独的区域。\n\n\
厨房本身也会是一组既高大又宽敞的建筑，房梁上吊着风鸡熏肉，墙角屋檐下放着醋瓮酱缸，若干厨婢庖丁站在高脚桌案后洗剥切剁，几个大规模的炉灶口呼呼地往外喷着火焰……\n\n\
娘子您可别站得太近了，您当这是穿越前家里的天然气灶、煤气灶、蜂窝煤炉子？这些快有一人高的大灶都是烧柴草的，很不好对付，一个控制不好，炉膛里的火苗就从烧火风门口喷出来溅您一身火星，身上的绫罗绸缎可就全毁了。再来个不注意，没及时添柴，灶里的火悄没声又灭了，正烹制的食物一下子玩完。所以富贵人家厨房里往往会”',
        id: '124958726354758910291295',
      }
    }
  },
  methods: {
    convert(str) {
      return marked(str);
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
