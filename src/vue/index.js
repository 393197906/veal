import * as  core from '../core/index'
import {pagination} from './mixin/page'
import * as math from '../math/index'
import Cache from './components/Cache.js'

export default {
    install: (Vue, options = {}) => {
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
