// pages/bigDataDetail/bigDataDetail.js
Page({

  data: {
    detail: {}
  },

  onLoad: function (options) {
    var that = this;
    that.getBigdataDetail(options.id);

  },

  getBigdataDetail: function(id) {
    var that = this;
    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/policylibById?id='+id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          that.setData({
            detail: res.data.data
          })
          
        }
      }
    })
  }

})