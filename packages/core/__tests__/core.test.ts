import * as core from "../src/index"
import {Times} from "../src/types"
test("isPlainObject", () => {
    expect(core.isPlainObject({name: 1})).toBe(true)
    expect(core.isPlainObject(undefined)).toBe(false)
})

test("isFunction", () => {
    const a = () => {
        return 123
    }
    const b = undefined
    expect(core.isFunction(a)).toBe(true)
    expect(core.isFunction(b)).toBe(false)
})

test("mergeOptions", () => {
    const a = {
        name: "a",
        age: 18
    }
    const b = {
        name: "b",
        age: 20
    }
    expect(core.mergeOptions(a, b)).toEqual({
        name: "b",
        age: 20
    })
    expect(core.mergeOptions(b, a)).toEqual({
        name: "a",
        age: 18
    })
    const t1 = {
        deep: {
            deep: 2,
            dd: {
                name: 1
            }
        }
    }
    const t2 = {
        deep: {
            deept: 2,
            dd: {
                age: 2
            },
            cc: 33
        }
    }
    expect(core.mergeOptions(t1, t2)).toEqual({
        deep: {
            deep: 2,
            deept: 2,
            dd: {
                name: 1,
                age: 2
            },
            cc: 33
        }
    })
})


test("compose", () => {
    const fn = core.compose(
        (p) => {
            return p + 1
        },
        (p) => {
            return p + 1
        }
    )
    expect(fn(0)).toBe(2)
})

test("curry", () => {
    const fn = core.curry((a, b) => {
        return a + b
    })
    expect(fn(1)(2)).toBe(3)
})

test("urlEncode", () => {
    const str = core.urlEncode({
        name: 11,
        age: 22,
        cla: 33,
        bb: {
            name: 11
        }
    });
    expect(str).toBe("&name=11&age=22&cla=33&bb.name=11")
})

test("regexp", () => {
    expect(core.regexp.number.test("11")).toBe(true)
    expect(core.regexp.number.test("n11n")).toBe(false)
    expect(core.regexp.float.test("11.22")).toBe(true)
    expect(core.regexp.mobilePhone.test("18854062980")).toBe(true)
    expect(core.regexp.telPhone.test("010-8771958")).toBe(true)
    expect(core.regexp.zh.test("123")).toBe(false)
    expect(core.regexp.zh.test("收发")).toBe(true)
    expect(core.regexp.email.test("393197906@qq.com")).toBe(true)
})

test("formatDate", () => {
    expect(core.formatDate(1554689343)).toBe("2019-04-08 10:09:03")
})

test("dateToStamp", () => {
    expect(core.dateToStamp("2019-04-08 10:9:03")).toBe(1554689343)
})

test("deepClone", () => {
    const target = {
        name: "11",
        age: 18,
        body: {
            name: "22",
            age: 19
        }
    };
    expect(core.deepClone(target)).not.toBe(target)
})

test("hasRangeRepeat", () => {
    const a1:Times<string> = ["09:00", "09:02"]
    const a2:Times<string> = ["09:10", "10:02"]
    const a3:Times<string> = ["09:00:", "09:01"]
    const a4:Times<string> = ["09:11:", "09:18"]
    const a5:Times<string> = ["09:01:", "09:02"]
    expect(!!core.hasRangeRepeat<string>(a1, a2,a3,a4,a5).length).toBe(true)

    const b1:Times<number> = [0,10]
    const b2:Times<number> = [11,20]
    const b3:Times<number> = [20,25]
    const b4:Times<number> = [4,7]
    expect(!!core.hasRangeRepeat<number>(b1,b2,b3,b4).length).toBe(true)

    const c1:Times<number> = [0,10]
    const c2:Times<number> = [11,20]
    const c3:Times<number> = [22,25]
    const c4:Times<number> = [30,31]
    expect(!!core.hasRangeRepeat<number>(c1,c2,c3,c4).length).toBe(false)
})


