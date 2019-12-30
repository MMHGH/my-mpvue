import fly  from './fly'
import config  from './config'

const host = config;

function get(url,params,headers){
    return fly.get(`${host}${url}`, params,headers)
}
function post(url,params,headers){
    return fly.post(`${host}${url}`, params,headers)
}

export default {
    get,
    post
}