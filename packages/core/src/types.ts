export  interface Regexps {
     readonly [key:string] :RegExp
}
export interface PlainObject {
     [key:string]:any
}

export type Times<T> = [T,T]
export type RangeResult<T> = { [key: number]: Times<T> }[]
