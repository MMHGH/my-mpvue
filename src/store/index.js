import Vue from 'vue';
import Vuex from 'vuex';
import marketingActivities from './modules/marketingActivities'

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
      marketingActivities
    }
})
// mpvue中这种写法报错
// export default () => {
//     return new Vuex.Store({
//         modules: {
//             login,
//         }
//     })
// }
