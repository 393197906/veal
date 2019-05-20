import plugin from "../lib/index"

import Vue from "vue"
Vue.use(plugin, {mixin: {page: 10}})

const vue = new Vue() as any
test("math", () => {
    expect(vue.$_math.plus(1, 2)).toBe(3)
})

test("util", () => {
    const a = () => {
        return 123
    }
    const b = undefined
    expect(vue.$_util.isFunction(a)).toBe(true)
    expect(vue.$_util.isFunction(b)).toBe(false)
})


test("mixin", () => {
    expect(vue.$data.page).toBe(10)
    expect(vue.$data.pre_page).toBe(20)
})
