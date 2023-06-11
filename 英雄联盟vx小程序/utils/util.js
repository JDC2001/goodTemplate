//段位二维数组
var dw = [
  ["钻石1","钻石2","钻石3","钻石4","钻石5"],
  ["铂金1","铂金2","铂金3","铂金4","铂金5"],
  ["黄金1","黄金2","黄金3","黄金4","黄金5"],
  ["白银1","白银2","白银3","白银4","白银5"],
  ["青铜1","青铜2","青铜3","青铜4","青铜5"]
];

//游戏模式
var gameType = ["自定义","新手关","匹配赛","排位赛","战队赛","大乱斗","人机"];

//全局变量 从api网站获取的令牌，复制于此
const _TOKEN = "CCCF5-11685-E5F5F-255EA";

//时间格式化
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//清除html标签
function delHtml(str){
  str = str.replace(/<[^>]+>/g,"");
  str = str.replace(/&[A-z]{1,};/g,"");
  return str;
}

//设置段位名称
function dwTools(queue,tier){
    var dwName;
    queue = parseInt(queue);
    tier  = parseInt(tier);
    if(queue === 0 && tier === 0){
        return dwName = "最强王者";
    }else if(queue === 0 && tier === 6 ){
        return dwName = "超凡大师";
    }else if(queue === 255 && tier ===255){
        return dwName = "无段位"
    }else{
        return dw[tier-1][queue];
    }
}
//返回游戏模式名称
function getGameType(param){
  return gameType[param-1];
}

function translateURL(param){
  param = param.replace(/pic[0-9]/,"pic4");
  return param
}

//抛出接口方法
module.exports = {
  formatTime: formatTime,
  delHtml : delHtml,
  dwTools : dwTools,
  _TOKEN : _TOKEN,
  getGameType : getGameType,
  translateURL : translateURL
}


