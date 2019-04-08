import {urlEncode} from "../core"

export const methods = next => {
    const methods = ['GET', 'POST', 'DELETE', 'PUT']
    const methodNames = ['get', 'post', 'del', 'put']
    return methods.reduce((container, key, index) => {
        if (key === 'GET') {
            return {
                ...container,
                [methodNames[index]]: (...args) => {
                    const [url, params] = args
                    return next(`${url}?${urlEncode(params).slice(1)}`, {
                        method: 'GET',
                    })
                }
            }
        }
        return {
            ...container,
            [methodNames[index]]: (...args) => {
                const [url, params] = args
                return next(url, {
                    body: JSON.stringify(params),
                    method: key,
                })
            }
        }
    }, {})
}

export const filter = (errorHandler = () => {
}, chain) => {
    const defaultChain = response => {
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        return response.json().then(data => {
            if (
                (data.hasOwnProperty("status") && (data['status'] !== true && parseInt(data['status']) !== 200))
                ||
                (data.hasOwnProperty("code") && (data['code'] !== true && parseInt(data['code']) !== 200))
            ) {
                throw new Error(data.message || data.msg || "error message not found")
            }
            return data
        })
    };
    if (chain) {
        if (typeof chain !== "function") {
            console.warn("filter chain must be a function");
        }
    } else {
        chain = defaultChain
    }
    return next => (...args) => {
        return next(...args)
            .then(chain)
            // return data
            .then(data => ({data}))
            // return error
            .catch(error => {
                errorHandler(error)
                return {err: error, data: {}}
            })
    }
};

export const headers = (headers = {}) => next => (...argv) => {
    let [url, params = {}] = argv
    if (params.headers) {
        params.headers = {
            ...params.headers,
            ...headers
        }
    } else {
        params.headers = headers
    }
    return next(url, params)
}


export const log = next => (...params) => {
    const [url, argv] = params
    const start = Date.now()
    return next(...params).then(data => {
        const img = data.err
            ? 'https://tu.jiuwa.net/pic/20170910/1505053332939917.jpg'
            : 'http://pic.9ht.com/up/2018-2/15181644163000303.jpg'
        console.group('API接口调用')
        console.log('%c  ', `background:url("${img}");padding:45px;background-size:100%; background-repeat:no-repeat;`)
        console.log(`%c URL 路径:`, 'color:#CC33CC', url)
        // console.log(' ')
        console.log(`%c PARAMS 参数:`, 'color:#FF9933', argv)
        if (data.err) {
            console.log(`%c RESULT ERROR 失败结果:`, 'color:#993333', data.err)
        } else {
            console.log(`%c RESULT DATA 成功结果:`, 'color:#99CC00', data.data)
        }
        console.log(`%c TIME 时间:`, 'color:#FF0066', Date.now() - start + 'ms')
        console.groupEnd()
        return data
    })
}

