Page({
  data:{
    // text:"这是一个页面"
    isHidden: true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var instance = getApp()
    // var value = wx.getStorageSync("tempSearch")
    // if (value) {
    //   this.setData({
    //     value : value
    //   })
    // }
    this.setData({
      apikey : instance.apikey,
      copyRight : instance.copyRight
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
  },
  searchSubmit: function(e) {
    /////////   无法通过splice()操作数组，缓存功能暂无法实现     /////////
    // var value = wx.getStorageSync("tempSearch")
    // if (value) {
    //   for (var i=0;i<value.length;i++) {
    //     if (value[i].cityname == e.detail.value.cityname) {
    //       value.splice(i,1)
    //     }
    //   }
    // }
    // wx.setStorage({
    //   key: "tempSearch",
    //   data: ""
    // })
    var that = this
    wx.request({
      url: "http://apis.baidu.com/apistore/weatherservice/citylist",
      data: {
        "cityname": e.detail.value.cityName
      },
      header: {
        "apikey": that.data.apikey
      },
      success: function(res) {
        var ifErr = res.data.errNum;
        if(ifErr == -1) {
          that.setData({
            isHidden : !that.data.isHidden
          })
        } else {
          var areaID = res.data.retData[0].area_id
          var cityname = res.data.retData[0].name_cn
          // var curTuple = {
          //   "cityname": e.detail.value.cityname,
          //   "areaid": areaID
          // }
          // value.splice(0,0,curTuple)
          // wx.setStorage({
          //   key: "tempSearch",
          //   data: value,
          //   success: function() {
              wx.navigateTo({
              url: "../weathermap/weathermap?areaid=" + areaID + "&cityname=" + cityname
              })
            // }
          // }         
        }
      }
    })
  },
  searchReset: function() {
    this.setData({
      searchKey: 0
    })
  },
  tapToHistory: function(data) {
    console.log(data)
  },
  toastHidden: function() {
    this.setData({
      isHidden : true,
    })
  }
})