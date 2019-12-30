<template>
  <div class="video">
    <!-- 注意：使用了scroll-view就会导致下拉事件失效 -->
    <!-- <scroll-view style="height:100%" :scroll-y="true" @scrolltolower="scrolltolower" @scroll="scrollTop" :scroll-top="scroll"> -->
      <div class="video-list" v-for="item in listData" :key="item.id">
        <div class="video-list__left">
          <img :src="item.images.medium" alt="">
        </div>
        <div class="video-list__right">
          <h3>{{item.title}}</h3>
          <p>{{item.pubdates}}</p>
          <p>时长：{{item.durations[0]}}</p>
          <p>
            概述：
            <span style="margin-right:8rpx" v-for="(item1,index_) in item.genres" :key="index_">{{item1}}</span>
          </p>
        </div>
      </div>
      <div class="loading" v-if="listData.length">
        <van-loading type="spinner" v-if="listData.length && listData.length < total"/>
        <div class="no-more" v-else>
          没有更多消息了哟~
        </div>
      </div>
    <!-- </scroll-view> -->
    <div class='go-top' @click='goTop' v-if="btnFlag">秃顶</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      start:1,// 当前页数
      count:10,
      total:0,
      listData:[],
      scroll:0,
      btnFlag:false,
      id:''
    }
  },
  computed: {
  },
  mounted () {
    this.id = this.$mp.query.id;
    this.getData();
  },
  onPullDownRefresh () {
    // 初始化页码
    this.start = 1;
    this.getData();
    wx.showToast({
      title: `下拉刷新`,
      icon: 'none'
    })
  },
  onReachBottom () {
    if (this.listData.length > this.total) {
      wx.showToast({
        title: `数据加载完了`,
        icon: 'none'
      })
    } else {
      // 下一页
      this.start += 1;
      this.getData();
    }
  },
  onPageScroll:function (e) {
     console.log(e) //自己设置 滚动距离,200
    if (e.scrollTop > 200) {
        this.btnFlag = true
    }else{
        this.btnFlag = false
    }
  },
  methods: {
    getData(){
      let self = this;
      let params = {
        apikey:'0df993c66c0c636e29ecbb5344252a4a',
        start:this.start,
        count:this.count
      }
      this.$service.get(this.$api.managerialStatis.getVideoPage,params, {headers: {
        isLoading: false
        }
      }).then(res => {
          // 关闭下拉刷新动画
          wx.stopPullDownRefresh();
          // 返回的数据
          const data = res;
          // 数据追加  data.list为返回的数据列表
          if (self.start > 1) {
            self.listData.push(...data.subjects)
          } else {
            self.listData = data.subjects
          }
          // 总页数
          self.total = data.total;
          console.log('电影列表',self.listData)
      })
    },
    scrolltolower(){},
    // 点击返回顶部
    goTop(){
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } 
    },
    scrollTop(e){
      console.log(e)
      if (e.mp.detail.scrollTop > 10){ //如果距离顶部10 显示返回顶部标签
          this.btnFlag = true
      }else{
          this.btnFlag = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.video{
  -webkit-overflow-scrolling:touch;
  &-list{
    display: flex;
    height:250rpx;
    padding:10rpx;
    &__left{
      img{
        width: 250rpx;
        height:100%;
      }
    }
    &__right{
      flex: 1;//占据剩下的空间
      padding-left:25rpx;
      p{
        margin-top:10rpx;
        font-size: 28rpx;
      }
    }
  }
  .loading{
    text-align: center;
    .no-more{
      color:#dadadd;
      padding:20rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before{
        content: '';
        display: inline-block;
        width:100rpx;
        height:3rpx;
        background: #f6f6f9;
        margin-right:20rpx;
      }
      &::after{
        content: '';
        display: inline-block;
        width:100rpx;
        height:3rpx;
        background: #f6f6f9;
        margin-left:20rpx;
      }
    }
  }
  .go-top{
    width: 100rpx;
    height:100rpx;
    border-radius: 50%;
    background: rgba(225,225,225,.5);
    position: fixed;
    bottom:100rpx;
    right:20rpx;
    z-index: 999;
    line-height: 100rpx;
    text-align: center;
  }
}
</style>
