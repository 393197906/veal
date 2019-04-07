// import 'promise-polyfill/src/polyfill';
// import 'whatwg-fetch'
import fetch from "./fetch"
import {isFunction, compose} from "../util"
import {GET, POST, DELETE, PUT,base} from "./methodMiddleware"

/**
 * 创建fetch
 * @param hof
 * @returns {*}
 */
export const createFetch = (hof) => {
    if (typeof hof === "function") {
        return hof(fetch)
    }
    return fetch
};

/**
 * 执行中间件
 * @param middlewares
 * @returns {function(*): *}
 */
export const applyMiddleware = (...middlewares) => {
    const baseMiddlewares = [base]
    const filterMiddlewares = middlewares.filter(isFunction)
    return fetch => {
        const chainFetch = compose(...[...filterMiddlewares,...baseMiddlewares])(fetch)
        return {
            get:GET(chainFetch),
            put:PUT(chainFetch),
            del:DELETE(chainFetch),
            post:POST(chainFetch),
        }
    }
};




