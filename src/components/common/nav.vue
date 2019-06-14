<template>
  <mt-header fixed title="" class="topNav hh">
    <router-link to="/" slot="left">
      <mt-button class="iconfont" @click='showNav()' >&#xe62f;</mt-button>
      <span>{{headerline}}</span>
    </router-link>
    <mt-button class="iconfont" slot="right">&#xe623;</mt-button>
    <mt-button class="iconfont" slot="right">&#xe64c;</mt-button>
  </mt-header>
</template>

<script type="text/ecmascript-6">

export default {
  components: {},
  props: ['headerline'],
  data() {
    return {
      selected: "",
      
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClose() {},
    more() {},
    showNav(){
      this.$emit('aa')
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.topNav 
  background: $primary;
  z-index: 2;
  .mint-button--normal
    margin-right .4rem
    &:last-child
      margin-right -.1rem

</style>
