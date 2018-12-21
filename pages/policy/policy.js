// pages/policy/policy.js

var util = require('../../utils/util.js');

Page({

  data: {
    searchNum: 0,   //查询次数为1后，就要登录
    phone: '',      //有手机号代表已登录
    keyword: '',
    highSearchShow: 'none',

    yearArr: ['请选择查询年度', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    yearIndex: 0,
    year: '',

    region: ['全部', '全部', '全部'],
    customItem: '全部',
    province: '',
    city: '',
    area: '',

    projectArr: ['请选择项目类型', '成果转化', '研发机构', '科技计划项目', '工程技术研究开发中心', '专利', '高新技术企业', '高新技术产品', '工程技术研究中心', '创新创业大赛', '众创空间', '知识产权', '企业研究开发财政补助', '科普基地', '科技创新券', '孵化器', '科学技术奖', '产学研', '重大科技专项'],
    projectIndex: 0,
    project: '',

    departmentArr: ['请选择主管部门', '惠州市科学技术局', '茂名市科学技术局', '东莞市科学技术局', '中华人民共和国工业和信息化部', '广州市花都区科技工业和信息化局', '中山市科学技术局', '广州市黄埔区科技工业商务和信息化局', '中华人民共和国科学技术部', '河源市科学技术局', '汕尾市科学技术局', '广州市番禺区科技工业商务和信息化局', '韶关市科学技术局', '广州市白云区科技工业商务和信息化局', '广州市科技创新委员会', '潮州市科学技术局', '揭阳市科学技术局', '云浮市科学技术局', '广州市从化区科技工业商务和信息化局', '广州开发区科技创新和知识产权局', '湛江市科学技术局', '广州市越秀区科技工业和信息化局', '汕头市科学技术局', '广东省科学技术厅', '阳江市科学技术局', '广州市增城区科技工业和信息化局', '广州市天河区科技工业和信息化局', '中华人民共和国人力资源和社会保障部', '深圳市科技创新委员会', '佛山市科学技术局', '珠海市科技和工业信息化局', '广州市南沙区工业和科技信息化局', '清远市科学技术局', '肇庆市科学技术局', '广州市海珠区科技工业商务和信息化局', '江门市科学技术局', '中华人民共和国国家发展和改革委员会', '梅州市科学技术局'],
    departmentIndex: 0,
    department: '',

    listDatas: [],

    //flag: 0普通搜索   1高级搜索
    flag: 0,
    showCount: 10  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      phone: wx.getStorageSync('phone'),
      keyword: options.keyword
    })
    //企业立项查询
    that.getPolicy();
  },
  
  onHide: function () {
    wx.hideLoading();
  },

  // 获取搜索框的value
  getValue: function (e) {
    var that = this;
    that.setData({
      keyword: e.detail.value
    })
  },

  // 获取数据
  getPolicy: function () {
    var that = this;
    if (that.data.phone == '' && that.data.searchNum == 1) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    //加载动画
    wx.showLoading({
      title: '加载中',
    })

    var url0;
    if (that.data.flag == 0) {
      url0 = 'https://www.hights.cn/beetl/subscribe/projectlib?keyword=' + that.data.keyword + '&showCount=' + that.data.showCount;
    } else if (that.data.flag == 1) {
      url0 = 'https://www.hights.cn/beetl/subscribe/projectlib?keyword=' + that.data.keyword + '&year=' + that.data.year + '&province=' + that.data.province + '&city=' + that.data.city + '&area=' + that.data.area + '&projecname=' + that.data.project + '&chargedept=' + that.data.department + '&showCount=' + that.data.showCount;
    }
    wx.request({
      url: url0,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {

          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].companyName = util.convertHtmlToText(res.data.data[i].companyName);
            res.data.data[i].province = util.convertHtmlToText(res.data.data[i].province);
            res.data.data[i].city = util.convertHtmlToText(res.data.data[i].city);
            res.data.data[i].area = util.convertHtmlToText(res.data.data[i].area);
            res.data.data[i].batch = util.convertHtmlToText(res.data.data[i].batch);
            res.data.data[i].type = util.convertHtmlToText(res.data.data[i].type);
            res.data.data[i].name = util.convertHtmlToText(res.data.data[i].name);
            res.data.data[i].quota = util.convertHtmlToText(res.data.data[i].quota);
            res.data.data[i].directorUnit = util.convertHtmlToText(res.data.data[i].directorUnit);
          }
          that.setData({
            searchNum: 1,
            listDatas: res.data.data
          });


          //隐藏加载动画
          wx.hideLoading();

        }
      }

    })
  },

  //高级搜索隐藏显示隐藏
  showHighSearch: function () {
    this.setData({
      highSearchShow: 'block'
    })
  },
  //高级搜索选择年度
  bindYearChange: function (e) {
    this.setData({
      yearIndex: e.detail.value
    })
  },
  //高级搜索地区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //高级搜索项目类型
  bindProjectChange: function (e) {
    this.setData({
      projectIndex: e.detail.value
    })
  },
  //高级搜索主管部门
  bindDepartmentChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value
    })
  },
  //高级搜索取消
  hideHighSearch: function () {
    this.setData({
      yearIndex: 0,
      region: ['全部', '全部', '全部'],
      projectIndex: 0,
      departmentIndex: 0,
      highSearchShow: 'none'
    })
  },
  //高级搜索确认
  confirmSearch: function () {
    var that = this;

    that.setData({
      highSearchShow: 'none',
      flag: 1
    });

    //查询年度
    that.data.year = that.data.yearArr[that.data.yearIndex];
    if (that.data.yearIndex == 0) {
      that.setData({
        year: ''
      })
    }

    //查询地区
    that.data.province = that.data.region[0];
    that.data.city = that.data.region[1];
    that.data.area = that.data.region[2];
    if (that.data.province == '全部') {
      that.setData({
        province: ''
      })
    }
    if (that.data.city == '全部') {
      that.setData({
        city: ''
      })
    }
    if (that.data.area == '全部') {
      that.setData({
        area: ''
      })
    }

    //查询项目类型
    that.data.project = that.data.projectArr[that.data.projectIndex];
    if (that.data.projectIndex == 0) {
      that.setData({
        project: ''
      })
    }

    //查询主管部门
    that.data.department = that.data.departmentArr[that.data.departmentIndex];
    if (that.data.departmentIndex == 0) {
      that.setData({
        department: ''
      })
    }

    that.getPolicy();

  },
  //上拉加载更多
  onReachBottom: function () {
    var that = this;
    that.setData({
      showCount: that.data.showCount + 10
    })
    that.getPolicy();
  }



})