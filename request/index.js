let ajaxTimes = 0
export const request = (params) => {
    // 显示加载框
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    ajaxTimes++
    // const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            // url:baseUrl+params.rl,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if(ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}