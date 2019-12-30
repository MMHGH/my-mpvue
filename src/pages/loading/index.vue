<template>
  <div>
   <div class="sp sp-3balls"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  onLoad (){
    let self = this;
    console.log(777,self.globalData)
    wx.login({
        success (res) {
            if (res.code){
                // self.code = res.code;
                self.wxGetUserInfo(res.code); //传入code参数获取用户的openId
            }
        },
        fail (err) {
            console.log(`wx.login失败:`,err);
            // 需要提示用户手动点击button按钮进行授权
            wx.showToast({
                title: 'wx.login失败'+err,
                icon: 'none',
                duration: 1000
            })                
        }
    })
  },
  methods: {
    wxGetUserInfo (code) {
      const self = this;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
                withCredentials: true,
                success (res) {
                    console.log(`登录成功用户信息:`,res);
                    self.globalData.userInfo = res.userInfo;
                    // 如果获取成功，则不需要显示授权按钮，直接进入首页！！！
                    wx.switchTab({
                        url:'../index/main'
                    })
                    let { encryptedData,userInfo,iv } = res;
                    // self.$http.post('/api/getWxUserInfo',{
                    //     code,
                    //     encryptedData,
                    //     iv,
                    // }).then(res => {
                    //     console.log(`后台交互拿回数据:`,res);
                    //     // userInfo.client_id = res.data.userId;
                    //     // userInfo.status = res.data.status;
                    //     // userInfo.oldUser = res.data.oldUser;
                    //     // self.changeStatus(userInfo);
                    //     self.canGetInfo = true;
                    // }).catch(err => {
                    //     self.loading = false;
                    //     console.log(`自动请求api失败 err:`,err);
                    // })  
                },fail:res=>{
                    // 获取失败的去引导用户授权    
                    console.log('登录失败回调',res) 
                    wx.navigateTo({
                        url:'../author/main'
                    })                   
                }
            })
          }else{
            // 未授权
            wx.navigateTo({
                url:'../author/main'
            })         
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.sp-3balls, .sp-3balls::before, .sp-3balls::after {
	border-radius: 50%;
	background-color: #000;
	width: 18rpx;
	height: 18rpx;
	transform-origin: center center;
	display: block;
}
.sp-3balls {
	position: relative;
	background-color: rgba(#000,1);
	opacity: 1;
	-webkit-animation: spScaleAlpha 1s infinite linear;
	animation: spScaleAlpha 1s infinite linear;
  margin: 20rpx auto;
}
.sp-3balls::before, .sp-3balls::after {
	content: '';
	position: relative;
	opacity: 0.25;
}
.sp-3balls::before {
	left: 40rpx;
	top: 0rpx;
	-webkit-animation: spScaleAlphaBefore 1s infinite linear;
	animation: spScaleAlphaBefore 1s infinite linear;
}
.sp-3balls::after {
	left: -40rpx;
	top: -18rpx;
	-webkit-animation: spScaleAlphaAfter 1s infinite linear;
	animation: spScaleAlphaAfter 1s infinite linear;
}
@-webkit-keyframes spScaleAlpha {
	0% { opacity: 1; }
	33% { opacity: 0.25; }
	66% { opacity: 0.25; }
	100% { opacity: 1; }
}
@keyframes spScaleAlpha {
	0% { opacity: 1; }
	33% {  opacity: 0.25; }
	66% { opacity: 0.25; }
	100% {  opacity: 1; }
}
@-webkit-keyframes spScaleAlphaBefore {
	0% { opacity: 0.25; }
	33% { opacity: 1; }
	66% { opacity: 0.25; }
}
@keyframes spScaleAlphaBefore {
	0% { opacity: 0.25; }
	33% { opacity: 1; }
	66% { opacity: 0.25; }
}
@-webkit-keyframes spScaleAlphaAfter {
	33% { opacity: 0.25; }
	66% { opacity: 1; }
	100% { opacity: 0.25; }
}
@keyframes spScaleAlphaAfter {
	33% { opacity: 0.25; }
	66% { opacity: 1; }
	100% { opacity: 0.25; }
}
</style>
