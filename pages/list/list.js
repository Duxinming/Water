// pages/mission/mission.js
let app = getApp();
const citys = {
  '南区': ['南一', '南二', '南三', '南四', '南五', '南六', '南七', '南八', '南九', '南十', '南十一', '南十二'],
  '北区': ['北一', '北二', '北三', '北四', '北五', '北六', '北七', '北八', '北九', '北十']
};
const storey = {
  '楼层': ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼']
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: 'right',
    length: 3,
    large: 'large',
    userNum: null,

    currentLocal: false,
    columns: [
      {
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['南区'],
        className: 'column2',
        defaultIndex: 0
      },
      {
        values: storey['楼层'],
        className: 'column3',
        defaultIndex: 0
      }
    ],
    showLocal: '请选择公寓楼',

    showTime: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2019, 1, 1).getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    showDate: new Date(new Date().getTime()),
    showFail: false,
    article: [],
    localhost: app.globalData.localhost,
    flag: false
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
    return { picker, value, index }
  },
  //弹出寝室楼选择器
  showLocal() {
    this.setData({ currentLocal: true });
  },
  //关闭寝室楼选择器
  onCloseLocal() {
    this.setData({ currentLocal: false });
  },
  //点击确定时关闭寝室选择器并获取信息
  onCloseAndGetLocal(a, index) {
    this.setData({
      currentLocal: false,
      showLocal: a.detail.value
    });
  },
  //改变寝室号
  changeNum(e) {
    this.setData({
      userNum: e.detail
    })
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  //弹出时间选择器
  showTime() {
    this.setData({ showTime: true });
  },
  //关闭时间选择器
  onCloseTime() {
    this.setData({ showTime: false });
  },
  //点击确定时关闭时间选择器并获取选择时间
  onCloseAndGetValue() {
    let that = this;
    function getdate(a) {
      a = that.data.currentDate;
      var now = new Date(a),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " ";
    }
    this.setData({
      showTime: false,
      showDate: getdate()
    });
  },

  //弹出或关闭弹出层
  changeFail() {
    this.setData({
      showFail: true
    })
  },
  onCloseFail() {
    this.setData({
      showFail: false
    })
  },

  //取所有数据
  getArtilce() {
    let that = this
    wx.request({
      url: 'http://' + that.data.localhost + ':3000/getArticle', // 仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          article: res.data.reverse()
        })
      },
      false(res) {

      }
    })
  },
  //搜索
  searchTime() {
    let that = this
    console.log(111)
    wx.request({
      url: 'http://' + that.data.localhost + ':3000/searchTime', // 仅为示例，并非真实的接口地址
      data: {
        time: that.data.showDate,
        local: that.data.showLocal,
        num: that.data.userNum
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          article: res.data.reverse()
        })
      },
      false(res) {
        console.log(1)
      }
    })
  },
  searchTimeAndLocal() {
    let that = this
    wx.request({
      url: 'http://' + that.data.localhost + ':3000/searchTimeAndLocal', // 仅为示例，并非真实的接口地址
      data: {
        time: that.data.showDate,
        local: that.data.showLocal,
        num: that.data.userNum
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          article: res.data.reverse()
        })
      },
      false(res) {

      }
    })
  },
  searchTimeAndNum() {
    let that = this
    wx.request({
      url: 'http://' + that.data.localhost + ':3000/searchTimeAndNum', // 仅为示例，并非真实的接口地址
      data: {
        time: that.data.showDate,
        local: that.data.showLocal,
        num: that.data.userNum
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          article: res.data.reverse()
        })
      },
      false(res) {

      }
    })
  },
  searchAll() {
    let that = this
    wx.request({
      url: 'http://' + that.data.localhost + ':3000/searchAll', // 仅为示例，并非真实的接口地址
      data: {
        time: this.data.showDate,
        local: this.data.showLocal,
        num: this.data.userNum
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          article: res.data.reverse()
        })
      },
      false(res) {

      }
    })
  },

  search() {
    let that = this
    if (that.data.userNum === null) {
      if (that.data.showLocal === '请选择寝室楼') {
        that.searchTimeAndLocal()
      } else {
        that.searchTime()
      }
    } else {
      if (that.data.showLocal === '请选择寝室楼') {
        that.searchAll()
      } else {
        that.searchTimeAndNum()
      }
    }
  },
  //验证flag
  flag() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        wx.request({
          url: 'http://' + that.data.localhost + ':3000/checkFlag',
          data: { openid: res.data },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data === 'ok') {
              that.setData({
                flag: true
              })
            } else {
              console.log(0)
              that.setData({
                flag: false
              })
            }
          },
          fail(res) {
          }
        })
      },
      fail() {
        console.log(0)
      }
    })
  },

  down(event) {
    let that = this
    let index = event.currentTarget.dataset.index;
    if (!this.data.flag) {
      wx.showModal({
        title: '提示',
        content: '此功能只能送水的哥们操作，你只能看着',
        showCancel: false
      })
      return
    }
    if (event.currentTarget.dataset.down) {
      wx.showModal({
        title: '提示',
        content: '此订单已经被确认！',
        showCancel: false
      })
      return
    }
    if (!event.currentTarget.dataset.down) {
      let article = this.data.article
      wx.showModal({
        title: '提示',
        conrent: '是否确定订单已经完成？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: 'http://' + that.data.localhost + ':3000/down',
              data: {
                id: event.currentTarget.dataset.id,
                down: 1
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res);
                if (res.data.code) {
                  article[index].down = 1;
                  that.setData({
                    article: article
                  })
                }
              }, false(res) {

              }
            })
          }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onCloseAndGetValue();
    this.flag();
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
    this.getArtilce()
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