<template>
  <div class="author">
    <div>
      <nav-header :data="navSetting"></nav-header>
    </div>
    <!-- 获取权限 -->
    <div class="author-top">
      <img src="../../../static/images/wechat-a.png" v-if="!userInfo" alt="">
      <div class="info" v-if="!userInfo">
        <h3>请确认授权以下</h3>
        <h3>请授权获取您的(头像，昵称，定位等)</h3>
      </div>
      <div class="userInfo" v-else>
        <img class="avatarUrl" :src="userInfo.avatarUrl" alt="">
        <span>{{userInfo.nickName}}</span>
        <p>地区：{{userInfo.province}}-{{userInfo.city}}</p>
      </div>
    </div>
    <div class="author-serve">
      <ul>
        <li>为您提供服务1</li>
        <li>为您提供服务2</li>
        <li>为您提供服务3</li>
      </ul>
    </div>
    <div class="author-btn">
      <button class="btn1" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">同意</button>
      <button class="btn2" @click="abandon">放弃授权</button>
    </div>
  </div>
</template>

<script>
import navHeader from '@/components/navHeader'

export default {
  data () {
    return {
      loading: true,
      canGetInfo: false, //授权状态，能否获取用户信息
      userInfo:'',
      navSetting:{
        text:'授权',
        home:true,
        back:false,
        bg:'#5fc46f'
      },
    }
  },
  mounted () {
  },
  methods: {
    bindGetUserInfo(e) {
        console.log(`bindGetUserInfo:`,e);
        const self = this;
        if (e.mp.detail.userInfo){
            console.log('用户按了允许授权按钮',e.mp.detail)
            let { encryptedData,userInfo,iv } = e.mp.detail;
            self.userInfo = e.mp.detail.userInfo;
            //1.存用户信息到本地存储
            self.globalData.userInfo = e.mp.detail.userInfo;
            // wx.setStorageSync('userInfo', e.mp.detail.userInfo)
            wx.switchTab({
                url:'../index/main'
            })
            // self.$http.post('/api/getWxUserInfo',{
            //     code:self.code,
            //     encryptedData,
            //     iv,
            // }).then(res => {
            //     console.log(`后台交互拿回数据:`,res);
            //     // userInfo.client_id = res.data.userId;
            //     // userInfo.status = res.data.status;
            //     // userInfo.oldUser = res.data.oldUser;
            //     // 存储到store
            //     // self.changeStatus(userInfo);
            //     self.canGetInfo = true;
            // })
        } else {
            //用户按了拒绝按钮
            console.log('用户按了拒绝按钮');
            self.loading = false;
            wx.hideLoading();
        }
    },
    getUserInfoClick(){
        this.loading = false;

        // console.log('click事件首先触发')
        // wx.showLoading({
        //     title: '请求授权中...',
        // })
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        // if(wx.canIUse('button.open-type.getUserInfo')){
        //     // 用户版本可用
        //     console.log('当前版本open-type.getUserInfo可用:',);
        // }else{
        //     console.log('请升级微信版本')
        // }
    },
    abandon(){
      wx.switchTab({
          url:'../index/main'
      })
    }
  },
   components: {
    navHeader
  },
}
</script>

<style lang="scss" scoped>
.author{
  &-top{
    background:#5ec571;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    color:#ffffff;
    min-height: 220rpx;
    img{
      width:80rpx;
      height:80rpx;
    }
    .info{
      text-align: center;
    }
    .userInfo{
      text-align: center;
      .avatarUrl{
        border-radius: 50%;
      }
    }
  }
  &-serve{
    color:#939393;
    font-size: 30rpx;
    padding:20rpx 50rpx;
    ul{
      li{
        margin-bottom: 15rpx;
      }
    }
  }
  &-btn{
    padding:0 10rpx;
    .btn1{
      margin-bottom: 30rpx;
      background:#5ec571;
    }
  }
}
</style>
