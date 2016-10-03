Page({
  data:{
    // text:"这是一个页面"
    cityname: "Hangzhou",
    // 天气类型映射对象，以便于获取图片
    typeMapper: {
      "晴":"sunny",
      "多云": "partlyCloudy",
      "阴": "cloudy",
      "阵雨": "shower",
      "雷阵雨": "thunderStorm",
      "小雨": "rainy",
      "雾": "fog",
      "霾": "cloudFog"
    }
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    // areaid cityname
    wx.request({
      url: "http://apis.baidu.com/apistore/weatherservice/recentweathers",
      header: {
        "apikey": getApp().apikey
      },
      data: {
        "cityid": options.areaid,
        "cityname": options.cityname
      },
      success: function(res) {
        console.log(res.data)
        var today = res.data.retData.today
        var forecast = res.data.retData.forecast
        that.setData({
          cityname: options.cityname,
          today : today,
          forecast : forecast,
          copyRight : getApp().copyRight
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})