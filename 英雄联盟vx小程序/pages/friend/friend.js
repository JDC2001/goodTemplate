var utils = require("../../utils/util.js");

Page({
  data:{
    free:[],
    rank:[],
    fnGroup:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    console.log("friend -> request");
    // 页面渲染完成
    wx.request({                                                    //request
      url : "http://lolapi.games-cube.com/Free",
      method : "get",
      header:{
        'Content-Type': 'application/json',
        'DAIWAN-API-TOKEN': utils._TOKEN
      },
      success:function(resp){
        var fData = resp.data.data[0];
        var sData = [];
        for(var i in fData){
          sData.push({
              name : fData[i].name +" "+ fData[i].title,
              id  : fData[i].key,
              pic : fData[i].image.full
            });
        }
        _this.setData({
            free:sData
        });
      }
    });
  },
  onReady:function(){
    //console.log(this.data);
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
  clickFn:function(e){
    var _this = this;
    var im = ["free","rank"];
    var id = e.currentTarget.id;
    var datas = {};
    for(var i = 0 ; i < im.length ; i++){
      datas[im[i] + "show"] = false;
    }
    datas[id + 'show'] = !this.data.fnGroup[id + 'show'];
    _this.setData({
      fnGroup : datas
    });
  }
})