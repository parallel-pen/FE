<template>
<div class="index">
  <div class="main-title-wrapper" :class="mainTitle.fonts[mainTitle.index]">
    <h1 class="main-title">{{ mainTitle.content }}</h1>
    <h1 class="main-title reverse">{{ mainTitle.content }}</h1>
  </div>
  <p class="sub-title">与<span class="count">{{ userCount }}</span>名用户一起</p>
  <p class="sub-title">探索剧情发展, 创造新的世界线</p>
  <div class="button" @click="handleButtonClick">
    <Button type="ghost" shape="circle" icon="chevron-right" size="large"></Button>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'Index',
  data() {
    return {
      mainTitle: {
        content: '',
        fonts: ['font1', 'font2', 'font3', 'font4'],
        index: 0,
      },
      defaultTitle: 'Parallel Pen',
      userCount: 112,
    };
  },
  computed: {
    ...mapState('user', ['isLogged']),
  },
  mounted() {
    this.input(this.mainTitle.content);
  },
  methods: {
    input() {
      const len = this.defaultTitle.length;
      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          this.mainTitle.content = this.defaultTitle.substring(0, i + 1);
          if (i === len - 1) {
            setTimeout(() => {
              this.del();
            }, 1500);
          }
        }, i * 90);
      }
    },
    del() {
      const len = this.mainTitle.content.length;
      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          this.mainTitle.content = this.mainTitle.content.substring(
            0,
            this.mainTitle.content.length - i,
          );
          if (i === len - 1) {
            this.mainTitle.index = (this.mainTitle.index + 1) % this.mainTitle.fonts.length;
            setTimeout(() => {
              this.input();
            }, 1000);
          }
        }, i * 70);
      }
    },
    handleButtonClick() {
      if (this.isLogged) {
        this.$router.push('/recent')
      } else {
        this.toggleLoginShow();
      }
    },
    ...mapMutations('layout', ['toggleLoginShow'])
  },
};
</script>

<style scoped lang="scss">
.reverse {
  transform: scaleY(-1);
  opacity: 0.2;
}
.index {
  height: 100vh;
  padding-top: 28vh;
  text-align: center;
}
.main-title-wrapper {
  .main-title {
    width: fit-content;
    margin: 0 auto;
    font-size: 4em;
    font-weight: normal;
    height: 1em;
    @media (min-width: 768px) {
      font-size: 5em;
    }
    @media (min-width: 992px) {
      font-size: 6em;
    }
    line-height: 1;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
    animation: cursor 800ms steps(2) infinite;
  }
  margin-bottom: 5vh;
  color: #444444;
  &.font2 {
    font-family: 'Dancing Script', cursive;
  }
  &.font3 {
    font-family: 'Crimson Text', serif;
  }
  &.font1 {
    font-family: 'Roboto', sans-serif;
  }
  &.font4 {
    font-family: 'Gloria Hallelujah', cursive;
  }
}
.sub-title {
  font-size: 1.3em;
  color: #666666;
  line-height: 2;
  .count {
    font-size: 1.5em;
    padding: 0 5px;
  }
}
.button {
  margin-top: 7vh;
}
@keyframes cursor {
  from {
    border-right: 1px solid transparent;
  }
  to {
    border-right: 1px solid black;
  }
}
</style>
