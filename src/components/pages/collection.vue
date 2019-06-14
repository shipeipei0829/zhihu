<template>
  <div calss="swaper" style>
    <!-- 主页 -->
    <div class="collection" @touchstart="start($event)" @touchmove="move($event)" @touchend="end()">
      <mt-header fixed title class="topNav hh">
        <div slot="left">
          <mt-button class="iconfont" @click.stop="showNav()">&#xe62f;</mt-button>
          <mt-button>{{obj.length}}条收藏</mt-button>
        </div>
      </mt-header>
      <ul>
        <li v-for="item in obj" :key="item.id">
          <span class="h2" @click="toNews(item.id)">{{item.title}}</span>
          <img :src="item.images" alt>
        </li>
      </ul>
      <!-- <ul>
      <li>
        <span class="h2">小事 · 小事积累起来，就是我们全部的生活啊</span>
        <img src="https://pic2.zhimg.com/v2-9969dc3cec992d4b2a302eab9234fa01.jpg" alt>
      </li>
      </ul>-->
    </div>
    <!-- 遮罩 -->
    <v-mask :classn="classN" @hide="hide()" @router='toPage($event)'></v-mask>
  </div>
</template>

<script type="text/ecmascript-6">
import vMask from "../views/mask";
export default {
  components: {
    vMask
  },
  props: [],
  data() {
    return {
      obj: [],
      classN: "mask"
    };
  },
  watch: {},
  computed: {},
  methods: {
    toPage(page) {
      this.classN = "mask";
      this.$router.push(page);
    },
    toNews(id) {
      this.$router.push("/news/" + id);
    },
    showNav() {
      this.classN = "mask show";
    },
    start(e) {
      console.log(e);
      this.startX = e.touches[0].clientX;
      this.endX = 0;
    },
    move(e) {
      this.endX = e.touches[0].clientX;
    },
    end() {
      if (this.endX != 0) {
        if (this.endX > this.startX + 20) {
          this.classN = "mask show";
        }
      }
    },
    hide() {
      this.classN = "mask";
    },
    goIndex() {
      this.classN = "mask";
    },
    toCollect() {
      this.$router.push("/collection");
    }
  },
  mounted() {
    this.obj = JSON.parse(localStorage.getItem("arr"));
    console.log(this.obj);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.collection {
  padding-top: 0.6rem;
  width: 100vw;
  // height: 100vh;
  background: $hui;

  ul {
    width: 100vw;
    padding-left: 0;

    li {
      display: flex;
      margin: $padding;
      box-sizing: border-box;
      height: 1.1rem;
      line-height: 1.1rem;
      background: $write;
      overflow: hidden;

      span {
        display: inline-block;
        width: 80%;
        height: 1.1rem;
        line-height: 0.55rem;
        padding-left: $padding;
        box-sizing: border-box;
        padding-right: 0.26rem;
      }

      img {
        flex: 1;
        width: 1rem;
        height: 0.9rem;
        padding-top: 0.1rem;
        padding-right: 0.1rem;
      }
    }
  }
}

// 遮罩页面
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: -100%;
  top: 0px;
  transition: left 0.4s;
  z-index: 4;

  .popup {
    width: 80%;
    height: 100%;
    box-sizing: border-box;
    background: $write;
    color: $write;

    .userPic {
      height: 1.2rem;
      line-height: 1.2rem;
      background: $primary;
      padding-left: $padding;
      padding-right: $padding;

      img {
        width: 0.6rem;
        height: 0.6rem;
        background: $write;
        border-radius: 50%;
        overflow: hidden;
      }

      b {
        font-weight: normal;
        font-size: 0.14rem;
      }
    }

    .userApi {
      height: 0.8rem;
      line-height: 0.8rem;
      background: $primary;
      display: flex;
      justify-content: space-between;
      padding-left: $padding;
      padding-right: $padding;
    }

    .home {
      padding-left: $padding;
      padding-right: $padding;
      display: block;
      height: 0.8rem;
      line-height: 0.8rem;
      background: $hui;
      color: $primary;
    }
  }
}

.show {
  left: 0px;
}
</style>
