var utils = require("../../utils/util.js");
var storesInfo=[];
Page({
  data:{
    "hidden" : true,
    "toast1Hidden":true,
    "slide":{
        "imgUrls":[
          "http://images.17173.com/2012/news/2012/07/02/gxy0702dp05s.jpg",
          "http://img3.3lian.com/2013/s2/65/d/27.jpg",
          "http://images.17173.com/2014/news/2014/08/16/mj0816aw04s.jpg",
          "http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1211/13/c1/15727708_1352797288594_800x600.jpg"
        ],
        "indicator-dots" : false,
        "autoplay" : true,
        "interval" : 5000,
        "duration" : 1000,
    },
    lolData:[],
    p2Data:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    _this.setData ({
      "hidden":false
    });
    console.log("index->request");
    wx.request({                                                      //request
      url : "http://news-at.zhihu.com/api/4/news/latest",
      header: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        if(res){
            for(var i of res.data.stories){
              storesInfo.push({
                id : i.id,
                title : i.title,
                img : utils.translateURL(i.images[0])
              });
            }
            _this.setData({
               lolData : storesInfo,
               "hidden":true
            });
        }
      },
      fail:function(){
        setTimeout(_this.setData({
          "hidden":true,
          "toast1Hidden":false
        }),10000);
      }
    });
  },
  onReady:function(){
   
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
  onPullDownRefresh:function(){
    var _this = this;
    _this.setData ({
      "hidden":false
    });
    wx.request({                                                      //request refresh
      url : "http://news-at.zhihu.com/api/4/news/latest",
      header: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        if(res){
            for(var i of res.data.stories){
              storesInfo.push({
                id : i.id,
                title : i.title,
                img : utils.translateURL(i.images[0])
              });
            }
            _this.setData({
               lolData : storesInfo,
               "hidden":true
            });
        }
      },
      fail:function(){
        setTimeout(_this.setData({
          "hidden":true,
          "toast1Hidden":false
        }),10000);
      }
    });
  }
});
