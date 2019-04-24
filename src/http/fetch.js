import {mergeOptions, isPlainObject} from "../core"

const defaultParams = {
    // method: 'GET',
    // headers: {
    //     'Content-Type': 'application/json'
    // }
};
export default (url, params={}) => {
    if (!isPlainObject(params)) throw new Error(`params except a plain object`)
    // const endParams = mergeOptions(defaultParams, params)
    return window.fetch(url, params)
}



