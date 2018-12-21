const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//时间戳转为日期 可自行修改
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '年';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  var D = date.getDate() + '日';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D;
}

//富文本转文本
function convertHtmlToText(inputText) {
  var returnText = "" + inputText;

  //<font color='red></font>替换为''
  returnText = returnText.replace(/<font\scolor=\'red\'>/ig, '<span style="color:red">');
  returnText = returnText.replace(/<\/font>/ig, '</span>');

  //null转为''
  returnText = returnText.replace(/null/ig, '');


  return returnText;

}






module.exports = {
  formatTime: formatTime,
  timestampToTime: timestampToTime,
  convertHtmlToText: convertHtmlToText
}
