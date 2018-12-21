// pages/zcsd_detail/zcsd_detail.js

var util = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    phone: '',
    articleId: '',
    detailData: {},
    collectText: '收藏',
    collectActive: false,
    windowHeight: 0,
    test:''
  },

  /**
   * 生命周期函数--监听页面加载
   * options可以获取url上的参数
   */
  onLoad: function (options) {
    var that = this;
  
    that.setData({
      articleId: options.id
    })

    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })

    that.detailData();
    that.checkCollect();
    

  },



  //页面分享
  onShareAppMessage: function (ops) {
    var that= this;
    if (ops.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(ops.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: ''+that.data.detailData.title,
      path: '/pages/policyDetail/policyDetail?id=' + that.data.detailData.id,
      imageUrl: '',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }

  },

  //判断是否收藏
  checkCollect: function() {
    var that = this;
    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/isCollection?createId=' + that.data.phone + '&targetId=' + that.data.articleId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            collectText: '已收藏',
            collectActive: true
          })
        } else {
          //未收藏
          that.setData({
            collectText: '收藏',
            collectActive: false
          })
        }
      }
    })
  },

  //收藏
  collect: function() {
    var that = this;
    if(that.data.phone!=''){
      wx.request({
        url: 'https://www.hights.cn/beetl/subscribe/addAnddelCollection?createId=' + that.data.phone + '&targetId=' + that.data.articleId,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 0) {
            if (that.data.collectActive == true) {
              //取消收藏
              that.setData({
                collectText: '收藏',
                collectActive: false
              })
            } else {
              //收藏
              that.setData({
                collectText: '已收藏',
                collectActive: true
              })
              wx.showToast({
                title: '已收藏。在“我的收藏”中查看',
                icon: 'none',
                duration: 2000
              })
            }
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../login/login'
      })
    }

  },
  
  detailData: function() {
    var that = this;
    wx.request({
      url: 'https://www.hights.cn/beetl/policydig/view.do?id=' + that.data.articleId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          res.data.data.datetime = util.timestampToTime(res.data.data.datetime);
          var str_del = res.data.data.content;
          var del_str = /ucapcontent/g;
          var str = str_del.replace(del_str, 'div')
          that.setData({
            detailData: res.data.data,
            test: str 
          })
        }
      }
    })
  }

})