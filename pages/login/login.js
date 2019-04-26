let app = getApp();

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    localhost: app.globalData.localhost,
    openid: null
  },
  bindGetUserInfo() {
    this.getCodeAndlogin()
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            show: true
          })
        } else {
          wx.switchTab({
            url: '/pages/list/list'
          })
        }
      }
    })
  },

  getCodeAndlogin() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://' + that.data.localhost + ':3000/getCode',
            data: {
              code: res.code
            },
            method: 'GET',
            success(res) {
              let openid = res.data.openid
              let session_key = res.data.session_key
              wx.getUserInfo({
                success(res) {
                  const userInfo = res.userInfo
                  wx.request({
                    url: 'http://' + that.data.localhost + ':3000/upUserInfo',
                    data: {
                      userinfo: userInfo,
                      openid: openid,
                      session_key: session_key
                    },
                    method: 'POST',
                    success(res) {
                      wx.setStorage({
                        key: 'key',
                        data: openid,
                        success(res) {
                          console.log(1)
                        }
                      })
                    }, fail() {
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  getStorage() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        wx.switchTab({
          url: '/pages/list/list'
        })
      },
      fail() {
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: 'http://' + that.data.localhost + ':3000/getCode',
                data: {
                  code: res.code
                },
                method: 'GET',
                success(res) {
                  let openid = res.data.openid
                  wx.setStorage({
                    key: 'key',
                    data: openid,
                    success(res) {
                      wx.switchTab({
                        url: '/pages/list/list'
                      })
                    }
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  getSetting() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            show: true
          })
        } else {
          that.getStorage()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSetting()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})