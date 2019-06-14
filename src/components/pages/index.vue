<template>
  <div class="wraper">
    <div class="box" @touchstart="start($event)" @touchmove="move($event)" @touchend="end()">
      <top-nav v-bind:headerline="headerline" @aa="bb()"></top-nav>
      <!-- 内容 -->
      <div class="home">
        <!-- 轮播图 -->
        <swiper
          :options="swiperOption"
          ref="mySwiper"
          @someSwiperEvent="callback"
          v-if="banners.length"
        >
          <!-- slides -->
          <swiper-slide v-for="item in banners" :key="item.id" class="h1">
            <img :src="item.image" alt @click="toNews(item.id)">
            <p class="h1">{{item.title}}</p>
          </swiper-slide>
          <!-- <swiper-slide class="h1">
            <img src="https://pic1.zhimg.com/v2-548d3d615b68aa27421475875d2b410c.jpg" alt>
           <p class="h1">高铁这么好的东西，美国人为什么不大力发展？</p>
          </swiper-slide>-->
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <!-- 今日新闻 -->
        <mt-loadmore>
          <h2 class="h subtitle">今日新闻</h2>
          <ul>
            <li v-for="item in stories" :key="item.id" @touchend="toNews(item.id)">
              <span class="h2">{{ item.title }}</span>
              <img :src="item.images" alt>
            </li>
          </ul>
        </mt-loadmore>
        <!-- 往日新闻 -->

        <mt-loadmore v-for="(item,index) in before" :key="index">
          <h2 class="h subtitle">{{item.title}}</h2>
          <ul>
            <li v-for="(litItem,zindex) in item.data" :key="zindex" @touchend="toNews(litItem.id)">
              <span class="h2">{{litItem.title}}</span>
              <img :src="litItem.images" alt>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
    <!-- 遮罩层 -->
   
    <v-mask :classn="classN" @hide="hide()" @router='toPage($event)'></v-mask>
  </div>
</template>

<script type="text/ecmascript-6">
Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日
  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
var num = 0;

import API from "../../common/js/API";

import "swiper/dist/css/swiper.css";
import vMask from "../views/mask";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    swiper,
    swiperSlide,
    vMask
  },
  props: [],
  data() {
    return {
      before: [],
      headerline: "首页",
      isload: true,
      time: "",
      classN: "mask",
      startX: 0,
      endX: 0,
      index: "",
      banners: [],
      stories: [],
      swiperOption: {
        loop: true,
        pagination: { el: ".swiper-pagination" }, // 分页按钮
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
          delay: 3000 // 自动切换的时间间隔（单位ms）
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      }
    };
  },
  watch: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  mounted() {
    //    今日消息
    this.$http({
      url: API.banner,
      method: "get"
    })
      .then(d => {
        this.banners = d.data.top_stories;
        this.stories = d.data.stories;
        this.getNewData();
      })
      .catch(err => {
        console.log(err);
      });
    //滑到底部
    var that = this;
    window.onscroll = function() {
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight; //窗口的高度
      var st = document.documentElement.scrollTop || document.body.scrollTop; //上卷的距离

      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight; //文档的高度

      if (wh + st + 30 >= dh) {
        // console.log("到底了");
        that.getNewData();
      }

      // 改变顶部
      if (st < 216) {
        that.headerline = "首页";
      } else {
        var times = document.querySelectorAll(".subtitle");
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            that.headerline = times[i].innerHTML;
          }
        }
      }
    };
  },
  methods: {
    
    bb() {
      this.classN = "mask show";
    },
    toPage(page) {
      this.classN = "mask";
      this.$router.push(page);
    },
    goIndex() {
    this.classN = "mask";
    this.$router.push("/index");
    },
    callback() {},
    toNews(id) {
      this.$router.push("/news/" + id);
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
   
    // 获取新的数据
    getNewData() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.before + getDate(num).params
        }).then(d => {
          this.isload = true;
          console.log(d);
          this.before.push({
            title: getDate(num).title,
            data: d.data.stories
          });
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.home >>> ul {
  padding-left: 0rem;
}

// 遮罩页面
.wraper {
  background: $hui;
}

.box {
  .home {
    padding-top: 0.6rem;
    width: 100vw;
    box-sizing: border-box;

    .swiper-container {
      width: 100%;
      height: 3rem;

      .swiper-wrapper {
        position: relative;
      }

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

    .mint-loadmore {
      .mint-loadmore-content {
        h2 {
          background: $hui;
        }

        ul {
          // width: 100vw;
          li {
            display: flex;
            margin: $padding;
            box-sizing: border-box;
            height: 1.1rem;
            line-height: 1.1rem;
            background: $write;
            overflow: hidden;

            &:last-child {
              border: none;
            }

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
    }
  }
}
</style>
