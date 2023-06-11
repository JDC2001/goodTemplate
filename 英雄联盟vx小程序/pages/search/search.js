var keyWord= {};
var area = [];
var userInfo = [];
var utils = require("../../utils/util.js");
Page({
  data:{
    // text:"这是一个页面"
    loading:true,
    modal:true,
    userInfo:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    console.log("search->request");
    //load area info
    wx.request({
        url : "http://lolapi.games-cube.com/Area",
        method : "get",
        header:{
            'Content-Type': 'application/json',
            'DAIWAN-API-TOKEN': utils._TOKEN
        },
        success:function(resp){
            if(resp){
                for(var i in resp.data.data){
                    area.push({
                        aName : resp.data.data[i].name,
                        aid   : resp.data.data[i].id,
                        isp   : resp.data.data[i].isp
                    });
                }
            }
        }
    });
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
  searchFn:function(e){
      var _this = this;
      //清除数组，防止历史数据遗留
      userInfo.length  = 0;
      if(keyWord.key){
        _this.setData({
            loading : false
        });
        console.log("searcg->request");
        wx.request({
            url : "http://lolapi.games-cube.com/UserArea?keyword=" + keyWord.key,
            method : "get",
            header:{
                'Content-Type': 'application/json',
                'DAIWAN-API-TOKEN': utils._TOKEN
            },
            success:function(resp){
                console.log(resp);
                var infoData = resp.data.data;
                for(var i in infoData){
                    userInfo.push({
                        area_id : infoData[i].area_id,
                        aArea : area[infoData[i].area_id-1].aName,
                        level : infoData[i].level,
                        name  : infoData[i].name,
                        qquin : infoData[i].qquin,
                        queue : infoData[i].queue, //当前段位几
                        tier  : infoData[i].tier, //rank段位
                        dwname : utils.dwTools(infoData[i].queue,infoData[i].tier)
                    });
                }
                _this.setData({
                    loading : true,
                    userInfo : userInfo
                });
            }
        });
      }else{
          _this.setData({
              modal:false
          });
      }
  },
  inputKey:function(e){
      keyWord.key = e.detail.value;
  },
  modalChange:function(){
      var _this = this;
      _this.setData({
          modal:true
      });
  }
})