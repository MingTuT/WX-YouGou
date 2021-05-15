import { request } from '../../request/index.js'

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 左侧菜单选中索引
    currentIndex: 0,
    // 右侧商品数据
    rightContent: [],
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地获取cates分类数据
    let cates = wx.getStorageSync('cates')
    if (!cates) {
      // 如果不存在数据，发送请求
      this.getCates()
    } else {
      if (Date.now() - cates.time > 300 * 1000) {
        // 存在本地数据 但过期 发送请求
        this.getCates()
      } else {
        // 存在本地数据 且 未过期
        this.Cates = cates.data
        let leftMenuList = this.Cates.map(value => value.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },

  // 获取分类数据
  getCates() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res => {
      this.Cates = res
      wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
      let leftMenuList = this.Cates.map(value => value.cat_name)
      let rightContent = this.Cates[0].children

      this.setData({
        leftMenuList,
        rightContent
      })
    })

  },
  // 左侧菜单栏点击事件
  handleItemTap(e) {
    let { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
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