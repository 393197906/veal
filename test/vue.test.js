import plugin from "../vue"

import Vue from "vue"

test("math", () => {
    Vue.use(plugin)
    const vue = new Vue()
    expect(vue.$_math.plus(1, 2)).toBe(3)
})

test("util", () => {
    Vue.use(plugin)
    const vue = new Vue()
    const a = () => {
        return 123
    }
    const b = undefined
    expect(vue.$_util.isFunction(a)).toBe(true)
    expect(vue.$_util.isFunction(b)).toBe(false)
})

test("page", () => {
    Vue.use(plugin)
    const vue = new Vue()
    expect(vue.$data.page).toBe(1)
    expect(vue.$data.pre_page).toBe(20)
})

test("mixin", () => {
    Vue.use(plugin, {mixin: {page: 10}})
    const vue = new Vue()
    expect(vue.$data.page).toBe(10)
    expect(vue.$data.pre_page).toBe(20)
})
