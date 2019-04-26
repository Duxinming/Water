let app = getApp()
const citys = {
  '南区': ['南一', '南二', '南三', '南四', '南五', '南六', '南七', '南八', '南九', '南十', '南十一', '南十二'],
  '北区': ['北一', '北二', '北三', '北四', '北五', '北六', '北七', '北八', '北九', '北十']
};
const storey = {
  '楼层': ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼']
}
// pages/mission/mission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: 'right',
    length: 3,
    large: 'large',
    uesrNum: null,

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
    showLocal: '请选择寝室楼',

    showTime: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    showDate: new Date(new Date().getTime()),

    showSuccess: false,
    showFail: false,
    showLocalFail: false,
    showNumFail: false,

    localhost: app.globalData.localhost,
    openid: null
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
      uesrNum: e.detail
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
  changeSuccess() {
    this.setData({
      showSuccess: true
    })
  },
  changeFail() {
    this.setData({
      showFail: true
    })
  },
  changeLocalFail() {
    this.setData({
      showLocalFail: true
    })
  },
  changeNumFail() {
    this.setData({
      showNumFail: true
    })
  },
  onCloseSuccess() {
    this.setData({
      showSuccess: false
    })
  },
  onCloseFail() {
    this.setData({
      showFail: false
    })
  },
  onCloseLocalFail() {
    this.setData({
      showLocalFail: false
    })
  },
  onCloseNumFail() {
    this.setData({
      showNumFail: false
    })
  },
  //提交表单
  submit() {
    let that = this
    if (this.data.showLocal === '请选择寝室楼' && this.data.uesrNum === null) {
      this.changeLocalFail()
    } if (this.data.showLocal === '请选择寝室楼' && this.data.uesrNum !== null) {
      this.changeLocalFail()
    } if (this.data.uesrNum === null && this.data.showLocal !== '请选择寝室楼') {
      this.changeFail()
    } if (this.data.showLocal !== '请选择寝室楼' && this.data.uesrNum !== null) {

      wx.request({
        url: 'http://' + that.data.localhost + ':3000/upArticle',
        data: {
          time: this.data.showDate,
          local: this.data.showLocal,
          num: this.data.uesrNum,
          openid: this.data.openid
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          that.changeSuccess()
        },
        fail(res) {
          that.changeFail()
        }
      })
    }
  },

  flag() {
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
              let openId = res.data.openid
              that.setData({
                openid: openId
              })
            }
          })
        } else {
          console.log('授权失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onCloseAndGetValue();
    this.flag()
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