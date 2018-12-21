// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // //获取本地储存的数据phone
    // that.setData({
    //   phone: wx.getStorageSync('phone')
    // })

  },

  onShow: function() {
    var that = this;
    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })
  },

  signout: function () {
    var that = this;
    //清楚登录手机号
    wx.clearStorageSync();
    that.setData({ phone: '' });
  },

  goGqy: function() {
    wx.navigateTo({
      url: '../gqy/gqy',
    })
  },

  tel: function() {
    wx.makePhoneCall({
      phoneNumber: '4001663308'
    })
  }




})