<template>
  <div class="wrapper">
    <div :class="classn" @touchstart.self="hide()">
      <div class="popup">
        <div class="userPic">
          <img src>
          <b>用户名</b>
        </div>
        <div class="userApi clearfix">
          <div
            class="iconfont"
            style="float:left"
            @click.self="toCollect()"
          >&#xe602;&nbsp;&nbsp;我的收藏</div>
          <div class="iconfont" style="float:left">&#xe63a;&nbsp;&nbsp;离线下载</div>
        </div>
        <span class="iconfont home" @click.prevent="goIndex()">&#xe639;&nbsp;&nbsp;首页</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: ["classn"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    hide() {
      this.$emit("hide");
    },
    toCollect() {
        this.$emit('router','/collection')
    },
    goIndex() {
        this.$emit('router','/index')
    },
  },
  mounted() {
      
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  left: -100%;
  top: 0px;
  transition: left 0.4s;
  z-index: 3;

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
