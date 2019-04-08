# aook
> a common tool library

> Provide web service API and common function

## core
* regexp
```javascript
export const regexp = {
    number: /^[0-9]*\.?[0-9]*$/, // 数字
    float: /^(-?\d+)(\.\d+)?$/, // 浮点数
    zh: /^[\u4e00-\u9fa5]{0,}$/, // 汉字
    mobilePhone: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, // 手机号
    telPhone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/, //  固定电话
    email:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // 邮箱
}
```

* formatDate
> (data:(string|number),fmt:string?)=> string

> 将时间戳格式化为日期字符串

* dateToStamp
> (str:string,len:number=10?)=> number

> 将日期字符串转换为时间戳

* deepClone
> (source:object)=> object

> 深拷贝


* sublen
> (value:string,len:number=8?)=> string

> 字符串截取

* fixedTo
> (val:(string|number),len:number=4?)=> number

> 四舍五入保留n位小数

* delayFn
> (fn, delay, mustDelay)=> function
```javascript

/**
 * 函数节流
 * @param fn 需要被节流的函数
 * @param delay 触发执行的时间间隔
 * @param mustDelay 必然触发执行的间隔时间
 * @returns {*}
 */
```

* isFunction
> (target:any)=> boolean

> 判断是不是函数

* isPlainObject
> (target:any)=> boolean

> 判断是不是字面量对象

* mergeOptions
> (l:plainObject,r:plainObject)=> plainObject

> 深度合并对象

* compose
> (...rest:Array<function>)=> function

> 函数管道

* curry
> (function)=> function

> 柯里化函数工厂

* urlEncode
> (target:plainObject)=> string

> 转换对象为uri参数字符串

## http

* createFetch
> (hof:function?)=> Fetch

> fetch 工厂

* applyMiddleware
> (...middleware:Array<function>?)=> (Fecth|any)

> 中间件加载器

### http middlewares
* log

> 日志中间件

* methods

> 基础http方法中间件(会改变fetch的默认行为 生成一个 包含{get,post,del,put}方法的对象)

> `NOTE:` 如果使用`methods`中间件，`methods`必须是`applyMiddleware`的第一个参数，因为`methods`会改变`fetch`的默认行为

* filter
> (errorHandler=()=>{}?,chain=(response)=>{/*...*/}?)=> middleware

> errorHandler:error=>void 错误处理方法 

> chain:response=>Promise<any> 自定义数据处理 

* headers
> (headers:plainObject)=>middleware

> 设置`headers`

### demo

```javascript
// base
const fetch = createFetch();

// advanced
const fetch = createFetch(applyMiddleware(methods,filter(),log));
```












