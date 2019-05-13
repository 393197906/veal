import * as  core from '@veal/core'
import {pagination} from './mixin/page'
import * as math from '@veal/math'
import Cache from './components/Cache.js'

type PlainObject = {[key:string]:any}
type Options = {
    mixin?:PlainObject
}

export default {
    install: (Vue, options:Options) => {
        const {mixin = {}} = options
        Vue.$_util = Vue.prototype.$_util = core
        Vue.$_math = Vue.prototype.$_math = math // 精度数学库
        Object.keys(core).forEach(key => {
            Vue.filter(key, core[key])
        });
        Vue.mixin(pagination(mixin))
        Vue.component('Cache', Cache)
    }
}
