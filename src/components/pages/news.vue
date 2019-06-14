<template>
  <div class="newsWrap">
    <news-nav :iscollect="iscollect" @save="collection()"></news-nav>
    <div class="swiper-wrapper">
      <img :src="cont.image" alt>
      <p class="h1">{{cont.title}}</p>
    </div>
    <div v-html="cont.body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      cont: "",
      iscollect: false,
      img: "",
      title: "",
      id:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    collection() {
      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];
      //  console.log(arr.some(item=>item.id==this.$route.params.id))
      if (arr.some(item => item.id == this.$route.params.id)) {
        //有当前id的这条信息，删除
        this.iscollect = false;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.$route.params.id) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        // push
        this.iscollect = true;
        arr.push({
          title: this.title,
          images: this.img,
          id: this.$route.params.id
        });
      }

      localStorage.setItem("arr", JSON.stringify(arr));
    }
  },
  mounted() {
    // 进来判断是否收藏
    this.id = this.$route.params.id;
    var arr=localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[];
    if(arr.some(item=>item.id==this.$route.params.id)){
        this.iscollect=true;
    }else{
        this.iscollect=false;
    }
    // 判断结束

    var id = this.$route.params.id;
    this.$http({
      url: API.news + id,
      method: "get"
    })
      .then(d => {
        this.cont = d.data;
      this.title = d.data.title;
      this.img = d.data.images[0];
        console.log(d);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.newsWrap >>> .headline {
  height: 0px;
}

.newsWrap >>> .content {
  margin: 0px 0 20px;
}

.newsWrap >>> .avatar {
  display: inline-block;
}

.swiper-wrapper {
  position: relative;
  width: 100vw;
  height: 3rem;
  padding-top: 0.6rem;

  img {
    width: 100%;
    height: 100%;
  }

  p {
    position: absolute;
    left: 0;
    bottom: 30px;
    padding: 0 $padding;
  }
}
</style>
