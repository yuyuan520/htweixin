// pages/subscribe/subscribe.js
var app = getApp();

// 引入SDK核心类
var amapFile = require('../../libs/amap-wx.js');

Page({
  data: {
    phone: '',
    location: {},               //当前地区
   
    district: '其他地区',       //其他地区
    region: ['', '', ''],
    customItem: '全部',
    districtActive: -1,

    productTypeActive1: false,  //政策类型
    productTypeActive2: false,  
    productTypeActive3: false,  
    productTypeActive4: false,  
    productTypeActive5: false,  
    productTypeActive6: false,  
    productTypeActive7: false,  
    productTypeActive8: false,  

    nature1: false,             //性质分类
    nature2: false,
    nature3: false,
    nature4: false,
    nature5: false,
    nature6: false,

    timeRangesActive: '0',      //时间范围
  },

  
  onLoad: function (options) {
    var that = this;
    //获取本地储存的数据phone
    that.setData({
      phone: wx.getStorageSync('phone')
    })

    var myAmapFun = new amapFile.AMapWX({ key: '89723f818f50051c84f1fc8ab599b805' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        that.setData({
          location: data[0].regeocodeData.addressComponent
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })

    that.mySubscribe();

  },


  //订阅其他城市选择
  bindRegionChange: function (e) {
    var that = this;
    that.setData({
      region: e.detail.value
    })

    if (that.data.region[0] == '全部' && that.data.region[1] == '全部' && that.data.region[2] == '全部') {
      that.setData({
        district: '其他地区',
        areaActive2: false
      })
    }
    if (that.data.region[0] != '全部' && that.data.region[1] == '全部' && that.data.region[2] == '全部') {
      that.setData({
        district: that.data.region[0],
      })
    }
    if (that.data.region[1] != '全部' && that.data.region[2] == '全部') {
      that.setData({
        district: that.data.region[1],
      })
    }
    if (that.data.region[2] != '全部') {
      that.setData({
        district: that.data.region[2],
      })
    }
    that.setData({
      districtActive: 0
    })

  },

  //政策类型选择
  multipleSelection: function(options) {
    var that = this;
    var select = options.currentTarget.dataset.select;

    switch (select) {
      case '1':
        that.setData({ productTypeActive1: !that.data.productTypeActive1})
        break;
      case '2':
        that.setData({ productTypeActive2: !that.data.productTypeActive2 })
        break;
      case '3':
        that.setData({ productTypeActive3: !that.data.productTypeActive3 })
        break;
      case '4':
        that.setData({ productTypeActive4: !that.data.productTypeActive4})
        break;
      case '5':
        that.setData({ productTypeActive5: !that.data.productTypeActive5 })
        break;
      case '6':
        that.setData({ productTypeActive6: !that.data.productTypeActive6 })
        break;
      case '7':
        that.setData({ productTypeActive7: !that.data.productTypeActive7 })
        break;
      case '8':
        that.setData({ productTypeActive8: !that.data.productTypeActive8 })
        break;
    }
    
   
  },

  //性质分类选择
  multipleSelection1: function (options) {
    var that = this;
    var select1 = options.currentTarget.dataset.select1;

    switch (select1) {
      case '1':
        that.setData({ nature1: !that.data.nature1 })
        break;
      case '2':
        that.setData({ nature2: !that.data.nature2 })
        break;
      case '3':
        that.setData({ nature3: !that.data.nature3 })
        break;
      case '4':
        that.setData({ nature4: !that.data.nature4 })
        break;
      case '5':
        that.setData({ nature5: !that.data.nature5 })
        break;
      case '6':
        that.setData({ nature6: !that.data.nature6 })
        break;
    }

  },

  //筛选时间
  selectTime: function(options) {
    var that = this;
    that.setData({
      timeRangesActive: options.target.dataset.timerange
    })
  },
  


  //我的订阅
  mySubscribe: function() {
    var that = this;

    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/policyType?phone=' + that.data.phone,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          //关注地区
          if (res.data.reserveData.pd.address != '') {
            that.setData({
              district: res.data.reserveData.pd.address,
              districtActive: 0
            })
          }
          //时间范围
          that.setData({
            timeRangesActive: res.data.reserveData.pd.timetype + ''
          })
          //政策类型
          var type0 = res.data.reserveData.pd.type;
          if (type0.indexOf('1') != -1) {
            that.setData({ productTypeActive1: true })
          }
          if (type0.indexOf('2') != -1) {
            that.setData({ productTypeActive2: true })
          }
          if (type0.indexOf('3') != -1) {
            that.setData({ productTypeActive3: true })
          }
          if (type0.indexOf('4') != -1) {
            that.setData({ productTypeActive4: true })
          }
          if (type0.indexOf('5') != -1) {
            that.setData({ productTypeActive5: true })
          }
          if (type0.indexOf('6') != -1) {
            that.setData({ productTypeActive6: true })
          }
          if (type0.indexOf('7') != -1) {
            that.setData({ productTypeActive7: true })
          }
          if (type0.indexOf('8') != -1) {
            that.setData({ productTypeActive8: true })
          }
          //性质分类
          var nature0 = res.data.reserveData.pd.nature;
          if (nature0.indexOf('1') != -1) {
            that.setData({ nature1: true })
          }
          if (nature0.indexOf('2') != -1) {
            that.setData({ nature2: true })
          }
          if (nature0.indexOf('3') != -1) {
            that.setData({ nature3: true })
          }
          if (nature0.indexOf('4') != -1) {
            that.setData({ nature4: true })
          }
          if (nature0.indexOf('5') != -1) {
            that.setData({ nature5: true })
          }
          if (nature0.indexOf('6') != -1) {
            that.setData({ nature6: true })
          }
        }

      }
    })
  },


  //确认订阅
  confirmSubmit: function () {
    var that = this;

    var city0 = '';
    if (that.data.district!='其他地区'){
      city0 = that.data.district;
    }

    //政策类型
    var productType0 = '';
    if (that.data.productTypeActive1){
      productType0 = productType0 + 1 + ',';
      
    }
    if (that.data.productTypeActive2) {
      productType0 = productType0 + 2 + ',';

    }
    if (that.data.productTypeActive3) {
      productType0 = productType0 + 3 + ',';

    }
    if (that.data.productTypeActive4) {
      productType0 = productType0 + 4 + ',';

    }
    if (that.data.productTypeActive5) {
      productType0 = productType0 + 5 + ',';

    }
    if (that.data.productTypeActive6) {
      productType0 = productType0 + 6 + ',';

    }
    if (that.data.productTypeActive7) {
      productType0 = productType0 + 7 + ',';

    }
    if (that.data.productTypeActive8) {
      productType0 = productType0 + 8 + ',';

    }
    productType0 = productType0.replace(/,$/gi, '');
    

    //性质分类
    var nature0 = '';
    if (that.data.nature1) {
      nature0 = nature0 + 1 + ',';

    }
    if (that.data.nature2) {
      nature0 = nature0 + 2 + ',';

    }
    if (that.data.nature3) {
      nature0 = nature0 + 3 + ',';

    }
    if (that.data.nature4) {
      nature0 = nature0 + 4 + ',';

    }
    if (that.data.nature5) {
      nature0 = nature0 + 5 + ',';

    }
    if (that.data.nature6) {
      nature0 = nature0 + 6 + ',';

    }
    nature0 = nature0.replace(/,$/gi, '');
    

    //时间范围
    var timetype0 = '';
    if (that.data.timeRangesActive=='0'){
      timetype0 = 0;
    }
    if (that.data.timeRangesActive == '1') {
      timetype0 = 1;
    }
    if (that.data.timeRangesActive == '2') {
      timetype0 = 2;
    }
    if (that.data.timeRangesActive == '3') {
      timetype0 = 3;
    }
    if (that.data.timeRangesActive == '4') {
      timetype0 = 4;
    }

    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/addSubscribe',
      data: {
        'phone': that.data.phone,
        'city': that.data.location.district,
        'type': productType0,
        'policytype': nature0,
        'timetype': timetype0,
        'address': city0
      },
      header: { 'content-type': 'application/json' },
      success(res) {
        if (res.data.code == 0) {
          //获取数据，添加到全局
          app.globalData.navActive = 7;

          wx.switchTab({
            url: '../index/index'
          })
          
        }else{
          console.log('不成功');
        }
      }
    })

  }




})