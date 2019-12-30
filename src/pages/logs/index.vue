<template>
  <div class="swiper-waper">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
          <block v-for="(item, index) in imgUrls" :key="index">
              <swiper-item>
                  <image :src="item" class="slide-image" mode="aspectFill" @click="previewImg(index)" />
              </swiper-item>
          </block>
      </swiper>
      <p style="text-align:center;margin:15rpx 0;">点击图片可进行预览</p> 
      <div style="text-align:center;">
        <van-uploader :file-list="fileList" @afterRead="uploaderAfter">
          <van-button icon="photo" type="primary" size="small">有赞上传图片</van-button>
        </van-uploader>
        <van-button style="margin-left:20rpx;" icon="photo" type="primary" @click="chooseImage" size="small">微信上传图片</van-button>
      </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      fileList:[],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'https://img-oss.yunshanmeicai.com/goods/default/31d8dfa4-0d7b-4694-80f9-41b07c9d0a3a.png',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
    }
  },
  created () {
    
  },
  methods: {
    //预览图片
    previewImg (index) {
      let that = this;
      //wx.previewImage的urls必须是数组的形式，所以用下面的方法先转换为数组
      var jsonText =new Array(that.imgUrls[index]);
      //最主要就是调用这个
      wx.previewImage({
        current: that.imgUrls[index],
        urls: jsonText
      });
    },
    chooseImage() {
      let that = this;
      let i = 0;          // 多图上传时使用到的index
      let max = 2;        //最大选择数
      let upLength;       //图片数组长度
      let imgFilePaths;   //图片的本地临时文件路径列表
      wx.chooseImage({
        count: max || 1,   //一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let len = that.fileList.concat(res.tempFilePaths);
          imgFilePaths = res.tempFilePaths;
          upLength = imgFilePaths.length;
          if(len.length > max){
            wx.showToast('图片最多只能选择' + max);
            return false;
          }
          /**
           * 上传完成后把文件上传到服务器
           */
          wx.showLoading({
            title: '上传中...',
          })
          // that.uploaderAfter(imgFilePaths,i,upLength);            //上传操作
        },
        fail: function () {
          console.log('fail');
        },
        complete: function () {
          console.log('commplete');
        }
      })
    },
    uploaderAfter(event) {
      const { file } = event.mp.detail;
      console.log('获取的你本地图片',file)
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: '', // 仅为示例，非真实的接口地址
        filePath: file.path,
        name: 'file',
        formData: { user: 'test' },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success(res) {
          // 上传完成需要更新 fileList
          const { fileList = [] } = this.data;
          fileList.push({ ...file, url: res.data });
          this.fileList = fileList;
        }, fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            showCancel: false,
            success: function (res) { }
          })
        },
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.swiper-waper{
  .swiper {
    height: 300rpx !important;
    image {
      height: 100%;
      width: 100%!important;
    }
  }
}
</style>
