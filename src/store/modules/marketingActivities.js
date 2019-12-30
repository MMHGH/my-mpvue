// 活动管理模块
const state={
    // 活动推广
    activityGenera:{},
    // 排行名次
    rankData:1,
    // 是否显示排行弹框
    showRankDialog:false,
    // 奖品类别
    source:''
};

const getters={
    activityGenera(state){ //承载变化的activityGenera
        return state.activityGenera;
    },
    rankData(state){ 
        return state.rankData;
    },
    showRankDialog(state){ 
        return state.showRankDialog;
    },
    source(state){ 
        return state.source;
    },
};

const mutations={
    getActivityGenera(state,data){ 
        state.activityGenera = data
    },
    getRankData(state,data){ 
        state.rankData = data
    },
    getRankDialog(state,data){ 
        state.showRankDialog = data
    },
    getSource(state,data){ 
        state.source = data
    },
 };

const actions={
    // 获取推广规则设置
    setActivityGenera(context,res){ //触发mutations里面的setActivityGenera ,传入数据形参res 对应到data
        context.commit('getActivityGenera',res);
    },
    setRankData(context,res){ 
        context.commit('getRankData',res);
    },
    setRankDialog(context,res){ 
        context.commit('getRankDialog',res);
    },
    setSource(context,res){ 
        context.commit('getSource',res);
    },
};

export default {
    //  namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
     state,
     getters,
     mutations,
     actions
}