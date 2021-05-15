import { request } from "../../request/index.js";

// pages/search/index.js
Page({

  data: {
    // 输入框的值
    inpValue: "",
    goods:[],
    isFocus:false
  },
  TimeId: -1,
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    const {value} = e.detail
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId)
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);

  },
   // 发送请求获取搜索建议 数据
   async qsearch(query){
    const res = await request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
      data: {query}
    })
    this.setData({
      goods:res
    })

  },
  // 点击 取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }

})