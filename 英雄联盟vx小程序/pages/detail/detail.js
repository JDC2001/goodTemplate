var util = require('../../utils/util.js');
var img = [];
Page({
  data:{
     detail:[]  
  },
  onLoad:function(options){
    var _this = this;
    console.log("run");
    var id = options.id;
    wx.setNavigationBarTitle({
        title : "详细信息"
    });
    console.log("request");
    wx.request({
        url : "http://news-at.zhihu.com/api/4/news/" + id,
        header: {
            'Content-Type': 'application/json'
        },
        success:function(res){
            console.log(res);
            img.push({
                img : util.translateURL(res.data.image),
                title : res.data.title,
                imgsource: res.data.image_source
            });
            if(res){
                _this.setData({
                    detail : [{"infoBody" : util.delHtml(res.data.body)}].concat(img)
                });
            }
          
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
    img = [];
  },
  onUnload:function(){
    // 页面关闭
    img = [];
  }
})