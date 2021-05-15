// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取用户登录信息
  getUserProfile(e) {
    // const {userInfo} = e.detail
    // wx.setStorageSync('userInfo', userInfo)
    // wx.navigateBack({
    //   delta: -1
    // })

    wx.getUserProfile({
      desc: '用于完成用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.navigateBack({
          delta: -1
        })
      }
    })
    
  }

  
})