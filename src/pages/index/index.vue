<template>
  <div class="home">
    <div>
      <nav-header :data="navSetting"></nav-header>
    </div>
    <div>
      <van-tabs :active="active" @change="onChange">
        <van-tab title="标签 1"></van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
      </van-tabs>
    </div>
    <div class="userinfo">
      <img class="userinfo-avatar avatarUrl" v-if="avatarUrl" :src="avatarUrl"  background-size="cover" />
      <img class="userinfo-avatar" v-else src="/static/images/user.png" @click="goAuthor" background-size="cover" />
      <p>{{userInfo.nickName}}</p>
    </div>
    <div>
      <!-- 有弹出层的话会有横竖白条 -->
      <van-grid column-num="3">
        <van-grid-item icon="photo-o" :text="item.name" v-for="(item,index) in list" :key="index" />
      </van-grid>
    </div>
    <!-- 选择区域 -->
    <div class="area">
      <h3>请选择当前所在的城市：</h3>
       <van-cell-group>
          <!--cell+popup+area省市区的坑-->
          <van-cell  title="省/市/区" :value="carmodel" @click="showPopup"></van-cell>
          <van-popup :show="showArea" position="bottom">
            <van-area
              ref="area"
              :value="areaData"
              :area-list="areaList"
              @change="changeArea"
              @confirm="showArea = false"
              @cancel="showArea = false"
            />
          </van-popup>
        </van-cell-group>
      <!-- <van-area :area-list="areaList" :value="areaData" @change="changeArea" /> -->
    </div>
    <!-- vant组件 -->
    <div class="page-btn">
      <!-- 跳转页面 -->
      <van-button class="btn" type="primary" @click="goPage(1)">电影列表</van-button>
      <van-button type="info" @click="goPage(2)">订单页面</van-button>
    </div>
    <!-- 子组件 -->
    <div class="usermotto">
        <card :text="motto"></card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import navHeader from '@/components/navHeader'
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
  data () {
    return {
      active:0,
      motto: '<p>1314<img src="http://img.baidu.com/hi/jx2/j_0057.gif"/><img src="http://img.baidu.com/hi/jx2/j_0026.gif"/></p>',
      userInfo: {
        nickName: '点击头像进行授权',
        avatarUrl: ''
      },
      navSetting:{
        text:'我的主页',
        home:false,
        bg:'#1797eb'
      },
      avatarUrl:'',
      list:[
        {
          name:'栏目1'
        },
        {
          name:'栏目2'
        },
        {
          name:'栏目3'
        },
        {
          name:'栏目4'
        },
        {
          name:'栏目5'
        },
        {
          name:'栏目6'
        },
      ],
      showArea:false,
      areaData:110101,
      carmodel:'江西省 赣州市 定南县',
      areaList:{
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          120100: '天津市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区',
          // ....
        }
      }
    }
  },
  computed:{
      ...mapGetters(['activityGenera','rankData','showRankDialog','source']),
  },
  components: {
    card,
    navHeader
  },
  // 每次触发
  onShow(){
    // this.getSetting();
    if(this.globalData.userInfo){
      console.log('全局存储的用户信息userInfo',this.globalData.userInfo.avatarUrl)
      this.avatarUrl = this.globalData.userInfo.avatarUrl;
      this.userInfo = this.globalData.userInfo;
    }
    console.log('获取vuex数据',this.rankData)
  },
  mounted () {
    let params = {
      name:'明天慧更好',
      age:18
    }
    let url = `https://api.apiopen.top/api/user/index/getGeneralSituation`//域名需要在小程序后台配置
    // this.$service.post(url,params).then(res => {
    //     console.log(res)
    // })
    this.$service.get(this.$api.managerialStatis.getVideoPage,params).then(res => {
        console.log(res)
    })
  },
  methods: {
    ...mapActions(["setActivityGenera",'setRankData','setRankDialog']),
    getSetting(){
      let self = this;
      wx.getSetting({
        success: (res) => {
          console.log(111,JSON.stringify(res))
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        self.getLocation();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //调用wx.getLocation的API
            console.log('res.authSetting == undefined')
            self.getLocation();
          }
          else {
            //调用wx.getLocation的API
            console.log('else')
            self.getLocation();
          }
        }
      })
    },
    getLocation(){
      let self = this;
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          console.log('获取的地理位置',res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          self.globalData.locationData = res;
        }
      })
    },
    goPage(type){
      if(type == 1){
        let id = 10
        // 标签内跳转使用根路径
        // const url = '/pages/counter/main?id=' + id
        const url = '../list/main?id=' + 2020
        wx.navigateTo({ url:url }) //此种跳转会保留上一个页面
      }else{
        wx.switchTab({
            url:'../logs/main'
        })
      }
    },
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.mp.detail.name}`,
        icon: 'none'
      });
    },
    showPopup(){
      if(this.globalData.locationData){
        this.showArea = true
        return      
      }
      this.getSetting();
    },
    changeArea(value, index){
      console.log('当前选择的城市code',value)
      let data = value.mp.detail.values;
      let areaName = ''
      for (var i = 0; i < data.length; i++) {
        areaName = areaName + data[i].name + ' '
      }
      this.carmodel = areaName
      wx.showToast({
        title: `当前选择${data[0].name}-${data[1].name}-${data[2].name}`,
        icon: 'none',
        duration: 2000
      })
    },
    // 跳转授权页面
    goAuthor(){
      wx.navigateTo({
          url:'../author/main'
      })      
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15rpx;
     .userinfo-avatar {
       width: 128rpx;
       height: 128rpx;
       margin: 20rpx;
       border-radius: 50%;
    }
    .avatarUrl{
      border-radius: 50%;
    }
    p{
      color:red;
    }
  }
  .area{
    margin-bottom:20rpx;
    h3{
      margin:10px;
      color:#5ec571;
    }
  }
  .page-btn{
    display: flex;
    justify-content: center;
    .btn{
       margin-right:10rpx;
    }
    // justify-content: space-between;
  }
}
</style>
