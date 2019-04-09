'use strict';

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

var core = /*#__PURE__*/Object.freeze({
isPlainObject: isPlainObject,
regexp: regexp,
formatDate: formatDate,
dateToStamp: dateToStamp,
deepClone: deepClone,
sublen: sublen,
fixedTo: fixedTo,
delayFn: delayFn,
isFunction: isFunction,
mergeOptions: mergeOptions,
compose: compose,
curry: curry,
urlEncode: urlEncode
});

var pagination = function pagination(_data) {
  return {
    data: function data() {
      return _extends({
        page: 1,
        pre_page: 20,
        total_count: 0,
        export_total: 100000
      }, _data);
    }
  };
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var build = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision) {
    if (precision === void 0) { precision = 12; }
    return +parseFloat(num.toPrecision(precision));
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
    return len > 0 ? len : 0;
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
    if (_boundaryCheckingState) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
        }
    }
}
/**
 * 精确乘法
 */
function times(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)));
    }
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
}
/**
 * 精确加法
 */
function plus(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return plus.apply(void 0, [plus(num1, num2), others[0]].concat(others.slice(1)));
    }
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
/**
 * 精确减法
 */
function minus(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return minus.apply(void 0, [minus(num1, num2), others[0]].concat(others.slice(1)));
    }
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}
/**
 * 精确除法
 */
function divide(num1, num2) {
    var others = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        others[_i - 2] = arguments[_i];
    }
    if (others.length > 0) {
        return divide.apply(void 0, [divide(num1, num2), others[0]].concat(others.slice(1)));
    }
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)));
}
/**
 * 四舍五入
 */
function round(num, ratio) {
    var base = Math.pow(10, ratio);
    return divide(Math.round(times(num, base)), base);
}
var _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag) {
    if (flag === void 0) { flag = true; }
    _boundaryCheckingState = flag;
}
var index = { strip: strip, plus: plus, minus: minus, times: times, divide: divide, round: round, digitLength: digitLength, float2Fixed: float2Fixed, enableBoundaryChecking: enableBoundaryChecking };

exports.strip = strip;
exports.plus = plus;
exports.minus = minus;
exports.times = times;
exports.divide = divide;
exports.round = round;
exports.digitLength = digitLength;
exports.float2Fixed = float2Fixed;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports['default'] = index;
});

unwrapExports(build);
var build_1 = build.strip;
var build_2 = build.plus;
var build_3 = build.minus;
var build_4 = build.times;
var build_5 = build.divide;
var build_6 = build.round;
var build_7 = build.digitLength;
var build_8 = build.float2Fixed;
var build_9 = build.enableBoundaryChecking;



var math = /*#__PURE__*/Object.freeze({
__moduleExports: build,
strip: build_1,
plus: build_2,
minus: build_3,
times: build_4,
divide: build_5,
round: build_6,
digitLength: build_7,
float2Fixed: build_8,
enableBoundaryChecking: build_9
});

var matchCatch = function matchCatch(keys, caches) {
  return Object.keys(caches).reduce(function (container, item) {
    var index = keys.findIndex(function (key) {
      return key === item;
    });

    if (index > -1) {
      var _extends2;

      return _extends({}, container, (_extends2 = {}, _extends2[item] = caches[item], _extends2));
    }

    return container;
  }, {});
};

var enduringCache = []; // 持久化cache

var Cache = {
  name: 'Cache',
  props: {
    keys: {
      // 缓存路径
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      cache: enduringCache
    };
  },
  created: function created() {
    var _this = this;

    this.$watch('keys', function (val) {
      _this.cache = matchCatch(val, _this.cache);
    }, {
      immediate: true
    });
  },
  destroyed: function destroyed() {
    enduringCache = this.cache;
  },
  render: function render() {
    var vnode = this.$slots.default[0];
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      var cache = this.cache;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
      } else {
        cache[key] = vnode;
      }

      vnode.data.keepAlive = true;
    } // console.log('2', this.cache)


    return vnode;
  }
};

var index = {
  install: function install(Vue, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$mixin = _options.mixin,
        mixin = _options$mixin === void 0 ? {} : _options$mixin;
    Vue.$_util = Vue.prototype.$_util = core;
    Vue.$_math = Vue.prototype.$_math = math; // 精度数学库

    Object.keys(core).forEach(function (key) {
      Vue.filter(key, core[key]);
    });
    Vue.mixin(pagination(mixin));
    Vue.component('Cache', Cache);
  }
};

module.exports = index;
