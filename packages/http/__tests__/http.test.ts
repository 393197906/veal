import {createFetch, applyMiddleware, methods, filter, headers} from "../src/index"

const heeaders = {
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwicmVhbF9uYW1lIjoi5a6L5bCP5a6dIiwiaWF0IjoxNTQwNTQxNDIxLCJleHAiOjE1NDExNDYyMjF9.t4g_gM7DAPhKy2gQL9e-ckYFUPQc1AIZS-0LhtvGAlg"
}
describe("http fetch", () => {
    // test("createFetch", () => {
    //     const fetch = createFetch()
    //     const url = "https://api.apiopen.top/recommendPoetry"
    //     return fetch(url).then(result => {
    //         expect(result.ok).toBe(true)
    //     })
    // })

    test("base fetch", () => {
        const fetch = createFetch(applyMiddleware(filter(), headers(heeaders)))
        const url = "http://betaglibopen.91youxian.com:8080/api/goods/view?id=11"
        return fetch(url).then(result => {
            expect(result).toHaveProperty("data")
            expect(result.data.data).toHaveProperty("id")
            expect(result.data.data.id).toBe("11")
        })
    })

    test("base fetch customize filter chain", () => {
        const fetch = createFetch(applyMiddleware(methods, filter(error => error, response => {
            return response.json().then(data => {
                if (
                    (data.hasOwnProperty("ret") && (data['ret'] !== true && parseInt(data['ret']) !== 200))
                ) {
                    throw new Error(data.message || data.msg || "error message not found")
                }
                return data
            })
        }), headers(heeaders)))
        const url = "http://betaglibopen.91youxian.com:8080/api/codeGoods/list"
        return fetch.post(url).then(result => {
            expect(result).toHaveProperty("err")
            expect(result.err.message).toBe("map is not defined")
        })
    })

    test("get with token", () => {
        const fetch = createFetch(applyMiddleware(methods, filter(), headers(heeaders)))
        const url = "http://betaglibopen.91youxian.com:8080/api/category/list"
        return fetch.get(url).then(result => {
            expect(result).toHaveProperty("data")
        })
    })

    test("get params with token", () => {
        const fetch = createFetch(applyMiddleware(methods, filter(), headers(heeaders)))
        const url = "http://betaglibopen.91youxian.com:8080/api/goods/view"
        return fetch.get(url, {id: 123}).then(result => {
            expect(result).toHaveProperty("data")
            expect(result.data.data).toHaveProperty("id")
            expect(result.data.data.id).toBe("123")
        })
    })

    test("post params with token", () => {
        const fetch = createFetch(applyMiddleware(methods, filter(), headers(heeaders)))
        const url = "http://betaglibopen.91youxian.com:8080/api/codeGoods/list"
        return fetch.post(url, {code: "201810250014,201810250015"}).then(result => {
            expect(result).toHaveProperty("data")
        })
    })
})

