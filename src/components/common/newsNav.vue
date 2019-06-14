<template>
  <mt-header fixed title class="topNav hh">
    <mt-button class="iconfont" slot="left" @click="goBack()">&#xe669;</mt-button>
    <mt-button class="iconfont" slot="right">&#xe600;</mt-button>
    <mt-button
      class="iconfont"
      slot="right"
      :class="[iscollect?'iconfont icon-shoucang red':'iconfont icon-shoucang']"
      @click="save()"
    ></mt-button>
    <mt-button class="iconfont" slot="right" style="font-size:.34rem" @click="toPinglun">&#xe60e;<span style="font-size:.12rem">{{num.comments}}</span></mt-button>
    <mt-button class="iconfont" slot="right" style="font-size:.34rem">&#xe63b;<span style="font-size:.12rem">{{num.popularity}}</span></mt-button>
  </mt-header>
</template>

<script type="text/ecmascript-6">
import API from '../../common/js/API'
export default {
  components: {},
  props: ['iscollect'],
  data() {
    return {
      selected: "",
      id: window.location.hash.substr(7),
      num:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClose() {},
    more() {},
    toPinglun(id) {
      this.$router.push("/pinglun/" + this.id);
    },
    goBack() {
      this.$router.go(-1);
    },
    //收藏
    save() {
      this.$emit("save");
    }
  },
  mounted() {   
    this.$http({
      url:API.num+this.id,
      method:'get'
    }).then(d=>{
      console.log(d)
      this.num=d.data
    }).catch(err=>{
      console.log(err)
    })
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.topNav 
  background: $primary;
  z-index: 2;

  .mint-button--normal 
    margin-right: 0.4rem;
    font-size: 0.28rem;
  .red
    color yellow  
 
  

</style>
