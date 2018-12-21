// pages/qzcx/qzcx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigdataValue: '',
    policyValue: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获取input的值
  getVaule1: function(e) {
    var that = this;
    that.data.bigdataValue = e.detail.value;
  },

  // 点击搜索按钮跳转结果列表页
  bigdataBtn: function() {
    var that = this;
    if (that.data.bigdataValue==''){
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 1500
      })  
    }else {
      wx.navigateTo({
        url: '../bigData/bigData?keyword=' + this.data.bigdataValue,
      })
    }
  },

  //获取input的值
  getVaule2: function (e) {
    var that = this;
    that.data.policyValue = e.detail.value;
  },
  policyBtn: function () {
    var that = this;
    if (that.data.policyValue == '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.navigateTo({
        url: '../policy/policy?keyword=' + this.data.policyValue,
      })
    }
  }


})