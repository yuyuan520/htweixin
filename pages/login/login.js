// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password:'',
    codeText: '获取验证码',
    flag: true,
    code: ''
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      phone: wx.getStorageSync('phone')
    })

  },
  
  // 获取手机号
  getPhone: function(e) {
    var that = this;
    var phone0 = e.detail.value;
    that.setData({
      phone: phone0.replace(/\s*/g,'')
    }); 

  },
  // 获取密码
  getpassword: function (e) {
    var that = this;
    var password0 = e.detail.value;
    that.setData({
      password: password0.replace(/\s*/g, '')
    });

  },
  // //点击获取验证码
  // getCode: function() {
  //   var that = this;
  //   var phone1 = that.data.phone;
  //   if (!(/^1[34578]\d{9}$/.test(phone1))){
  //     wx.showToast({
  //       title: '请填写正确的手机号',
  //       icon: 'none',
  //       duration: 1500
  //     })  
  //   }else{
  //     var n = 59;
  //     var timer = setInterval(function () {
  //       if (n < 0) {
  //         clearInterval(timer);
  //         that.setData({
  //           codeText: '获取验证码',
  //           flag: true
  //         });
  //       } else {
  //         that.setData({
  //           codeText: n + 's',
  //           flag: false
  //         });
  //         n--;
  //       }
  //     }, 1000);

  //     wx.request({
  //       url: 'https://www.hights.cn/beetl/subscribe/sendWeixinCode',
  //       data: {phone:phone1},
  //       header: {
  //         'content-type': 'application/json' // 默认值
  //       },
  //       success(res) {
  //         if(res.data.code == 0){
  //           wx.showToast({
  //             title: '验证码发送成功',
  //             icon: 'none',
  //             duration: 1500
  //           })
  //         }else{
  //           wx.showToast({
  //             title: res.data.msg,
  //             icon: 'none',
  //             duration: 1500
  //           });
  //           clearInterval(timer);
  //           that.setData({
  //             codeText: '获取验证码',
  //             flag: true
  //           });
  //         }
  //       }

  //     })

  //   }
  // },
  // 获取用户输入验证码的值
  getCodeValue: function (e) {
    var code0 = e.detail.value;
    this.setData({
      code: code0.replace(/\s*/g, '')
    });

  },
  //登录
  loginSubmit: function() {
    var that = this;
    var phone1 = that.data.phone;
    var password1 = that.data.password;
    var code1 = that.data.code;
    if (!(/^1[34578]\d{9}$/.test(phone1))) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    
    // if (!code1){
    //   wx.showToast({
    //     title: '请填写验证码',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    // }

    wx.request({
      
      // url: 'https://localhost:8090/beetl/subscribe/weixinAppLogin?phone='+phone1+'&password='+password1,
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      url: 'http://localhost:8090/beetl/subscribe/weixinAppLogin',
      data: { phone: phone1,
        password: password1},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0){
          //同步储存
          wx.setStorageSync('phone',phone1);
        
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