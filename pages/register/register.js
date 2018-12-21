// pages/register/register.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password:'',
    repassword:'',
    imgCode: '',
    codeText: '获取验证码',
    ImgCodeText:'',
    flag: true,
    code: '',
    isChecked: false,
    next:'',
    code:'',
    info:''

  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      phone: wx.getStorageSync('phone'),
      password: wx.getStorageSync('password'),
      repassword: wx.getStorageSync('repassword'),
      imgCode: wx.getStorageSync('imgCode')
    })

  },
  // 用户注册验证
  // getPassword: function (e) {
  //   var that = this;
  //   var password0 = e.detail.value;
  //   if (password0 == '' && !(/^1[34578]\d{9}$/.test(phone1))){
  //     wx.showToast({
  //       title: '请填写正确的手机号',
  //       icon: 'none', 
  //       duration: 1500
  //     }) 
  //   }
  // },
  // 获取手机号
  getPhone: function(e) {
    var that = this;
    var phone0 = e.detail.value;
    that.setData({
      phone: phone0.replace(/\s*/g,'')
    }); 

  },
  // 获取密码
  getPassword:function(e) {
    var that = this;
    var password0 = e.detail.value;
    that.setData({
      password: password0.replace(/\s*/g, '')
    });
  },
  // 获取确认密码
  getrePassword: function (e) {
    var that = this;
    var repassword0 = e.detail.value;
    that.setData({
      repassword: repassword0.replace(/\s*/g, '')
    });
  },
  // 获取图形验证码
  gettxtCode: function (e){
    var that = this;
    var imgCode0 = e.detail.value;
    that.setData({
      imgCode: imgCode0.replace(/\s*/g,'')
    })
  },
  // 获取文字验证码的值
  getTextValue: function (e) {
    var imgCode0 = e.detail.value;
    this.setData({
      imgCode1: imgCode0.replace(/\s*/g, '')
    });
  },
  // 获取用户输入验证码的值
  getCodeValue: function (e) {
    var code0 = e.detail.value;
    this.setData({
      code: code0.replace(/\s*/g, '')
    });
  },


  // 发送图形验证码
  changeCode:function () {
    var that = this;
    var imgCode1 = that.data.imgCode
    wx.request({
      url: 'https://www.hights.cn/code.do?t=' + new Date().getTime(),
      data: { imgCode: imgCode1 },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '验证成',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });
          clearInterval(timer);
          that.setData({
            codeText: '获取验证码',
            flag: true
          });
        }
      }
    })

  },


  //点击获取短信验证码
  getCode: function() {
    var that = this;
    var phone1 = that.data.phone;
    var imgCode1 = that.data.imgCode;
    var password1 = that.data.password;
    var repassword1 = that.data.repassword;
    if (!(/^1[34578]\d{9}$/.test(phone1))){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1500
      })  
      return false;
    } else if (password1 == ''){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    else if (repassword1 == '' && repassword1 !== password1) {
      wx.showToast({
        title: '确认密码错误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    else if (imgCode1 == ''){
      wx.showToast({
        title: '图形验证码不能为空',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    else{
      var n = 59;
      var timer = setInterval(function () {
        if (n < 0) {
          clearInterval(timer);
          that.setData({
            codeText: '获取验证码',
            flag: true
          });
        } else {
          that.setData({
            codeText: n + 's',
            flag: false
          });
          n--;
        }
      }, 1000);
      wx.request({
        url: 'http://www.hights.cn/beetl/reg/sendPhoneCode.do',
        // url:'https://www.hights.cn/beetl/subscribe/sendWeixinCode',
        data: {
          phone: phone1,
          imgCode: imgCode1
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-from-urlencoded' // 默认值
        },
        success(res) {
          if(res.data.code == 0){
            wx.showToast({
              title: '验证码发送成功',
              icon: 'none',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            });
            clearInterval(timer);
            that.setData({
              codeText: '获取验证码',
              flag: true
            });
          }
        }
      })

    }
  },
 
  //注册按钮
  registerSubmit: function() {
    var that = this;
    var phone1 = that.data.phone;
    var password1 = that.data.password;
    var repassword1 = that.data.repassword;
    var imgCode1 = that.data.imgCode
    var code1 = that.data.code;
    if (!(/^1[34578]\d{9}$/.test(phone1))) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (password1==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if(password1 !== repassword1){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    // if (imgCode1 == ''){
    //   wx.showToast({
    //     title: '图形验证码不能为空',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    // }
    // if (imgCode1 == '') {
    //   wx.showToast({
    //     title: '图形验证码不能为空',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    // }
    if (!code1){
      wx.showToast({
        title: '请验证码',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    wx.request({
      url: 'https://www.hights.cn/beetl/reg/regGeneraluser.do',
      data: {
        phone: phone1,
        password: password1,
        repassword: repassword1,
        imgCode: imgCode1,
        code: code1

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration: 1500
          })
          //同步储存
          wx.setStorageSync('phone',phone1);
          wx.showToast({
            title: '请验证码',
            icon: 'none',
            duration: 1500
          })
          wx.switchTab({
            url: '../personal/personal',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }

          })
        }
      }

    })

  }


})