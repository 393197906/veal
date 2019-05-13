import 'whatwg-fetch'
import fetch from "./fetch"
import {isFunction, compose} from "@veal/core"
export * from "./middleware"
import {HOF,Middleware,Fetch} from "./types";

/**
 * 创建fetch
 * @param hof
 * @returns {*}
 */
export const createFetch = (hof:HOF | undefined = undefined) => {
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

export const applyMiddleware = (...middlewares:Middleware<Fetch<any>,any>[]) :HOF=> {
    const filterMiddlewares = middlewares.filter(isFunction)
    return fetch => {
        return  compose(...filterMiddlewares)(fetch)
    }
};




