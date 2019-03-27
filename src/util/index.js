import isPlainObject from "is-plain-object";
export {isPlainObject}
export const isFunction = (fn) =>{
    return typeof fn === "function"
}
// deep merge object
export const mergeOptions = (sOptions, eOptions) => {
    return {
        ...Object.keys(sOptions).reduce((container, key) => {
            const soption = sOptions[key]
            const eOption = eOptions[key]
            let option = soption;
            if(isPlainObject(soption)&& isPlainObject(eOption)){
                option = mergeOptions(soption,eOption)
            }
            return {...container, [key]: option}
        }, {}), ...eOptions
    }
}

export function compose (...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function curry (fn) {
    const arity = fn.length
    return (function resolver () {
        const mem = Array.prototype.slice.call(arguments)
        return function () {
            const args = mem.slice()
            Array.prototype.push.apply(args, arguments)
            return (args.length >= arity ? fn : resolver).apply(null, args)
        }
    }())
}

