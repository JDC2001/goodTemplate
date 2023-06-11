var getParam = {};
var heroInfo = {};

var utils = require("../../utils/util.js");

Page({
  data:{
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    getParam.id = options.id;
    getParam.param = options.param
  },
  onReady:function(){
    var _this = this;
    console.log("hero->request");
    // 页面渲染完成
    wx.request({
      url:"http://lolapi.games-cube.com/GetChampionDetail?champion_id="+ getParam.id,
      method:"get",
      header:{
        'Content-Type': 'application/json',
        'DAIWAN-API-TOKEN': utils._TOKEN
      },
      success:function(resp){
        console.log(resp.data.data[0]);
        _this.setData(resp.data.data[0]);
      }

    });
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