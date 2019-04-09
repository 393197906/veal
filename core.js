'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

var regexp = {
  number: /^[0-9]*\.?[0-9]*$/,
  // 数字
  float: /^(-?\d+)(\.\d+)?$/,
  // 浮点数
  zh: /^[\u4e00-\u9fa5]{0,}$/,
  // 汉字
  mobilePhone: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/,
  // 手机号
  telPhone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  //  固定电话
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // 邮箱

};
function formatDate(date, fmt) {
  if (!date) {
    return '';
  } // if (typeof date !== 'string') {
  //   return ''
  // }


  date *= date.toString().length === 10 ? 1000 : 1;

  var _date = new Date(date);

  var _fmt = fmt || 'yyyy-MM-dd hh:mm:ss';

  var o = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds()
  };

  if (/(y+)/.test(_fmt)) {
    _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return _fmt;
}
var dateToStamp = function dateToStamp(str, len) {
  if (len === void 0) {
    len = 10;
  }

  var date = new Date(str);
  return parseInt(date.getTime() / (len === 13 ? 1 : 1000));
};
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }

  var targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(function (keys) {
    if (source[keys] && typeof source[keys] === 'object' && !(source[keys] instanceof Date)) {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
var sublen = function sublen(value, length) {
  if (length === void 0) {
    length = 8;
  }

  if (!value) return '';
  return value.length > length ? value.substr(0, length) + "..." : value;
};
/**
 * 四舍五入保留n位小数
 * @param val
 * @param len 默认保留两位小数
 * @returns {string}
 */

function fixedTo(val, len) {
  if (len === void 0) {
    len = 4;
  }

  var temp = parseFloat(val).toFixed(len);

  if (!isNaN(temp)) {
    return temp;
  }

  if (val === '') {
    return '';
  }

  return 0;
}
/**
 * 函数节流
 * @param fn 需要被节流的函数
 * @param delay 触发执行的时间间隔
 * @param mustDelay 必然触发执行的间隔时间
 * @returns {*}
 */

function delayFn(fn, delay, mustDelay) {
  var timer = null;
  var tStart;
  return function () {
    var context = this;
    var args = arguments;
    var tCur = +new Date(); // 先清理上一次的调用触发（上一次调用触发事件不执行）

    clearTimeout(timer); // 如果不存触发时间，那么当前的时间就是触发时间

    if (!tStart) {
      tStart = tCur;
    } // 如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数


    if (tCur - tStart >= mustDelay) {
      fn.apply(context, args);
      tStart = tCur;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
}
var isFunction = function isFunction(fn) {
  return typeof fn === "function";
}; // deep merge object

var mergeOptions = function mergeOptions(sOptions, eOptions) {
  return _extends({}, Object.keys(sOptions).reduce(function (container, key) {
    var _extends2;

    var soption = sOptions[key];
    var eOption = eOptions[key];
    var option = soption;

    if (isPlainObject(soption) && isPlainObject(eOption)) {
      option = mergeOptions(soption, eOption);
      delete eOptions[key]; // 删除多余属性
    }

    return _extends({}, container, (_extends2 = {}, _extends2[key] = option, _extends2));
  }, {}), eOptions);
};
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
function curry(fn) {
  var arity = fn.length;
  return function resolver() {
    var mem = Array.prototype.slice.call(arguments);
    return function () {
      var args = mem.slice();
      Array.prototype.push.apply(args, arguments);
      return (args.length >= arity ? fn : resolver).apply(null, args);
    };
  }();
}
var urlEncode = function urlEncode(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof param;

  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }

  return paramStr;
};

exports.compose = compose;
exports.curry = curry;
exports.dateToStamp = dateToStamp;
exports.deepClone = deepClone;
exports.delayFn = delayFn;
exports.fixedTo = fixedTo;
exports.formatDate = formatDate;
exports.isFunction = isFunction;
exports.isPlainObject = isPlainObject;
exports.mergeOptions = mergeOptions;
exports.regexp = regexp;
exports.sublen = sublen;
exports.urlEncode = urlEncode;
