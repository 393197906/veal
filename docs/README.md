# aevjs
[![Build Status](https://travis-ci.org/393197906/veal.svg?branch=master)](https://travis-ci.org/393197906/veal)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) 
[![Netlify Status](https://api.netlify.com/api/v1/badges/a57a9a3d-5f33-44c7-a280-e2a6aefbd0d5/deploy-status)](https://app.netlify.com/sites/aev/deploys)

> a common tool library

> Provide web service API and common function



## @aev/core
### regexp
```typescript
export const regexp = {
    number: /^[0-9]*\.?[0-9]*$/, // 数字
    float: /^(-?\d+)(\.\d+)?$/, // 浮点数
    zh: /^[\u4e00-\u9fa5]{0,}$/, // 汉字
    mobilePhone: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/, // 手机号
    telPhone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/, //  固定电话
    email:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // 邮箱
}
```
### hasRangeRepeat
```typescript
/**
 * 判断是否有重复的区间
 * @param avgs [T extends number | string,T extends number | string][]
 * @return 重复的结果集 { [key: number]: Times }[]
 */
export declare function hasRangeRepeat<T extends number | string>(...avgs: Times<T>[]): RangeResult<T>;
```


### formatDate
```typescript
/**
 * 将时间戳格式化为日期字符串
 * @param date
 * @param fmt
 * @return 格式化后的字符串
 */
export declare function formatDate(date: number, fmt?: string): string;
```


### dateToStamp
```typescript
/**
 * 将日期字符串转换为时间戳
 * @param str
 * @param len
 * @return 转换后的时间戳
 */
export declare const dateToStamp: (str: string, len?: number) => number;
```


### deepClone
```typescript
/**
 * 深拷贝
 * @param source
 * @return 深拷贝后的对象
 */
export declare function deepClone<T extends [] | {}>(source: T): T;
```


### sublen
```typescript
/**
 * 截取字符串长度
 * @param value
 * @param length
 * @return 截取后的字符串
 */
export declare const sublen: (value: string, length?: number) => string;
```

### fixedTo
```typescript
/**
 * 四舍五入保留n位小数
 * @param val
 * @param len 默认保留两位小数
 * @returns 格式化后的字符串
 */
export declare function fixedTo(val: number | string, len?: number): string;
```

### delayFn
> (fn, delay, mustDelay)=> function
```typescript
/**
 * 函数节流
 * @param fn 需要被节流的函数
 * @param delay 触发执行的时间间隔
 * @param mustDelay 必然触发执行的间隔时间
 * @returns {*}
 */
export declare function delayFn(fn: Function, delay: number, mustDelay: number): Function;
```

### isFunction
```typescript
/**
 * 判断是不是函数
 * @param fn
 * @return 结果
 */
export declare const isFunction: (fn: any) => boolean;
```

### isPlainObject
```typescript
/**
 * 判断是不是字面里对象
 * @param obj
 * @return 结果
 */
export declare const isPlainObject: (obj: any) => boolean;
```

### mergeOptions
```typescript
/**
 * 深度合并对象
 * @param sOptions
 * @param eOptions
 * @return 合并后的对象
 */
export declare const mergeOptions: (sOptions: PlainObject, eOptions: PlainObject) => PlainObject;
```

### compose
```typescript
/**
 * 函数组合
 * @param funcs
 * @return 组合后的函数
 */
export declare function compose(...funcs: Function[]): Function;
```

### curry
```typescript
/**
 * 函数柯里化
 * @param fn
 * @return 柯里化后的函数
 */
export declare function curry(fn: Function): Function;
```

### urlEncode
```typescript
/**
 * 转换对象为get参数
 * @param param
 * @param key
 * @param encode
 * @return  转换后的字符串
 */
export declare const urlEncode: (param: any, key?: string, encode?: boolean) => string;
```

## @aev/http

### createFetch
> (hof:function?)=> Fetch

> fetch 工厂

### applyMiddleware
> (...middleware:Array\<function\>?)=> (Fecth|any)

> 中间件加载器

### http middlewares
#### log

> 日志中间件

#### methods

> 基础http方法中间件(会改变fetch的默认行为 生成一个 包含{get,post,del,put}方法的对象)

> `NOTE:` 如果使用`methods`中间件，`methods`必须是`applyMiddleware`的第一个参数，因为`methods`会改变`fetch`的默认行为

#### filter
> (errorHandler=()=>{}?,chain=(response)=>{/*...*/}?)=> middleware

> errorHandler:error=>void 错误处理方法 

> chain:response=>Promise\<any\> 自定义数据处理 

#### headers
> (headers:plainObject)=>middleware

> 设置`headers`

### demo

```javascript
// base
const fetch = createFetch();

// advanced
const fetch = createFetch(applyMiddleware(methods,filter(),log));
```

## @aev/math
```javascript
math.strip(0.09999999999999998); // = 0.1
math.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
math.plus(2.3, 2.4);             // = 4.7, not 4.699999999999999
math.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
math.times(3, 0.3);              // = 0.9, not 0.8999999999999999
math.times(0.362, 100);          // = 36.2, not 36.199999999999996
math.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
math.round(0.105, 2);            // = 0.11, not 0.1
```

## @aev/vue
### Vue.prototype.$_util 
> [`@aev/core`](#aev-core)挂载入口

### Vue.prototype.$_math
> [`@aev/math`](#aev-math)挂载入口

### Vue.filters
> [`@aev/core`](#aev-core)挂载

### Cache 
 ```javascript
 {
   props: {
          keys: { // cache keys
              type: Array,
              default: () => []
          }
      }
  }
```

## @aev/observable














