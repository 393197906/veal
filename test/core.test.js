import {isPlainObject, isFunction, mergeOptions, compose, curry,urlEncode} from "../lib/core"

test("isPlainObject", () => {
    expect(isPlainObject({name: 1})).toBe(true)
    expect(isPlainObject(undefined)).toBe(false)
})

test("isFunction", () => {
    const a = () => {
        return 123
    }
    const b = undefined
    expect(isFunction(a)).toBe(true)
    expect(isFunction(b)).toBe(false)
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
    expect(mergeOptions(a, b)).toEqual({
        name: "b",
        age: 20
    })
    expect(mergeOptions(b, a)).toEqual({
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
    expect(mergeOptions(t1, t2)).toEqual({
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
    const fn = compose(
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
    const fn = curry((a, b) => {
        return a + b
    })
    expect(fn(1)(2)).toBe(3)
})

test("urlEncode", () => {
    const str = urlEncode({
        name:11,
        age:22,
        cla:33,
        bb:{
            name:11
        }
    });
    expect(str).toBe("&name=11&age=22&cla=33&bb.name=11")
})
