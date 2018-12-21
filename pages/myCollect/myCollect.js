// pages/myCollect/myCollect.js
var util = require("../../utils/util.js");
Page({
  data: {
    phone: '',
    collectDatas: [],
    showCount: 10
  },

  onLoad: function (options) {
    var that = this;
    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })

  },

  onShow: function() {
    var that = this;
    that.myCollectData();
  },

  myCollectData: function() {
    //加载动画
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/PoligCollectionlistPage?createId=' + that.data.phone  + '&showCount=' + that.data.showCount,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          var datas = res.data.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].beginDate = util.timestampToTime(datas[i].beginDate);
            datas[i].endDate = util.timestampToTime(datas[i].endDate);
            datas[i].datetime = util.timestampToTime(datas[i].datetime);
          }
          that.setData({
            collectDatas: res.data.data
          })

          //隐藏加载动画
          wx.hideLoading();
          
        }
      }
    })
  },

  //上拉加载更多
  onReachBottom: function () {
    var that = this;
    that.setData({
      showCount: that.data.showCount + 10
    })
    that.myCollectData();
  }


})