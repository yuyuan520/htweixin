//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
// 引入SDK核心类
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    phone: '',
    location: {},            //当前地区
    tomorrow: null,         //明天凌晨时间
    keyword: '',
    navActive: 8,           //默认的导航条
    display: '',            //折叠导航显示隐藏   
    navIconTab1: '',        //折叠导航折叠图标 
    navIconTab2: '',        //折叠导航关闭图标
    hadSubscribe: 1,        //0--已订阅   1--未订阅

    scrollTop: 0,       
    listDatas: [],          //列表内容
    showCount: 15,
    startDate: '起始时间',
    endDate: '截止时间'


  },
  onLoad: function (options) {

    var that = this;
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })

    //定位
    var myAmapFun = new amapFile.AMapWX({ key: '89723f818f50051c84f1fc8ab599b805' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        that.setData({
          location: data[0].regeocodeData.addressComponent
        })
        that.getListDatas();
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })

  },

  onShow: function() {
    var that =this;

    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })

    if(that.data.navActive==7&&that.data.phone==''){
      that.setData({
        navActive: 8,
        scrollTop: 0
      })
    }
    if (that.data.navActive == 7 && that.data.phone != '') {
      that.checkSubscribe();
    }

    if (app.globalData.navActive == 7 && that.data.phone != ''){
      that.setData({
        navActive: 7
      })
      that.checkSubscribe();
    }

  },


  //搜索框
  getValue: function(e) {
    var that = this;
    that.setData({
      keyword: e.detail.value
    });
  },
  searchVaule: function() {
    var that = this;
    if (that.data.navActive ==7){
      that.checkSubscribe();
    }else{
      that.getListDatas();
    }
    
  },

  // 导航样式切换
  changeNavActive: function (e) {
    var that =this;
    that.setData({
      navActive: e.target.dataset.num,
      scrollTop: 0
    })

    app.globalData.navActive = that.data.navActive;

    if (e.target.dataset.num == 7){
      if(that.data.phone==''){
        wx.navigateTo({
          url: '../login/login',
        })
      }else{
        //是否订阅
        that.checkSubscribe();
      }
     
    }else{
      that.getListDatas();
    }
    

  },
  //点击折叠导航展示内容
  showNavFold: function() {
    var that = this;
    that.setData({
      display: 'block',
      navIconTab1: 'none',
      navIconTab2: 'block'
    })
  },
  //点击折叠导航隐藏内容
  hideNavFold: function () {
    var that = this;
    that.setData({
      display: "none",
      navIconTab1: "block",
      navIconTab2: "none"
    })
  },

  //获取内容列表
  getListDatas: function() {
    wx.showLoading({ 
      title: '加载中',
      icon: 'loading',
      mask: true
    });
    var that = this;
    //最新
    if (that.data.navActive==8){
      that.data.navActive = ''
    }

    if (that.data.startDate=='起始时间'){
      that.data.startDate = '';
    }
    if (that.data.endDate == '截止时间') {
      that.data.endDate = '';
    }

    wx.request({
      url: 'https://www.hights.cn/beetl/policydig/list.do?showCount=' + that.data.showCount + '&nature=' + that.data.navActive + '&keyword=' + that.data.keyword + '&date1=' + that.data.startDate + '&date2=' + that.data.endDate + '&province=' + that.data.location.province + '&city=' + that.data.location.city + '&area=' + that.data.location.district,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          var datas = res.data.data;
          for (var i = 0; i<datas.length; i++) {
            datas[i].beginDate = util.timestampToTime(datas[i].beginDate);
            datas[i].endDate = util.timestampToTime(datas[i].endDate);
            datas[i].datetime = util.timestampToTime(datas[i].datetime);
            if (datas[i].beginDate == 'NaN年NaN月NaN日') {
              datas[i].beginDate = '';
            }
            if (datas[i].endDate == 'NaN年NaN月NaN日') {
              datas[i].endDate = '';
            }
          }
          that.setData({
            listDatas: res.data.data
          })
          wx.hideLoading();

        }
      }
    })
  },
  //上拉加载更多
  onReachBottom: function () {
    var that = this;
    that.setData({
      showCount: that.data.showCount + 15
    })
    if (that.data.navActive == 7){
      that.checkSubscribe();
    }else{
      that.getListDatas();
    }
  },

  //判断是否订阅
  checkSubscribe: function() {
    var that =this;

    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    });
    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/policyType?phone=' + that.data.phone + '&showCount=' + that.data.showCount + '&keyword=' + that.data.keyword,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          var datas = res.data.data;
          for (var i = 0; i < datas.length; i++) {
            datas[i].beginDate = util.timestampToTime(datas[i].beginDate);
            datas[i].endDate = util.timestampToTime(datas[i].endDate);
            datas[i].datetime = util.timestampToTime(datas[i].datetime);
            if (datas[i].beginDate =='NaN年NaN月NaN日'){
              datas[i].beginDate = '';
            }
            if (datas[i].endDate == 'NaN年NaN月NaN日') {
              datas[i].endDate = '';
            }
          }
          that.setData({
            listDatas: res.data.data,
            hadSubscribe: 0
          })
          
        }
        // else {
        //   if(that.data.phone==''){
        //     wx.navigateTo({
        //       url: '../login/login',
        //     })
        //   }else{
        //     that.setData({
        //       listDatas: res.data.data,
        //       hadSubscribe: 1
        //     })
        //   }
        // }
        wx.hideLoading();
      }
    })
    

  },

  //页面分享
  onShareAppMessage: function (ops) {
    var that = this;

    return {
      title: '高企云掌上政策通',
      path: '/pages/index/index',
      imageUrl: '',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }

  },

  //时间选择
  bindDateChange: function (e) {
    var that = this;
    that.setData({
      startDate: e.detail.value
    })
    that.getListDatas();
  },

  bindDateChange1: function (e) {
    var that = this;
    that.setData({
      endDate: e.detail.value
    })
    that.getListDatas();
  },

  //关闭性质分类选项
  closeType: function() {
    var that = this;
    that.setData({
      navActive: 8
    })
    that.getListDatas();
  },

  closePublishDate: function() {
    var that = this;
    that.setData({
      startDate: '起始时间'
    })
    that.getListDatas();
  },
  closePublishDate1: function () {
    var that = this;
    that.setData({
      endDate: '截止时间'
    })
    that.getListDatas();
  }





})
