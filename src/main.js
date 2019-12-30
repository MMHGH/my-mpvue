import Vue from 'vue'
import App from './App'
import store from './store'
import api from './service/api'
import service from './service/service'
// import globalData from './components/globalData'; //全局变量
Vue.prototype.$api = api;
Vue.prototype.$service = service;
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
// 添加全局变量
Vue.prototype.globalData = getApp().globalData
