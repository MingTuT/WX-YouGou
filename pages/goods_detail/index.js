import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  // 全局商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)
  },

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);


  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
  // 点击轮播图预览放大功能
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(value => value.pics_mid)
    const current = e.currentTarget.dataset.url
    
    wx.previewImage({
      current: urls[current],
      urls
    });
      
  },
  // 加入购物车
  handleCartAdd() {
    // 获取缓存中购物车商品数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断商品对象是否已经存在于购物车数组中
    let index = cart.findIndex(value => value.goods_id === this.GoodsInfo.goods_id)
    if(index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    }else {
      cart[index].num++
    }
    // 把数据添加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹出提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });
  },
  // 点击 商品收藏图标
  handleCollect() {
    let isCollect = false
    // 1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 2 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    // 3 当index！=-1表示 已经收藏过 
    if(index !== -1) {
      collect.splice(index, 1)
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else {
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
     // 4 把数组存入到缓存中
     wx.setStorageSync("collect", collect);
     // 5 修改data中的属性  isCollect
     this.setData({
       isCollect
     })
    
  }


})