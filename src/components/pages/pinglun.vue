<template>
  <div class="wrapper">
    <pinglun-nav v-bind:long="long" v-bind:short="short" id="nav"></pinglun-nav>
    <div class="long pinglun clearfix" id="longPing">
      <div class="header longHeader" id="longPingHeader">{{long.length}}条长评</div>
      <div class="con longCon" v-for="item in long" :key="item.id">
        <div class="left">
          <img :src="item.avatar" alt>
        </div>
        <div class="right">
          <span class="user">{{item.author}}</span>
          <i class="iconfont zan">
            &#xe63b;
            <span class="num">{{item.likes}}</span>
          </i>
          <div class="content">{{item.content}}</div>
          <span class="time">{{item.time|timeFilter}}</span>
        </div>
      </div>
      <!-- <div class="con longCon">
        <div class="left">
          <img src="http://pic3.zhimg.com/1ae5f682bba916af97aaaddbf193a0f6_im.jpg" alt>
        </div>
        <div class="right">
          <span class="user">万年潜水_189</span>
          <i class="iconfont zan">
            &#xe63b;
            <span class="num">12</span>
          </i>
          <div
            class="content"
          >什么样的才叫矮小？男157女145，增高能增多高？5-6，最极端不超过8-9否则有危险，这些都不叫数据？你想听什么数据？我看你你一直在问做这个手术成功率，到底是有什么用心？你告诉我这种手术什么叫成功？增高成功？本身就是禁止用于增高，非法用途谁去统计？你咋不去统计金三角地区的毒品交易量？</div>
          <span class="time">06-09 07.15</span>
        </div>
      </div>-->
    </div>
    <div class="long pinglun clearfix" id="shortPing">
      <div class="header longHeader">
        {{short.length}}条短评
        <span style="float:right;" @touchend="show()">︾</span>
      </div>
      <div class="con longCon shortCon" v-for="item in short" :key="item.id" v-show="isShow">
        <div class="left">
          <img :src="item.avatar" alt>
        </div>
        <div class="right">
          <span class="user">{{item.author}}</span>
          <i class="iconfont zan">
            &#xe63b;
            <span class="num">{{item.likes}}</span>
          </i>
          <div class="content">{{item.content}}</div>
          <span class="time">{{item.time|timeFilter}}</span>
        </div>
      </div>
      <!-- <div class="con longCon">
        <div class="left">
          <img src="http://pic3.zhimg.com/1ae5f682bba916af97aaaddbf193a0f6_im.jpg" alt>
        </div>
        <div class="right">
          <span class="user">万年潜水_189</span>
          <i class="iconfont zan">
            &#xe63b;
            <span class="num">12</span>
          </i>
          <div
            class="content"
          >什么样的才叫矮小？男157女145，增高能增多高？5-6，最极端不超过8-9否则有危险，这些都不叫数据？你想听什么数据？我看你你一直在问做这个手术成功率，到底是有什么用心？你告诉我这种手术什么叫成功？增高成功？本身就是禁止用于增高，非法用途谁去统计？你咋不去统计金三角地区的毒品交易量？</div>
          <span class="time">06-09 07.15</span>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from "jquery";
import API from "../../common/js/API";

export default {
  components: {},
  props: [],
  data() {
    return {
      id: this.$route.params.id,
      long: "",
      short: "",
      isShow: false
    };
  },
  watch: {
    long: function(newV) {
      if (newV.length == 0) {
        $("#longPing").append('<div class="secondDiv iconfont">');
        $("#longPingHeader").css({ display: "none" });
        $(".secondDiv").css({
          height: "80vh",
          "border-bottom": "1px solid #f0f0f0",
          "font-size": "2rem",
          "line-height": "80vh",
          "text-align": "center",
          color: "#f0f0f0"
        });
        $(".secondDiv").html("&#xe621;");
      }
    }
  },
  computed: {},
  methods: {
    show(){
      if(!this.isShow){
        this.isShow=true;
        var H = $('#longPing').outerHeight(true);
        $("html,body").animate({scrollTop:H},500);
      }else{
        $("html,body").animate({scrollTop:0},500);
        this.isShow=false
      }
    }
    
  },
  mounted() {
    console.log(this.id);
    this.$http({
      url: API.pinglun + this.id + "/long-comments",
      method: "get"
    })
      .then(d => {
        console.log(d);
        this.long = d.data.comments;
        console.log(this.long);
      })
      .catch(err => {
        console.log(err);
      });

    this.$http({
      url: API.pinglun + this.id + "/short-comments",
      method: "get"
    })
      .then(d => {
        console.log(d);
        this.short = d.data.comments;
        console.log(this.short);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  padding-top: 0.6rem;

  .pinglun {
    width: 100vw;
    box-sizing: border-box;

    .header {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
      box-sizing: border-box;
      border-bottom: 0.01rem solid $hui;
      padding-left: $padding;
      padding-right: $padding;
    }

    .con {
      box-sizing: border-box;
      display: flex;
      border-bottom: 0.01rem solid $hui;
      margin-top: 0.2rem;
      padding-left: $padding;
      padding-right: $padding;

      .left {
        float: left;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        float: left;
        flex: 1;
        padding-left: $padding;

        .user {
          text-align: left;
          font-size: 0.16rem;
          font-weight: 600;
        }

        .zan {
          float: right;

          .num {
            font-size: 0.16rem;
            color: $gref;
          }
        }

        .content {
          font-size: 0.16rem;
          color: $black;
          margin-bottom: 0;
        }

        .time {
          font-size: 0.14rem;
          color: $gref;
          display: block;
          margin: 0.2rem 0;
        }
      }
    }
  }
}
</style>
