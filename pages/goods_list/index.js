import { request } from '../../request/index.js'
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goodsList: []

  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getGoodsList()
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

  // 获取商品列表数据
  getGoodsList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: this.QueryParams
    }).then(res => {
      // 获取总条数
      let total = res.total
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
      
      this.setData({
        goodsList: [...this.data.goodsList, ...res.goods]
      })

      wx.stopPullDownRefresh()
        
    })
  },

  // 页面上滑  滚动条触底事件
  onReachBottom() {   
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多数据',
      })
    }else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }

  },

  // 上拉加载刷新
  onPullDownRefresh() {
    // 清空goodsList的数据
    this.setData({
      goodsList: []
    })
    // QueryParams接口参数的页码改为1
    this.QueryParams.pagenum = 1
    this.getGoodsList()

  }
    


})