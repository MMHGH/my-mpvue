let lifeUrl;
if (process.env.NODE_ENV == 'development') { //  开发环境
    // lifeUrl = 'https://api.apiopen.top'
    lifeUrl = 'https://douban.uieee.com'
    // lifeUrl = 'http://localhost'//Nginx本地代理
}else{
    lifeUrl = 'https://douban.uieee.com'
    // lifeUrl = 'https://api.apiopen.top'
    // lifeUrl = 'https://manager.51ylk.com'
}

export default lifeUrl