// pages/znts/znts.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone0: '',
    display1: 'block',
    display2: 'none',
    companyname: '',
    address: '',
    field: '',
    multiArray: [['电子信息', '生物与新医药', '航空航天', '新材料', '高技术服务', '新能源与节能', '资源与环境', '先进制造与自动化'], ['','软件', '微电子技术', '通信技术', '广播影视技术', '新型电子元器件', '信息安全技术','智能交通和轨道交通技术']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '电子信息'
        },
        {
          id: 1,
          name: '生物与新医药'
        },
        {
          id: 2,
          name: '航空航天'
        },
        {
          id: 3,
          name: '新材料'
        },
        {
          id: 4,
          name: '高技术服务'
        },
        {
          id: 5,
          name: '新能源与节能'
        },
        {
          id: 6,
          name: '资源与环境'
        },
        {
          id: 7,
          name: '先进制造与自动化'
        },
      ], [
        {
          id: 0,
          name: ''
        },
        {
          id: 1,
          name: '软件'
        },
        {
          id: 2,
          name: '微电子技术'
        },
        {
          id: 3,
          name: '通信技术'
        },
        {
          id: 4,
          name: '广播影视技术'
        },
        {
          id: 5,
          name: '新型电子元器件'
        },
        {
          id: 6,
          name: '信息安全技术'
        },
        {
          id: 7,
          name: '智能交通和轨道交通技术'
        },
      ]
    ],
    multiIndex: [0, 0],
    contacts: '',
    phone: '',
    hobby: '',
    region: ['*省份', '*城市', '*地区'],
    customItem: '全部',
    listDatas: []

  },
  onLoad: function() {
    var that = this;
    that.showListDatas();
  },
  onShow: function() {
    var that =this;
    //获取本地储存的数据
    that.setData({
      phone0: wx.getStorageSync('phone'),
    })
    that.showListDatas();
  },
  onHide: function() {
    var that = this;
    wx.hideToast();
  },
  getValue1: function (e) {
    var that = this;
    that.setData({
      companyname: e.detail.value
    })

  },
  getValue2: function (e) {
    var that = this;
    that.setData({
      address: e.detail.value
    })

  },
  getValue3: function (e) {
    var that = this;
    that.setData({
      contacts: e.detail.value
    })

  },
  getValue4: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })

  },
  getValue5: function (e) {
    var that = this;
    that.setData({
      field: e.detail.value
    })

  },
  getValue6: function (e) {
    var that = this;
    that.setData({
      hobby: e.detail.value
    })

  },

  bindMultiPickerChange: function (e) {
    var that = this;
    that.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    var data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
   
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['','软件', '微电子技术', '通信技术', '广播影视技术', '新型电子元器件', '信息安全技术', '智能交通和轨道交通技术'];
            break;
          case 1:
            data.multiArray[1] = ['医药生物技术', '中药、天然药物', '化学药研发技术', '药物新剂型与制剂创制技术', '医疗仪器、设备与医学专用软件', '轻工和化工生物技术','农业生物技术'];
            break;
          case 2:
            data.multiArray[1] = ['航空技术', '航天技术'];
            break;
          case 3:
            data.multiArray[1] = ['金属材料', '无机非金属材料','高分子材料','生物医用材料','精细和专用化学品','与文化艺术相关的新材料'];
            break;
          case 4:
            data.multiArray[1] = ['研发与设计服务', '检验检测认证与标准服务', '信息技术服务', '高技术专业化服务', '知识产权与成果转化服务', '电子商务与现代物流技术','城市管理与社会服务','文化创意产业支撑技术'];
            break;
          case 5:
            data.multiArray[1] = ['可再生清洁能源', '核能及氢能', '新型高效能量转换与储存技术', '高效节能技术'];
            break;
          case 6:
            data.multiArray[1] = ['水污染控制与水资源利用技术', '大气污染控制技术', '固体废弃物处置与综合利用技术', '物理性污染防治技术', '环境监测及环境事故应急处理技术', '生态环境建设与保护技术', '清洁生产技术','资源勘查、高效开采与综合利用技术'];
            break;
          case 7:
            data.multiArray[1] = ['工业生产过程控制系统', '安全生产技术', '高性能、智能化仪器仪表', '先进制造工艺与装备', '新型机械', '电力系统与设备', '汽车及轨道车辆相关技术', '高技术船舶与海洋工程装备设计制造技术','传统文化产业改造技术'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;

    }

    that.setData(data);
    that.setData({
      field: data.multiArray[0][data.multiIndex[0]] + ';' + data.multiArray[1][data.multiIndex[1]]
    })
  },

  //注册地区选择
  regionChange: function(e) {
    var that = this;
    that.setData({
      region: e.detail.value
    })

  },

  submit: function() {
    var that = this;
    if(that.data.phone0==''){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      var companyname1 = that.data.companyname;
      var province1 = that.data.region[0];
      var city1 = that.data.region[1];
      var area1 = that.data.region[2];
      var address1 = that.data.address;
      var field1 = that.data.field;
      var contacts1 = that.data.contacts;
      var phone1 = that.data.phone;
      var hobby1 = that.data.hobby;
      if (companyname1 == '') {
        wx.showToast({
          title: '请填写企业名称',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (province1 == '*省份' || province1 == '全部') {
        wx.showToast({
          title: '请选择省份',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (city1 == '*城市' || city1 == '全部') {
        wx.showToast({
          title: '请选择城市',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (area1 == '*地区' || area1 == '全部') {
        wx.showToast({
          title: '请选择地区',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if (field1 == '') {
        wx.showToast({
          title: '请选择技术领域',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      field1 = field1.replace(/;/gi, ' ');
      wx.request({
        url: 'https://www.hights.cn/beetl/subscribe/addAnddelPush',
        data: {
          enterprisename: companyname1,
          province: province1,
          city: city1,
          area: area1,
          detailaddress: address1,
          regType: field1,
          phone: phone1,
          contacts: contacts1,
          createId: that.data.phone0,
          interesteContext: hobby1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          }


          that.setData({
            display1: 'none',
            display2: 'block',
          })
          that.showListDatas();
        }

      })
    }

  },

  showListDatas: function() {
    var that = this;
    wx.request({
      url: 'https://www.hights.cn/beetl/subscribe/PushlistPage',
      data: {
        createId: that.data.phone0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          var datas = res.data.data;
          for (var i = 0; i < datas.length; i++){
            datas[i].createdate = util.timestampToTime(datas[i].createdate);
          }
          that.setData({
            listDatas: datas
          })
          that.setData({
            display1: 'none',
            display2: 'block',
          })
        }else if (res.data.code == -1) {
          that.setData({
            display1: 'block',
            display2: 'none',
          })
        }
      }

    })
  },
  changeMessage: function() {
    var that = this;
    that.setData({
      display1: 'block',
      display2: 'none'
    })

  }
  
})