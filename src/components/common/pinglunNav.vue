<template>
  <mt-header fixed title class="topNav hh">
    <mt-button class="iconfont" slot="left" @click="goBack()">&#xe669;</mt-button>
    <mt-button slot="left">{{long.length+short.length}}条评论</mt-button>
    <mt-button class="iconfont" slot="right" style="font-size:.34rem">&#xe619;</mt-button>
  </mt-header>
</template>

<script type="text/ecmascript-6">

export default { 
  components: {},
  props: [
    'long','short'
  ],
  data() {
    return {
      
    };
  },
  watch: {},
  computed: {},
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
  mounted() {
      
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.topNav 
  background: $primary;
  z-index: 2;
  .mint-header-button 
    .mint-button--normal 
      margin-right: 0.4rem;
      font-size: 0.28rem;
    
</style>
