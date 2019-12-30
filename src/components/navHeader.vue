<template>
   <div class="header">
        <div class="navbar" :style="{'height': navigationBarHeight,backgroundColor:navHeaders.bg}">
            <div :style="{'height': statusBarHeight}"></div>
            <div class='title-container'>
                <div class='capsule' v-if="navHeaders.back || navHeaders.home">
                    <div @click='back' v-if="navHeaders.back">
                        <i class="iconfont iconzuojiantou back-icon"></i>
                    </div>
                    <div @click='backHome' v-if="navHeaders.home">
                        <i class="iconfont iconzhuye home-icon"></i>
                    </div>
                </div>
                <div class='title' :style="{'color':navHeaders.titleColor}">{{navHeaders.text}}</div>
            </div>
        </div>
        <div :style="{'height':navigationBarHeight}"></div>
   </div>
</template>

<script>
export default {
    props: ['data'],
    data () {
        return {
            navHeaders:{
                back:true,
                home:true,
                text:'默认标题',
                titleColor:'#ffffff',
                bg:''
            },
            statusBarHeight: '',
            navigationBarHeight: ''
        }
    },
    mounted() {
        this.navHeaders = Object.assign(this.navHeaders,this.data);
        this.statusBarHeight = wx.getStorageSync('statusBarHeight') + 'px';
        this.navigationBarHeight = (wx.getStorageSync('statusBarHeight') + 44) + 'px'
        console.log(44,this.navigationBarHeight)
    },
    methods: {
        backHome: function () {
           wx.switchTab({
                url:'../index/main'
            })
        },
        back: function () {
            wx.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// 导航需使用px作为单位
.header{
    .navbar {
        width: 100%;
        // background-color: #1797eb;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        .title-container {
            height: 40px;
            display: flex;
            align-items: center;
            position: relative;
            .capsule {
                margin-left: 10px;
                height: 30px;
                background: rgba(255, 255, 255, 0.6);
                border: 1px solid #fff;
                border-radius: 16px;
                display: flex;
                align-items: center;
                .iconfont{
                    color:#ffffff; 
                    width: 50%;
                    // height: 100%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
                .back-icon{
                  font-size: 25px; 
                }
                .home-icon{
                  font-size: 20px; 
                }
            }
            .capsule > div {
                width: 45px;
                height: 60%;
                position: relative;
            }
            .capsule > div:nth-child(2) {
                border-left: 1px solid #fff;
            }
            .title {
                color: white;
                position: absolute;
                top: 6px;
                left: 104px;
                right: 104px;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
