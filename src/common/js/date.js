// 将传入的fmt：yyyy-MM-dd hh:mm转为为对应格式的日期
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { // 正则在fmt中匹配y一个或多个
    //  RegExp.$1就是匹配的结果yyyy
    //  将RegExp.$1 replace成当前的年份date.getFullYear()
    // .substr是截取的年份字符串长多
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  // 从str.length开始截取
  // 比如str为9，str.length为1，则返回09，比如为14，str.length为2，则返回14
  return ('00' + str).substr(str.length)
}
