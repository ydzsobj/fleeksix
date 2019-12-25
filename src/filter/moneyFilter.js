export function toMoney(money = 0){
   
    return Number(money).toFixed(2)

}
export function toDivide(money = 0){
    var value=money/100;
    var s=value.toString().split(".");
	if(s.length==1){
		value=value.toString()+".00";
		return value;
	}
	if(s.length>1){
		if(s[1].length<2){
			value=value.toString()+"0";
		}
		return value
      }
}
export function toThousands(money =0) {
	var s= money.toString().split(".")
	var num = s[0], result = '';
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) { result = num + result; }
	if(s[1]) {result = result + '.' + s[1]}
	return result ;
}
export function int (money = 0){
	return Number(money)/100
}
export function num (money = 0){
	return Number(money)
}

// 获取浏览器语言
export const getLanguage = () => {
	return (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  
  /**
   * @desc 函数防抖
   * @param func 函数
   * @param wait 延迟执行毫秒数
   * @param immediate true 表立即执行，false 表非立即执行
   */
  export const debounce = (func, wait, immediate) => {
	let timeout;
	return function () {
	  let context = this;
	  let args = arguments;
  
	  if (timeout) clearTimeout(timeout);
	  if (immediate) {
		let callNow = !timeout;
		timeout = setTimeout(() => {
		  timeout = null;
		}, wait)
		if (callNow) func.apply(context, args)
	  } else {
		timeout = setTimeout(() => {
		  func.apply(context, args)
		}, wait);
	  }
	}
  }
  
  /**
   * @desc 函数节流
   * @param func 函数
   * @param wait 延迟执行毫秒数
   * @param type 1 表时间戳版，2 表定时器版
   */
  export const throttle = (func, wait, type) => {
	if (type === 1) {
	  var previous = 0;
	} else if (type === 2) {
	  var timeout;
	}
	return function () {
	  let context = this;
	  let args = arguments;
	  if (type === 1) {
		let now = Date.now();
  
		if (now - previous > wait) {
		  func.apply(context, args);
		  previous = now;
		}
	  } else if (type === 2) {
		if (!timeout) {
		  timeout = setTimeout(() => {
			timeout = null;
			func.apply(context, args)
		  }, wait)
		}
	  }
	}
  }
  