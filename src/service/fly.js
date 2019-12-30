var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

// fly.config.baseURL='xxx'  实例级配置

//设置超时
fly.config.timeout = 5000;
// debugger
//请求拦截器
fly.interceptors.request.use((request)=>{
    if(request.headers.isLoading !== false){
        wx.showLoading({
            title: "加载中",
            mask:true
        });
    }
    //给所有请求添加自定义header
    request.headers = {
        // "X-Tag": "flyio",
        // "Authorization": "bearer 866d55a8-db7a-4cdf-b6f3-00757e28f498",
        // 'Content-Type': 'application/json'
        'Content-Type': 'json'
        // 'content-type': 'application/xml'
    };
    return request
})

//响应拦截器
fly.interceptors.response.use( 
    (response)=>{
        wx.hideLoading();
        return response.data;
    },
    (err,promise)=>{
        wx.hideLoading();
        return promise.resolve();
    }
)
export default fly