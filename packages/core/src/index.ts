import {default as ipb} from "is-plain-object";
import {Regexps,PlainObject} from "./types"
export const isPlainObject = (value:any):boolean=>{
        return ipb(value)
}

// 常用正则
export const regexp:Regexps = {
    number: /^[0-9]*\.?[0-9]*$/, // 数字
    float: /^(-?\d+)(\.\d+)?$/, // 浮点数
    zh: /^[\u4e00-\u9fa5]{0,}$/, // 汉字
    mobilePhone: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, // 手机号
    telPhone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/, //  固定电话
    email:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // 邮箱
}

export function formatDate (date:number, fmt:string='yyyy-MM-dd hh:mm:ss'):string {
    if (!date) {
        return ''
    }
    // if (typeof date !== 'string') {
    //   return ''
    // }
    date *= (date.toString().length === 10 ? 1000 : 1)
    let _date = new Date(date)
    let _fmt = fmt
    let o = {
        'M+': _date.getMonth() + 1,
        'd+': _date.getDate(),
        'h+': _date.getHours(),
        'm+': _date.getMinutes(),
        's+': _date.getSeconds()
    }
    if (/(y+)/.test(_fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(_fmt)) {
            _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return _fmt
}

export const dateToStamp =  (str:string, len:number = 10):number=> {
    let date:Date = new Date(str)
    return parseInt(`${date.getTime() / (len === 13 ? 1 : 1000)}`)
}


export function deepClone<T> (source:T):T {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object' && !(source[keys] instanceof Date)) {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
    }
    })
    return targetObj as T
}

export const sublen = (value:string, length:number = 8):string => {
    if (!value) return ''
    return value.length > length ? `${value.substr(0, length)}...` : value
}


/**
 * 四舍五入保留n位小数
 * @param val
 * @param len 默认保留两位小数
 * @returns {string}
 */
export function fixedTo (val:number|string, len = 4):string {
    const temp = parseFloat(`${val}`).toFixed(len)
    if (!isNaN(parseFloat(temp))) {
        return temp
    }
    if (val === '') {
        return ''
    }
    return '0'
}

/**
 * 函数节流
 * @param fn 需要被节流的函数
 * @param delay 触发执行的时间间隔
 * @param mustDelay 必然触发执行的间隔时间
 * @returns {*}
 */
export function delayFn (fn:Function, delay:number, mustDelay:number):Function {
    let timer:any = null
    let tStart
    return function () {
        let context = this
        let args = arguments
        let tCur = +new Date()
        // 先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer)
        // 如果不存触发时间，那么当前的时间就是触发时间
        if (!tStart) {
            tStart = tCur
        }
        // 如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
        if (tCur - tStart >= mustDelay) {
            fn.apply(context, args)
            tStart = tCur
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }
    }
}

export const isFunction = (fn:any):boolean =>{
    return typeof fn === "function"
}

// deep merge object
export const mergeOptions = (sOptions:PlainObject, eOptions:PlainObject):PlainObject => {
    return {
        ...Object.keys(sOptions).reduce((container, key) => {
            const soption = sOptions[key]
            const eOption = eOptions[key]
            let option = soption;
            if(isPlainObject(soption)&& isPlainObject(eOption)){
                option = mergeOptions(soption,eOption)
                delete eOptions[key] // 删除多余属性
            }
            return {...container, [key]: option}
        }, {}),
        ...eOptions
    }
}

export function compose (...funcs:Function[]):Function {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function curry (fn:Function):Function {
    const arity = fn.length
    return (function resolver () {
        const mem = Array.prototype.slice.call(arguments)
        return function () {
            const args = mem.slice()
            Array.prototype.push.apply(args, arguments)
            return (args.length >= arity ? fn : resolver).apply(null, args)
        }
    }())
}


export  const urlEncode = (param:any, key:string='', encode:boolean=false)=> {
    if (param==null) return '';
    let paramStr = '';
    const t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '='  + (encode ? encodeURIComponent(param) : param);
    } else {
        for (let i in param) {
            let k = key === '' ? i  : key + (param instanceof Array ? `[${i}]` : `.${i}`)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr;
}





