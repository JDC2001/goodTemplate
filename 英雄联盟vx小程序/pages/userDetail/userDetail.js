var info = [];
var utils = require("../../utils/util.js");
var champion_list = [];
var infoArray=[];
Page({
  data:{
    //data
    battle_list:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    info.qquin = options.qquin;
    info.vaid = options.vaid;
    //get ChampionName
    wx.request({
      url: 'http://lolapi.games-cube.com/champion',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "DAIWAN-API-TOKEN":utils._TOKEN
      }, // 设置请求的 header
      success: function(res){
        // success
        if(res){
          for(var i of res.data.data){
              champion_list.push({
                id : i.id,
                ename : i.ename
              });
          }
        }
      }
    });
  },
  onReady:function(){
    var _this = this;
    // load user_info form server
    wx.request({
      url: 'http://lolapi.games-cube.com/CombatList?qquin='+info.qquin+'&vaid='+info.vaid+'&p=10',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "DAIWAN-API-TOKEN":utils._TOKEN
      }, // 设置请求的 header
      success: function(res){
        // success
        if(res){
           for(var i of res.data.data[0].battle_list){ 
              for(var j of champion_list){
                  if(i.champion_id === j.id){
                      infoArray.push({
                        name:j.ename,
                        win : i.win,
                        battle_map : i.battle_map,
                        game_mode : i.game_mode,
                        game_type : utils.getGameType(i.game_type),
                        game_id : i.game_id
                      });
                  }
              }
           }
           console.log(infoArray)
           _this.setData({
             battle_list:infoArray
           });
        }
      }
    })
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    //防止数据叠加
    infoArray = [];
    champion_list=[];
  },
  onUnload:function(){
    // 页面关闭
    //防止数据叠加
    champion_list=[];
    infoArray = [];
  }
})