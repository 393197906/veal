
export type PlainObject = {
    [key: string]: any
}
export type Methods = {
    get:Fetch<Promise<any>>,
    post:Fetch<Promise<any>>,
    del:Fetch<Promise<any>>,
    put:Fetch<Promise<any>>
}
export type Fetch<R> = (url: string, params?:PlainObject) => R

export type Middleware<T,U>= (next:T)=>U
export type Result<T> = {
    err?:Error,
    data?:T
}

export type Chain = ((value:Response)=> Response | PromiseLike<Response>) | undefined | null

export interface HOF{
    (fetch:Fetch<Promise<Response>>): Fetch<any> | Methods | any
}

