import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch'
import fetch from "./fetch"
import {isFunction, compose} from "../core"
export * from "./middleware"

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
    const filterMiddlewares = middlewares.filter(isFunction)
    return fetch => {
        return  compose(...filterMiddlewares)(fetch)
    }
};




