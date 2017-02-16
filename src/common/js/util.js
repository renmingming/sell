/**
 * Created by pc on 2017/1/23.
 * 解析url参数
 * @example如  ？id=12345&a=b
 * @return返回值 Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // 返回数组arr ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      // response(1)从1开始截取字符串
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
    console.log(obj)
    return obj
  }
}
