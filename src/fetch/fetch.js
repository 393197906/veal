import {mergeOptions, isPlainObject} from "../util"

const defaultParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
export default (url, params={}) => {
    if (!isPlainObject(params)) throw new Error(`params except a plain object`)
    const endParams = mergeOptions(defaultParams, params)
    console.log(endParams);
    return window.fetch(url, endParams)
}



