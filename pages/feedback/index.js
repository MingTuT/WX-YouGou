// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 根据索引 切换活跃状态
  tabsItemChange(e) {
    let index = e.detail
    let tabs=this.data.tabs
    tabs.forEach((v, i) => {
      index === i ? v.isActive = true : v.isActive = false
    })

    this.setData({
      tabs
    })
  },
  // 点击 “+” 选择图片
  handleChooseImg() {
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    })

  },
  // 点击 自定义图片组件
  handleRemoveImg(e) {
    const {index} = e.currentTarget.dataset
    let {chooseImgs} = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  }
  
})